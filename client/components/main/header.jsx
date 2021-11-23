import React from 'react';
import style from '../../styles/components/main/header.css';

function Header({
  handleMiniTabIsOpen,
  miniTabIsOpen,
  handleContactIsOpen,
}) {
  return (
    <div className={style.header}>
      <div className={style.top}>
        <h2 className={style.title}>Messaging.</h2>
        <div className={style.navigation}>
          <button
            type="button"
            className={`${style.btn}`}
          >
            <box-icon type="reguler" name="rotate-left" color="#000000dd"></box-icon>
          </button>
          <button
            type="button"
            className={`${style.btn} ${style['message-btn']}`}
            onClick={handleContactIsOpen}
          >
            <box-icon type="reguler" name="message-square-dots" color="#000000dd"></box-icon>
          </button>
          <button
            type="button"
            className={`${style.btn} ${miniTabIsOpen ? style.active : null}`}
            onClick={handleMiniTabIsOpen}
          >
            <box-icon name="dots-vertical-rounded" color="#000000dd"></box-icon>
          </button>
        </div>
      </div>
      <div className={style['search-bar']}>
        <box-icon name="search-alt" color="#000000dd"></box-icon>
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
