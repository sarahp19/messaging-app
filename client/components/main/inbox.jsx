import React from 'react';
import { useDispatch } from 'react-redux';
import style from '../../styles/components/main/inbox.css';
import photo from '../../assets/images/zuck.jpg';

import * as action from '../../redux/actions';

function Inbox() {
  const dispatch = useDispatch();

  return (
    <div className={style.inbox}>
      <div className={style['inbox-cards']}>
        <span
          className={style.avatar}
          style={{
            background: `url(${photo})`,
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
    </div>
  );
}

export default Inbox;
