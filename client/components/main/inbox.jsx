import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import style from '../../styles/components/main/inbox.css';

import socket from '../../helpers/socket';

function Inbox() {
  const isDev = process.env.NODE_ENV === 'development';

  const { user, darkmode } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [inboxs, setInboxs] = useState([]);

  const handleGetInboxs = () => {
    socket.emit('inbox/get', {
      socketId: socket.id,
      userId: user.userId,
    });

    socket.on('inbox/get/callback', (args) => {
      try {
        if (!args.success) {
          throw args;
        }

        setInboxs(args.data);
      }
      catch (error0) {
        console.log(error0.message);
      }
    });
  }

  const handleFormatTime = (args) => moment(args).fromNow();
  const inboxOwner = (args) => args.find((item) => item.userId !== user.userId);

  useEffect(() => {
    handleGetInboxs();
  }, []);

  return (
    <div className={`${style.inbox} ${darkmode ? style.dark : null}`}>
      {
        inboxs.map((item) => (
          <div className={style['inbox-cards']} key={item._id}>
            <img
              src={isDev ? `http://localhost:8000/api/images/${inboxOwner(item.owners).avatar}` : `/api/images/${inboxOwner(item.owners).avatar}`}
              className={style.avatar}
            />
            <div
              className={style.text}
              aria-hidden="true"
              onClick={() => dispatch({
                type: 'counter/roomIsOpen',
                payload: {
                  active: true,
                  display: true,
                  data: {
                    foreignId: inboxOwner(item.owners).userId,
                    roomId: item.roomId,
                  },
                },
              })}
            >
              <span className={style.name}>
                <h3 className={style['profile-name']}>{inboxOwner(item.owners).profileName}</h3>
                <p className={style.username}>@{inboxOwner(item.owners).username}</p>
              </span>
              <span className={style.ctx}>
                <p>{item.lastMessage.from === user.userId ? 'You: ' : 'Him: '}</p>
                <p className={style.message}>{item.lastMessage.text}</p>
              </span>
              <p className={style.time}>{handleFormatTime(item.updatedAt)}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Inbox;
