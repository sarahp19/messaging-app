import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import style from '../../styles/components/room/chat.css';

import socket from '../../helpers/socket';

function Chat() {
  const { room, user, darkmode } = useSelector((state) => state);

  const [chats, setChats] = useState([]);

  const handleGetChats = () => {
    socket.emit('chat/get', {
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
              <p className={style.message}>{item.message}</p>
            </div>
          ))
        )
      }
    </div>
  );
}

export default Chat;
