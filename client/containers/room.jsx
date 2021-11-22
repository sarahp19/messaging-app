import React from 'react';
import { useSelector } from 'react-redux';
import style from '../styles/containers/room.css';

import * as comp from '../components/room';

function Room() {
  const props = useSelector((state) => state);
  return (
    <div
      className={`${style.room} ${props.room ? style.active : null}`}
    >
      <div className={style['room-wrap']}>
        <comp.header />
        <comp.chat />
        <comp.send />
      </div>
    </div>
  );
}

export default Room;
