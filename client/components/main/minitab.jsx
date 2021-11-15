import React from 'react';
import style from '../../styles/components/main/minitab.css';

function MiniTab({
  miniTabIsOpen,
  handleProfileIsOpen,
}) {
  return (
    <div
      className={`${style.minitab} ${miniTabIsOpen ? style.active : null}`}
    >
      <button
        className={style.btn}
        onClick={handleProfileIsOpen}
      >
        <box-icon type="reguler" name="user" color="#ffffff70"></box-icon>
        <p>Profile</p>
      </button>
      <button className={style.btn}>
        <box-icon type="reguler" name="star" color="#ffffff70"></box-icon>
        <p>Star Message</p>
      </button>
      <button className={style.btn}>
        <box-icon type="reguler" name="cog" color="#ffffff70"></box-icon>
        <p>Setting</p>
      </button>
      <button className={style.btn}>
        <box-icon type="reguler" name="log-out-circle" color="#ffffff70"></box-icon>
        <p>LogOut</p>
      </button>
    </div>
  );
}

export default MiniTab;
