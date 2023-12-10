import {useNavigate, useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import IMeal from '../../types.d.';
import axiosApi from '../../axiosApi';
import Spinner from '../../Components/UI/Spinner/Spinner';
import SendForm from '../../Components/SendForm/SendForm';

const EditMeal = () => {
  const Navigation = useNavigate();
  const [meal, setMeal] = useState<IMeal>({
    text: '',
    mealTime: '',
    calories: '',
  });

  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const  fetchData = async () => {
      setLoading (true);

      try {
        const response = await axiosApi.get (`/meal/${params.id}.json`);
        const meal = response.data;

        if (response.data !== null) {
          setMeal ({
            ...meal,
            text: meal.text,
            mealTime: meal.mealTime,
            calories: meal.calories
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData().catch(e => console.error(e));
    }
  }, [params.id]);

  const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setMeal((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axiosApi.put(`meal/${params.id}.json`, meal);
    } finally {
      Navigation('/');
    }
  };

  return (
    <>
      {loading ? <Spinner/> :
        <SendForm
          meal={meal}
          changeForm={changeForm}
          onFormSubmit={onFormSubmit}
          btnText="Edit"
        />
      }
    </>
  );
};

export default EditMeal;