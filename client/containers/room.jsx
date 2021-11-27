import React from 'react';
import { useSelector } from 'react-redux';
import style from '../styles/containers/room.css';

import * as comp from '../components/room';

function Room() {
  const { room, darkmode } = useSelector((state) => state);

  return (
    <div
      className={`${style.room} ${darkmode ? style.dark : null} ${room.active ? style.active : null}`}
    >
      <div className={style['room-wrap']}>
        {
          room.active
            ? (
              < >
                <comp.header />
                <comp.chat />
                <comp.send />
              </>
            )
            : <comp.info />
        }
      </div>
    </div>
  );
}

export default Room;
