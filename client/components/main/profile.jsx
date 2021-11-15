import React, { useState } from 'react';
import style from '../../styles/components/main/profile.css';
import * as img from '../../assets/images';

function Profile({ handleProfileIsOpen, profileIsOpen }) {
  const [readOnly, setReadOnly] = useState({
    email: true,
  });

  const allowChanges = () => {
    if (!readOnly.email) {
      return setReadOnly((prev) => ({
        ...prev, email: true,
      }));
    }

    return setReadOnly((prev) => ({
      ...prev, email: false,
    }));
  }

  return (
    <div
      className={`${style.profile} ${profileIsOpen ? style.active : null}`}
    >
      <div className={style['profile-wrap']}>
        <div
          className={style.header}
          style={{
            background: `url(${img.museum}) center center no-repeat`,
            backgroundSize: 'cover',
          }}
        >
          <div className={style.navigation}>
            <button
              onClick={handleProfileIsOpen}
            >
              <box-icon name="arrow-back" color="#ffffffdd"></box-icon>
            </button>
          </div>
          <span
            className={style.avatar}
            style={{
              background: `url(${img.defaultProfile}) center center no-repeat`,
              backgroundSize: 'cover',
            }}
          >
          </span>
        </div>
        <div className={style.info}>
          <div className={style.cards}>
            <h1>Febriadji</h1>
            <p>@febriadj</p>
          </div>
          <div className={style.cards}>
            <box-icon name="info-circle" color="#ffffff70"></box-icon>
            <span>
              <p>#techenthusiast in the era of society 5.0</p>
              <button><box-icon name="pencil" color="#ffffff70"></box-icon></button>
            </span>
          </div>
          <div className={style.cards}>
            <box-icon name="phone" color="#ffffff70"></box-icon>
            <span>
              <p>+62 851-5670-3982</p>
              <button><box-icon name="pencil" color="#ffffff70"></box-icon></button>
            </span>
          </div>
          <div className={style.cards}>
            <box-icon name="envelope" color="#ffffff70"></box-icon>
            <span
              className={`${readOnly.email ? null : style.active}`}
            >
              <input
                type="email"
                name="email"
                value="iamfebriadji@gmail.com"
                readOnly={!!readOnly.email}
              />
              <button onClick={allowChanges}>
                <box-icon
                  name={readOnly.email ? 'pencil' : 'right-top-arrow-circle'}
                  color={readOnly.email ? '#ffffff70' : '#3ed8ffdd'}
                >
                </box-icon>
              </button>
            </span>
          </div>
        </div>
        <div className={style.footer}>
          <p>Joined Since</p>
          <h1 className={style.date}>15 Nov 2021</h1>
        </div>
      </div>
    </div>
  );
}

export default Profile;
