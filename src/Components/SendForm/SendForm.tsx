import React, {ChangeEvent} from 'react';
import IMeal from '../../types.d.';

interface Props {
  meal: IMeal,
  onFormSubmit: (e: React.FormEvent) => void,
  changeForm:  (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void,
  btnText?: string,
}

const SendForm: React.FC<Props> = ({meal, onFormSubmit, changeForm, btnText='Send'}) => {
  const mealSelectSelect = [
    {text: 'Breakfast', id: 'breakfast'},
    {text: 'Lunch', id: 'lunch'},
    {text: 'Snack', id: 'snack'},
    {text: 'Dinner', id: 'dinner'},
  ];

  return (
    <>
      <form onSubmit={e => onFormSubmit(e)}>
        <h2 className="text-center mb-4 mt-2">{btnText} meal</h2>
        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="text" className="form-label">Meal</label>
          <input
            type="text"
            name="text"
            id="text"
            className="form-control"
            value={meal.text}
            onChange={e => changeForm(e)}
          />
        </div>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="text" className="form-label">Calories</label>
          <input
            type="calories"
            name="calories"
            id="calories"
            className="form-control"
            value={meal.calories}
            onChange={e => changeForm(e)}
          />
        </div>

        <select value={meal.mealTime} name="mealTime" onChange={e => changeForm(e)}>
          {mealSelectSelect.map(mealTime => (
            <option key={mealTime.id} value={mealTime.id}>{mealTime.text}</option>
          ))}
        </select>

        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary">{btnText}</button>
        </div>
      </form>
    </>
  );
};

export default SendForm;