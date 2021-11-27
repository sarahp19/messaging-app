import React from 'react';
import { useSelector } from 'react-redux';
import style from '../../styles/components/main/minitab.css';

function MiniTab({
  miniTabIsOpen,
  handleProfileIsOpen,
}) {
  const { darkmode } = useSelector((state) => state);

  return (
    <div
      className={`${style.minitab} ${darkmode ? style.dark : null} ${miniTabIsOpen ? style.active : null}`}
    >
      <button
        className={style.btn}
        onClick={handleProfileIsOpen}
      >
        <box-icon type="reguler" name="user" color={darkmode ? '#ffffffdd' : '#000000dd'}></box-icon>
        <p>Profile</p>
      </button>
      <button className={style.btn}>
        <box-icon type="reguler" name="star" color={darkmode ? '#ffffffdd' : '#000000dd'}></box-icon>
        <p>Star Message</p>
      </button>
      <button className={style.btn}>
        <box-icon type="reguler" name="cog" color={darkmode ? '#ffffffdd' : '#000000dd'}></box-icon>
        <p>Setting</p>
      </button>
      <button className={style.btn}>
        <box-icon type="reguler" name="log-out-circle" color={darkmode ? '#ffffffdd' : '#000000dd'}></box-icon>
        <p>LogOut</p>
      </button>
    </div>
  );
}

export default MiniTab;
