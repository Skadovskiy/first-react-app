import React from 'react';
import Task from '../ToDoList/Task';
//import styles from './taskview.css';

export interface TaskViewProps {
  checkCallback: (done: boolean) => void,
  deleteCallback: () => void
  task: Task
}

export function TaskView({ checkCallback, deleteCallback, task }: TaskViewProps) {
  return (
    <tr>
      <td><label className="checkbox">
        <input type="checkbox" checked={task.done} onChange={() => checkCallback(!task.done)} />
        {task.description}
      </label></td>
      <td><button className="delete" onClick={() => deleteCallback()}></button></td>
    </tr>);
}
