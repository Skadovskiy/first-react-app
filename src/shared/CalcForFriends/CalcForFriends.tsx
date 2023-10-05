import React from 'react';
import { ShoppingTable } from '../ShoppingTable';
import { IOrder } from '../Order';
import { merge } from '../../utils/js/merge';
import { generateId, generateRandomString } from '../../utils/generateRandomIndex';
import { FoodEatenTable, IEaten, IFoods } from '../FoodEatenTable';
import { FinalCalcTable, IFinalCalcTable } from '../FinalCalcTable';
//import styles from './calcforfriends.css';

const orderListInit: Array<IOrder> = []
const eatensInit: Array<string> = []
const foodsInit: Array<IFoods> = []
const foodEatenInit: Array<IEaten> = [];
const finalCalcInit: Array<IFinalCalcTable> = [];

export function CalcForFriends() {
  const [orderList, setOrderList] = React.useState(orderListInit);
  const [uniqueFriends, setUniqueFriends] = React.useState(eatensInit);
  const [uniqueFoods, setUniqueFoods] = React.useState(foodsInit);
  const [foodEaten, setFoodEaten] = React.useState(foodEatenInit);
  const [finalCalc, setFinalCalc] = React.useState(finalCalcInit);
  const orderByFriend = (a: IEaten, b: IEaten) => a.friend < b.friend ? -1 : (a.friend > b.friend ? 1 : 0);

  React.useEffect(() => setUniqueFriends(
    orderList
      .map((order) => order.Who)
      .filter((value, index, array) => array.indexOf(value) === index)
  ), [orderList]);

  React.useEffect(() => setUniqueFoods(
    orderList
      .map((order) => ({ name: order.What, id: order.id }))
      .filter((value, index, array) => array.indexOf(value) === index)
  ), [orderList]);

  React.useEffect(() => setFoodEaten(
    uniqueFriends
      .map((friend) => ({ friend: friend, checked: orderList.reduce((obj, food) => ({ ...obj, [`"${food.id}"`]: false }), {}) }))
      .map(generateId)
      .sort(orderByFriend)),
    [uniqueFriends, orderList]);

  React.useEffect(
    () => {
      setFinalCalc(
        orderList.flatMap((order) =>
          foodEaten
            .filter(r => r.checked[`"${order.id}"`])
            .map((eaten, _, eatenList) => ({
              Who: eaten.friend,
              Whom: order.Who,
              HowMany: order.Cost / eatenList.length
            })))
          .filter(f => f.Who !== f.Whom)
          .reduce((prev, curr) =>
            [...prev, prev.filter(f => f.Who === curr.Whom && f.Whom === curr.Who).length > 0 ?
              { Who: curr.Whom, Whom: curr.Who, HowMany: -curr.HowMany } :
              curr
            ]
            , finalCalcInit)
          .reduce((prev, curr) => [...prev.filter(f => !(f.Who === curr.Who && f.Whom === curr.Whom)),
          {
            ...curr,
            HowMany: curr.HowMany + prev
              .filter(f => f.Who === curr.Who && f.Whom === curr.Whom)
              .reduce((_, c) => c.HowMany, 0)
          }], finalCalcInit).map(curr => curr.HowMany < 0 ?
            { Who: curr.Whom, Whom: curr.Who, HowMany: -curr.HowMany } :
            curr)
      );
      console.log('foodEaten', foodEaten)
    },
    [foodEaten]);


  return (
    <div>
      <ShoppingTable
        deleteCallback={(key) => () => setOrderList(orderList.filter((order) => order.id !== key))}
        createCallback={(order: IOrder) => { setOrderList([...orderList, merge(order)({ 'id': generateRandomString() })]) }}
        orderList={orderList}
      />

      <FoodEatenTable
        foods={uniqueFoods}
        foodEaten={foodEaten}
        checkCallback={(eaten: { friend: string, checked: { [key: string]: boolean } }, food: IFoods) => {
          console.log('food.name', food.name, 'eaten.friend', eaten.friend);
          const newEaten = foodEaten.filter(e => eaten.friend === e.friend)[0];
          newEaten.checked[`"${food.id}"`] = !eaten.checked[`"${food.id}"`];
          setFoodEaten(
            [...foodEaten.filter(e => eaten.friend !== e.friend), newEaten]
              .sort(orderByFriend));
        }} />


      <FinalCalcTable finalCalc={finalCalc} />

    </div>
  );
}
