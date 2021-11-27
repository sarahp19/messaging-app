import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from '../../styles/components/main/inbox.css';
import * as photo from '../../assets/images';

import * as action from '../../redux/actions';

function Inbox() {
  const { darkmode } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className={`${style.inbox} ${darkmode ? style.dark : null}`}>
      <div className={style['inbox-cards']}>
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
          onClick={() => dispatch(action.roomIsOpen(true))}
        >
          <span className={style.name}>
            <h3 className={style['profile-name']}>Mark Zuckerberg</h3>
            <p className={style.username}>@zuck</p>
          </span>
          <p className={style.message}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <p className={style.time}>2 minutes ago</p>
        </div>
      </div>
      <div className={style['inbox-cards']}>
        <span
          className={style.avatar}
          style={{
            background: `url(${photo.avatar})`,
            backgroundSize: 'cover',
          }}
        >
        </span>
        <div
          className={style.text}
          aria-hidden="true"
          onClick={() => dispatch(action.roomIsOpen(true))}
        >
          <span className={style.name}>
            <h3 className={style['profile-name']}>Larry Page</h3>
            <p className={style.username}>@larrypage</p>
          </span>
          <p className={style.message}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <p className={style.time}>Yesterday</p>
        </div>
      </div>
    </div>
  );
}

export default Inbox;
