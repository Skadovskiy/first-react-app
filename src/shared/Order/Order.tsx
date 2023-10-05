import React from 'react';
//import styles from './order.css';

export interface IOrder {
  id: string
  Who: string,
  What: string,
  Cost: number,
}
export interface IOrderProps {
  order: IOrder
  deleteCallback: () => void
}

export function Order({ order, deleteCallback }: IOrderProps) {
  return (
    <tr key={order.id} >
      <td> {order.Who} </td>
      <td> {order.What} </td>
      <td> {order.Cost} </td>
      <td><button className="delete" onClick={() => deleteCallback()}></button></td>
    </tr>
  );
}
