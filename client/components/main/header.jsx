import React from 'react';
import style from '../../styles/components/main/header.css';

function Header() {
  return (
    <div className={style.header}>
      <div className={style.top}>
        <h2 className={style.title}>Messaging.</h2>
        <div className={style.navigation}>
          <button type="button" className={`${style.btn} ${style['story-btn']}`}>
            <box-icon type="reguler" name="rotate-left" color="#ffffffdd"></box-icon>
          </button>
          <button type="button" className={`${style.btn} ${style['message-btn']}`}>
            <box-icon type="reguler" name="message-square-dots" color="#ffffffdd"></box-icon>
          </button>
          <button type="button" className={`${style.btn} ${style['dots-btn']}`}>
            <box-icon name="dots-vertical-rounded" color="#ffffffdd"></box-icon>
          </button>
        </div>
      </div>
      <div className={style['search-bar']}>
        <input
          type="search"
          name="search"
          placeholder="Search chat, group or start a new chat"
          className={style['form-control']}
        />
      </div>
    </div>
  );
}

export default Header;
