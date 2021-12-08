import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import style from '../../styles/components/room/chat.css';

import socket from '../../helpers/socket';

function Chat() {
  const { room, user, darkmode } = useSelector((state) => state);

  const [chats, setChats] = useState([]);

  const handleGetChats = () => {
    socket.emit('chat/get', {
      socketId: socket.id,
      foreignId: room.data.foreignId,
      userId: user.userId,
      roomId: room.data.roomId,
    });

    socket.on('chat/get/callback', (args) => {
      if (!args.success) {
        setChats([])
      } else {
        setChats(args.data);
      }
    });
  }

  const formatTime = (args) => {
    const displayTime = new Date(args).toLocaleTimeString([], {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    return displayTime;
  }

  useEffect(() => {
    const parent = document.getElementsByClassName(style.chat)[0];
    parent.scrollTop = parent.scrollHeight;
  });

  useEffect(() => {
    handleGetChats();
  }, [room]);

  return (
    <div
      className={`${style.chat} ${darkmode ? style.dark : null}`}
    >
      {
        chats.length !== 0 && (
          chats.map((item) => (
            <div
              className={`${style.cards} ${item.userId === user.userId ? style['is-user'] : style['is-not-user']}`}
              key={item._id}
            >
              <span className={style.tip}></span>
              <div className={style.message}>
                <p className={style.text}>{item.message}</p>
                <p className={style.time}>{formatTime(item.createdAt)}</p>
              </div>
            </div>
          ))
        )
      }
    </div>
  );
}

export default Chat;
