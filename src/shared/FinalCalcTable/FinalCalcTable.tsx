import React from 'react';
import { useSelector } from 'react-redux';
import IState from '../../store/IState';
// import styles from './finalcalctable.css';

export interface IFinalCalcTable {
  Who: string, 
  Whom: string, 
  HowMany: number
}

export function FinalCalcTable() {
  const finalCalc = useSelector((state: IState) => state.finalCalc);

  return (
    <div className="container">
      <h1 className="title">Таблица итогового расчёта</h1>
      <table className="table">
        <thead>
          <tr>
            <th> Кто </th>
            <th> Кому </th>
            <th> Сколько </th>
          </tr>
        </thead>
        <tbody>
          {finalCalc.map((calc, index) => 
            <tr key={index}>
              <td>{calc.Who}</td>
              <td>{calc.Whom}</td>
              <td>{calc.HowMany}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

