import React from 'react';
//import styles from './newitem.css';

export interface NewItemProps {
  createCallback: (description: string) => void
}

export function NewItem({createCallback}: NewItemProps) {
  const [newItemDescription, setNewItemDescription] = React.useState("");
  return (
    <tr>
      <td>
        <input
          type='text'
          placeholder='Новая задача'
          value={newItemDescription}
          onChange={event => setNewItemDescription(event.target.value)}
          className="input is-primary" />
      </td>
      <td>
        <button className='button is-primary' onClick={() => {
          createCallback(newItemDescription);
          setNewItemDescription("");
        }}>Добавить</button>
      </td>
    </tr>)
}