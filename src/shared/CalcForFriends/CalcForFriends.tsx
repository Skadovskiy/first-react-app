import React from 'react';
import { generateId } from '../../utils/generateRandomIndex';
import { FoodEatenTable, IEaten, IFoods } from '../FoodEatenTable';
import { FinalCalcTable, IFinalCalcTable } from '../FinalCalcTable';
import { ShoppingTable } from '../ShoppingTable/ShoppingTable';
import { useDispatch, useSelector } from 'react-redux';
import IState from '../../store/IState';
import { setFinalCalc, setFoodEaten, setUniqueFoods, setUniqueFriends } from '../../store/state';

const finalCalcInit: Array<IFinalCalcTable> = [];

export function CalcForFriends() {
  const dispatch = useDispatch();

  const { 
    orderList, 
    uniqueFriends, 
    foodEaten, 
  } = useSelector((state: IState) => state);

  const orderByFriend = (a: IEaten, b: IEaten) => a.friend < b.friend ? -1 : (a.friend > b.friend ? 1 : 0);

  React.useEffect(() => {
    dispatch(setUniqueFriends(
      orderList
        .map((order) => order.Who)
        .filter((value, index, array) => array.indexOf(value) === index)
    ))
  }, [orderList]);

  React.useEffect(() => {
    dispatch(setUniqueFoods(
      orderList
        .map((order) => ({ name: order.What, id: order.id }))
        .filter((value, index, array) => array.indexOf(value) === index)
    ))
  }, [orderList]);

  React.useEffect(() => {
    dispatch(setFoodEaten(
      uniqueFriends
        .map((friend) => ({ 
          friend: friend, 
          checked: orderList.reduce((obj, food) => (
            {...obj, [`"${food.id}"`]: false }
            ), {}) 
          }))
        .map(generateId)
        .sort(orderByFriend)))
  }, [uniqueFriends, orderList]);

  React.useEffect(
    () => {
      dispatch(
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
        ))
    }, [foodEaten]);


  return (
    <div>
      <ShoppingTable/>
      <FoodEatenTable/>
      <FinalCalcTable/>
    </div>
  );
}
