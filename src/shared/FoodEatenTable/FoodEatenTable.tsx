import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from "redux";
import IState from '../../store/IState';
import { setFoodEaten } from '../../store/state';
// import styles from './foodeatentable.css';


export interface IChecked {
  [friend: string]: boolean
}

export interface IEaten {
  id: string,
  friend: string,
  checked: IChecked
}

export interface IFoods {
  id: string,
  name: string
}

const orderByFriend = (a: IEaten, b: IEaten) => a.friend < b.friend ? -1 : (a.friend > b.friend ? 1 : 0);

export function FoodEatenTable() {
  const dispatch = useDispatch();

  const {
    uniqueFoods,
    foodEaten
  } = useSelector((state: IState) => state);

  return (
    <div className="container">
      <h1 className="title">Таблица потребления</h1>
      <table className="table">
        <thead>
          <tr>
            <th>\</th>
            {uniqueFoods.map((food) => <th key={food.id}>{food.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {foodEaten.map((eaten) => <tr key={eaten.id}><th>{eaten.friend}</th>

            {uniqueFoods.map((food) =>
              <td key={food.id}><label className="checkbox">
                <input type="checkbox" checked={eaten.checked[`"${food.id}"`]} onChange={() => {
                  const newEaten = structuredClone(foodEaten.filter(e => eaten.friend === e.friend)[0]);
                  newEaten.checked[`"${food.id}"`] = !eaten.checked[`"${food.id}"`];
                  dispatch(
                    setFoodEaten(
                      [...foodEaten.filter(e => eaten.friend !== e.friend), newEaten].sort(orderByFriend)));
                }} />
              </label></td>
            )}

          </tr>)}
        </tbody>
      </table>
    </div>

  );
}
