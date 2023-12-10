import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import IMeal from '../../types.d.';
import axiosApi from '../../axiosApi';


const AddMeal = () => {
  const Navigation = useNavigate();

  const mealTime = [
    {title: 'Breakfast', id: 'breakfast'},
    {title: 'Lunch', id: 'lunch'},
    {title: 'Dinner', id: 'dinner'},
  ];

  const [meal, setMeal] = useState<IMeal>({
    text: '',
    mealTime: '',
    calories: '',
  });

  const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setMeal((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axiosApi.post('meal.json', meal);
    } finally {
      Navigation('/');
    }
  };


  return (
    <>
      <form onSubmit={onFormSubmit}>
        <h2 className="text-center mb-4">Add meal</h2>
        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="text" className="form-label">Meal</label>
          <input
            type="text"
            name="text"
            id="text"
            className="form-control"
            value={meal.text}
            onChange={changeForm}
          />
        </div>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="text" className="form-label">Colories</label>
          <input
            type="calories"
            name="calories"
            id="calories"
            className="form-control"
            value={meal.calories}
            onChange={changeForm}
          />
        </div>

        <select name="mealTime" onChange={changeForm}>
          {mealTime.map(mealTime => (
            <option key={mealTime.id} value={mealTime.id}>{mealTime.title}</option>
          ))}
        </select>

        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary">Send</button>
        </div>
      </form>
    </>
  );
};

export default AddMeal;