import {useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import IMeal from '../../types.d.';
import axiosApi from '../../axiosApi';
import SendForm from '../../Components/SendForm/SendForm';
import Spinner from '../../Components/UI/Spinner/Spinner';

const AddMeal = () => {

      const Navigation = useNavigate();

      const [meal, setMeal] = useState<IMeal>({
        text: '',
        mealTime: 'breakfast',
        calories: '',
      });

      const [loading, setLoading] = useState(false);

      const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setMeal((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      };

      const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (meal.text && meal.calories !== '') {
          setLoading(true);
          try {
            await axiosApi.post('meal.json', meal);
          } finally {
            setLoading(false);
            Navigation('/');
          }
        } else {
          alert('add meal and calories');
        }
      };

  return (
      <>
          {loading ? <Spinner/>  :
            <SendForm
              meal={meal}
              changeForm={e => changeForm(e)}
              onFormSubmit={e => onFormSubmit(e)}
            />
          }
      </>
  );
};

export default AddMeal;