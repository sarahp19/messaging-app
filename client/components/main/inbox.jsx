import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import style from '../../styles/components/main/inbox.css';
import * as photo from '../../assets/images';

import * as action from '../../redux/actions';
import socket from '../../helpers/socket';

function Inbox() {
  const { user, darkmode } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [inboxs, setInboxs] = useState([]);

  const handleGetInboxs = () => {
    socket.emit('inbox/get', {
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

  useEffect(() => {
    handleGetInboxs();
  }, []);

  return (
    <div className={`${style.inbox} ${darkmode ? style.dark : null}`}>
      {
        inboxs.map((item) => (
          <div className={style['inbox-cards']} key={item._id}>
            <span
              className={style.avatar}
              style={{
                background: `url(${photo.zuck})`,
                backgroundSize: 'cover',
              }}
            >
            </span>
            <div
              className={style.text}
              aria-hidden="true"
              onClick={() => dispatch(action.roomIsOpen({
                active: true,
                userId: user.userId,
                foreignId: item.to.foreignId,
              }))}
            >
              <span className={style.name}>
                <h3 className={style['profile-name']}>{item.to.profileName}</h3>
                <p className={style.username}>@{item.to.username}</p>
              </span>
              <p className={style.message}>{item.lastMessage.text}</p>
              <p className={style.time}>{handleFormatTime(item.createdAt)}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Inbox;
