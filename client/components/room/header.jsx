import React from 'react';
import { useDispatch } from 'react-redux';

import style from '../../styles/components/room/header.css';
import * as photo from '../../assets/images';

import * as action from '../../redux/actions';

function Header() {
  const dispatch = useDispatch();

  return (
    <div className={style.header}>
      <button
        type="button"
        className={`${style['close-btn']}`}
        onClick={() => dispatch(action.roomIsOpen(false))}
      >
        <box-icon name="arrow-back" color="#ffffffdd"></box-icon>
      </button>
      <div className={style.profile}>
        <span
          className={style.avatar}
          style={{
            background: `url(${photo.zuck})`,
            backgroundSize: 'cover',
          }}
        >
        </span>
        <div className={style.info}>
          <h3 className={style['profile-name']}>Mark Zuckerberg</h3>
          <p className={style.online}>online</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
