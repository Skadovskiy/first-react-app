import React from 'react';
import { Dispatch } from "redux";
import { IOrder, Order } from '../Order';
import { NewOrder } from '../NewOrder';
import { generateId, generateRandomString } from '../../utils/generateRandomIndex';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, useDispatch, useSelector } from 'react-redux';
import IState from '../../store/IState';
import { setOrderList } from '../../store/state';
//import styles from './shoppingtable.css';

export function ShoppingTable() {
  const orderList = useSelector((state: IState) => state.orderList);
  const dispatch = useDispatch();
  
  return (
    <div className="container">
      <h1 className="title">Таблица покупок</h1>
      <table className="table">
        <thead>
          <tr>
            <th> Кто </th>
            <th> Что </th>
            <th> Стоимость </th>
            <th>  </th>
          </tr>
        </thead>
        <tbody>
          {
            orderList
            //.map(generateId) 
            .map(
              (order: IOrder) =>
                <Order
                  key={order.id}
                  order={order}
                  deleteCallback={() => dispatch(setOrderList(orderList.filter((f) => f.id !== order.id)))} 
                  />)
          }
          {<NewOrder createCallback={(order: IOrder) => dispatch(setOrderList([...orderList, {...order, id: generateRandomString()}])) } />}
        </tbody>
      </table>
    </div>
  );
}