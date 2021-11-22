import React from 'react';
import style from '../../styles/components/room/send.css';

function Send() {
  return (
    <div className={style.send}>
      <button
        className={style.btn}
      >
        <box-icon name="smile" color="#ffffffdd"></box-icon>
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
        <box-icon name="paperclip" color="#ffffffdd"></box-icon>
      </button>
      <button
        className={style.btn}
      >
        <box-icon type="solid" name="microphone-alt" color="#ffffffdd"></box-icon>
      </button>
    </div>
  );
}

export default Send;
