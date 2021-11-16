import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from '../styles/containers/room.css';

import * as action from '../redux/actions';

function Room() {
  const props = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div
      className={`${style.room} ${props.room ? style.active : null}`}
      aria-hidden="true"
      onClick={() => dispatch(action.roomIsOpen(false))}
    >
      <p>room</p>
    </div>
  );
}

export default Room;
