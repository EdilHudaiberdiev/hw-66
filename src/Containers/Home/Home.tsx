import {useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import Spinner from '../../Components/UI/Spinner/Spinner';
import MealItem from '../../Components/MealItem/MealItem';
import {useParams} from 'react-router-dom';

export interface IMeals {
  id: string,
  text: string,
  mealTime: string,
  calories: string,
}

const Home = () => {

  const params = useParams();
  const [meal, setMeal] = useState<IMeals[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCalories, setTotalCalories] = useState(0);

  const fetchData = async (url: string) => {
    setLoading(true);
    const mealArray: IMeals[] = [];
    const response = await axiosApi.get(url);
    const meal: {[key: string]: IMeals} = response.data;

    if (response.data !== null) {
      for (const [key, value] of Object.entries(meal)) {
        mealArray.push({
          id: key,
          text: value.text,
          mealTime: value.mealTime,
          calories: value.calories
        });
      }
      setMeal(mealArray);
      caloriesCounter(mealArray);
    }
    setLoading(false);
  };

  const caloriesCounter = (mealItem: IMeals[]) => {
    let total = 0;
    mealItem.map((meal) => {
      total += parseInt(meal.calories);
    });
    setTotalCalories(total);
  };

  useEffect(() => {
    fetchData('/meal.json').catch(e => console.error(e));
    console.log(meal);

  }, [params.id]);

  const deleteMeal = async (id: string) => {
    setLoading(true);
    try {
      await axiosApi.delete(`/meal/${id}.json`);
      fetchData('/meal.json').catch(e => console.error(e));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (

    <div>
      <p className="mt-2 border fs-5 fw-bold bg-light">Total calories = {totalCalories} kcal</p>

      {loading ? <Spinner/> :
        <>
          {meal.length > 0 ?
            <>
              {meal.map(mealItem => (
                <MealItem id={mealItem.id} key={mealItem.id} text={mealItem.text} calories={mealItem.calories}
                          mealTime={mealItem.mealTime} deleteMeal={deleteMeal}/>

              ))}
            </>
            :
            <h4>No meal yet</h4>
          }
        </>
      }
    </div>
  );
};

export default Home;