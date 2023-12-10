import {useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import Spinner from '../../Components/UI/Spinner/Spinner';

export interface IMeals {
  id: string,
  text: string,
  mealTime: string,
  calories: string,
}

const Home = () => {

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

  }, []);

  return (

    <div>
      <p>Total calories = {totalCalories} kcal</p>

      {loading ? <Spinner/> :
        <>
          {meal.length > 0 ?
            <>
              {meal.map(mealItem => (
                <div key={mealItem.id} className="border mb-2 bg-light">
                  <p><b>{mealItem.text}</b></p>
                  <p>{mealItem.calories} colories
                    {parseInt(mealItem.calories) > 150 ? <i> - to mach! :(</i>
                      :  <i> - good choice :)</i>
                    }
                  </p>
                  <p>{mealItem.mealTime}</p>
                </div>
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