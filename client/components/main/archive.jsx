import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import style from '../../styles/components/main/archive.css';

import socket from '../../helpers/socket';

function ArchiveBox({
  handleArchiveIsOpen,
  archiveIsOpen,
}) {
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

  const Condition = ({ condition }) => {
    if (condition === 'read') {
      return (
        <span
          className={style['condition-icon']}
          style={{
            background: '#39A388',
          }}
        >
          <box-icon
            name="check-double"
            color={darkmode ? '#FF6768' : '#FF6768'}
          >
          </box-icon>
        </span>
      );
    }

    return (
      <span
        className={style['condition-icon']}
      >
        <box-icon
          name="check-double"
          color={darkmode ? '#ffffffdd' : '#000000dd'}
        >
        </box-icon>
      </span>
    );
  }

  useEffect(() => {
    handleGetInboxs();
  }, []);

  return (
    <div
      className={`
        ${style.archive}
        ${archiveIsOpen ? style.active : null}
        ${darkmode ? style.dark : null}
      `}
    >
      <div className={style['archive-wrap']}>
        <div className={style.navigation}>
          <button
            onClick={handleArchiveIsOpen}
            className={style.btn}
          >
            <box-icon name="arrow-back" color={darkmode ? '#ffffffdd' : '#000000dd'}></box-icon>
          </button>
          <h2 className={style.title}>Archived</h2>
        </div>
        {
          inboxs
            .filter((item) => item.archived)
            .map((item) => (
              <div className={style['archive-cards']} key={item._id}>
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
                  <span className={style.top}>
                    <h3 className={style['profile-name']}>{inboxOwner(item.owners).profileName}</h3>
                    <p className={style.time}>{handleFormatTime(item.updatedAt)}</p>
                  </span>
                  <span className={style.ctx}>
                    {
                      item.lastMessage.from === user.userId
                      && (
                        <Condition
                          condition={item.lastMessage.condition}
                        />
                      )
                    }
                    <p
                      className={style.message}
                      style={{
                        margin: item.lastMessage.from === user.userId ? '0' : '0 40px 0 0',
                      }}
                    >
                      {item.lastMessage.text}
                    </p>
                    <p
                      className={style.total}
                      style={{
                        opacity: item.lastMessage.from === user.userId ? 0 : 1,
                      }}
                    >
                      {
                        item.lastMessage.from !== user.userId
                        && item.total
                      }
                    </p>
                  </span>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default ArchiveBox;
