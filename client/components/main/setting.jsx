import React from 'react';
import { useSelector } from 'react-redux';
import style from '../../styles/components/main/setting.css';

function Setting({
  handleSettingIsOpen,
  settingIsOpen,
}) {
  const { darkmode } = useSelector((state) => state);
  return (
    <div
      className={`
        ${style.setting}
        ${settingIsOpen ? style.active : null}
        ${darkmode ? style.dark : null}
      `}
    >
      <div className={style.navigation}>
        <button
          onClick={handleSettingIsOpen}
          className={style.btn}
        >
          <box-icon name="arrow-back" color={darkmode ? '#ffffffdd' : '#000000dd'}></box-icon>
        </button>
        <h2 className={style.title}>Setting</h2>
      </div>
      <div className={style['setting-wrap']}>
        <div className={style.theme}>
          <p>theme</p>
        </div>
        <div
          className={style.cards}
        >
          <box-icon name="key" color={darkmode ? '#ffffffdd' : '#000000dd'}></box-icon>
          <span className={style.text}>
            <h3 className={style.title}>Account</h3>
            <p className={style.paragraf}>Privacy, security, change password</p>
          </span>
        </div>
        <div
          className={style.cards}
        >
          <box-icon name="message-square-dots" color={darkmode ? '#ffffffdd' : '#000000dd'}></box-icon>
          <span className={style.text}>
            <h3 className={style.title}>Chat</h3>
            <p className={style.paragraf}>Privacy, security, change password</p>
          </span>
        </div>
        <div
          className={style.cards}
        >
          <box-icon name="bell" color={darkmode ? '#ffffffdd' : '#000000dd'}></box-icon>
          <span className={style.text}>
            <h3 className={style.title}>Notification</h3>
            <p className={style.paragraf}>Privacy, security, change password</p>
          </span>
        </div>
        <div
          className={style.cards}
        >
          <box-icon name="help-circle" color={darkmode ? '#ffffffdd' : '#000000dd'}></box-icon>
          <span className={style.text}>
            <h3 className={style.title}>Help</h3>
            <p className={style.paragraf}>Help center, contact us, privacy policy</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Setting;
