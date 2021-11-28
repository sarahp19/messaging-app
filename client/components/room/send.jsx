import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import style from '../../styles/components/room/send.css';

import socket from '../../helpers/socket';

function Send({
  foreign,
}) {
  const { room, user, darkmode } = useSelector((state) => state);

  const [formbody, setFormbody] = useState({
    message: '',
    reply: '',
  });

  const handleChange = (event) => {
    setFormbody((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const handleSubmit = (event) => {
    if (event.keyCode === 13 && formbody.message.length !== 0) {
      socket.emit('chat/add', {
        roomId: room.data.roomId,
        userId: user.userId,
        message: formbody.message,
        reply: formbody.reply,
        to: {
          foreignId: foreign.foreignId,
          avatar: foreign.avatar,
          profileName: foreign.profileName,
          username: foreign.username,
        },
      });

      setFormbody((prev) => ({
        ...prev,
        message: '',
        reply: '',
      }));
    }
  }

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
        value={formbody.message}
        onKeyUp={handleSubmit}
        onChange={handleChange}
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
