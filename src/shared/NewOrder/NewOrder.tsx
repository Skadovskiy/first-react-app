import React from 'react';
import { IOrder } from '../Order';
//import styles from './neworder.css';

export interface NewOrderProps {
  createCallback: (order: IOrder) => void
}

export function NewOrder({ createCallback }: NewOrderProps) {

  const orderEmpty: IOrder = { Who: "", What: "", Cost: 0, id: "" };

  const [order, setNewOrder] = React.useState(orderEmpty);
  return (
    <tr>
      <td>
        <input
          type='text'
          placeholder='Кто'
          value={order.Who}
          onChange={event => setNewOrder({ ...order, Who: event.target.value })}
          className="input is-primary" />
      </td>
      <td>
        <input
          type='text'
          placeholder='Что'
          value={order.What}
          onChange={event => setNewOrder({ ...order, What: event.target.value })}
          className="input is-primary" />
      </td>
      <td>
        <input
          type='text'
          placeholder='Сколько'
          value={order.Cost}
          onChange={event => setNewOrder({ ...order, Cost: Number(event.target.value) })}
          className="input is-primary" />
      </td>
      <td>
        <button className='button is-primary' onClick={() => {
          createCallback(order);
          setNewOrder(orderEmpty);
        }}>Добавить</button>
      </td>
    </tr>)
}