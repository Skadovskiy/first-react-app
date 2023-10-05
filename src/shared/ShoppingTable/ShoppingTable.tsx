import React from 'react';
import { IOrder, Order } from '../Order';
import { NewOrder } from '../NewOrder';
import { generateId } from '../../utils/generateRandomIndex';
//import styles from './shoppingtable.css';

export interface IShoppingTableProps {
  deleteCallback: (key: string) => () => void
  createCallback: (order: IOrder) => void
  orderList: Array<IOrder>
}

export function ShoppingTable({deleteCallback, createCallback, orderList} : IShoppingTableProps) {
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
                  deleteCallback={deleteCallback(order.id)} />)
          }
          {<NewOrder createCallback={createCallback} />}
        </tbody>
      </table>
    </div>
  );
}
