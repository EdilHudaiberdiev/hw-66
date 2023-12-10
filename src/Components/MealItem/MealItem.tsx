import React from 'react';
import {useNavigate} from 'react-router-dom';

export interface Props {
  id: string,
  text: string
  mealTime: string
  calories: string
  deleteMeal: (id: string) => void
}

const MealItem: React.FC<Props> = ({id, text, mealTime, calories, deleteMeal}) => {
  const Navigation = useNavigate();
  return (
      <div key={id} className="border mb-2 bg-light">
        <p><b>{text}</b></p>
        <p>{calories} calories
          {parseInt(calories) > 180 ? <i> - too mach! :(</i>
            :  <i> - good choice :)</i>
          }
        </p>
        <p>{mealTime}</p>
        <button className="btn btn-danger me-3 mb-2" type="button" onClick={() => deleteMeal(id)}>Delete</button>
        <button className="btn btn-info me-3 mb-2" type="button" onClick={() => Navigation(`/meal/${id}/edit-meal`)}>Edit</button>
      </div>
  );
};

export default MealItem;