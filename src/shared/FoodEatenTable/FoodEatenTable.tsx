import React from 'react';
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

export interface IFoodEatenTableProps {
  foods: Array<IFoods>
  foodEaten: Array<IEaten>
  checkCallback: (eaten: IEaten, food: IFoods) => void,
}

export function FoodEatenTable({foods, foodEaten, checkCallback}: IFoodEatenTableProps) {
  return (
    <div className="container">
      <h1 className="title">Таблица потребления</h1>
      <table className="table">
        <thead>
          <tr>
            <th>\</th> 
            {foods.map ((food) => <th key={food.id}>{food.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {foodEaten.map((eaten) => <tr key={eaten.id}><th>{eaten.friend}</th>

          { foods.map((food) => 
             <td key={food.id}><label className="checkbox">
             <input type="checkbox" checked={ eaten.checked[`"${food.id}"`]} onChange={() => checkCallback(eaten, food)}/>
          </label></td>
          )} 
          
          </tr>)}
        </tbody>
      </table>
    </div>

  );
}
