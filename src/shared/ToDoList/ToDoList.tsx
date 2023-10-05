import React from 'react';
import Task from './Task';
import { TaskView } from '../TaskView';
import { NewItem } from '../NewItem';
//import styles from './todolist.css';

const listInit: Array<Task> = [
  {
    done: false,
    description: "Вынести мусор"
  },
  {
    done: false,
    description: "Почистить зубы"
  }
]

export function ToDoList() {
  const [list, setList] = React.useState(listInit);
  
  return (
    <div className="container">
      <h1>ToDo List</h1>
      <table>
        <tbody>
          {
            list.map((value: Task, index: number) => 
            <TaskView 
              checkCallback = {(flag: boolean) => {list[index].done = flag; setList([...list])}} 
              deleteCallback = {() => setList(list.filter((_, i) => i !== index))}
              task={value}
            />
            )
          }
          <NewItem createCallback={(newDescr: string) => { setList([...list, { done: false, description: newDescr }]) }} />
        </tbody>
      </table>
    </div>
  );
}

