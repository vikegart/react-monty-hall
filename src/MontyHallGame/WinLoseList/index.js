import React from 'react';
import s from './WinLoseList.css';

const WinLoseList = ({ label, data }) => {

  return (
    <div className={s.list}>
      <p>
        Результаты, когда ты: {label === 'Switched' ? 'изменил выбор' : 'оставил выбор прежним' }
      </p>

      <ul>
        <li>
          {data.wins} {data.wins === 1 ? 'Победа' : 'Побед'}
        </li>

        <li>
          {data.losses} {data.losses === 1 ? 'Проигрыш' : 'Проигрышей'}
        </li>
      </ul>
    </div>
  );
}

export default WinLoseList;
