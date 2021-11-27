import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from '../../styles/components/room/header.css';

import * as action from '../../redux/actions';

function Header() {
  const isDev = process.env.NODE_ENV === 'development';

  const { room, darkmode } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    foreignId: '',
    profileName: '',
    username: '',
    avatar: '',
  });

  const handleGetForeignUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = isDev ? `http://localhost:8000/api/users?id=${room.data.foreignId}` : `/api/users?id=${room.data.foreignId}`;

      const request = await (await fetch(url, {
        method: 'get',
        headers: {
          Authorization: `bearer ${token}`,
        },
      })).json();

      setData((prev) => ({
        ...prev,
        foreignId: request.data.userId,
        profileName: request.data.profileName,
        username: request.data.username,
        avatar: request.data.photo.avatar,
      }));
    }
    catch (error0) {
      console.log(error0.message);
    }
  }

  useEffect(() => {
    handleGetForeignUser();
  }, [data]);

  return (
    <div className={`${style.header} ${darkmode ? style.dark : null}`}>
      <button
        type="button"
        className={`${style['close-btn']}`}
        onClick={() => dispatch(action.roomIsOpen({
          active: false,
          foreignId: room.data.foreignId,
        }))}
      >
        <box-icon name="arrow-back" color={darkmode ? '#ffffffdd' : '#000000dd'}></box-icon>
      </button>
      <div className={style.profile}>
        <img
          className={style.avatar}
          src={isDev ? `http://localhost:8000/api/images/${data.avatar}` : `/api/images/${data.avatar}`}
        />
        <div className={style.info}>
          <h3 className={style['profile-name']}>{data.profileName}</h3>
          <p className={style.online}>online</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
