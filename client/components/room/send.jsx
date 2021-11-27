import React from 'react';
import { useSelector } from 'react-redux';

import style from '../../styles/components/room/send.css';

function Send() {
  const { darkmode } = useSelector((state) => state);

  return (
    <div
      className={`${style.send} ${darkmode ? style.dark : null}`}
    >
      <button
        className={style.btn}
      >
        <box-icon name="smile" color={darkmode ? '#ffffffdd' : '#000000dd'}></box-icon>
      </button>
      <input
        type="text"
        name="message"
        className={style['form-control']}
        placeholder="Type Message..."
        autoComplete="off"
      />
      <button
        className={style.btn}
      >
        <box-icon name="paperclip" color={darkmode ? '#ffffffdd' : '#000000dd'}></box-icon>
      </button>
      <button
        className={style.btn}
      >
        <box-icon type="solid" name="microphone-alt" color={darkmode ? '#ffffffdd' : '#000000dd'}></box-icon>
      </button>
    </div>
  );
}

export default Send;
