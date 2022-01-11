import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import style from '../../styles/components/auth/forgot.css';

function Forgot({
  forgotIsOpen,
  setForgotIsOpen,
}) {
  const { darkmode } = useSelector((state) => state);

  const [formbody, setFormbody] = useState({
    usernameOrEmail: '',
    token: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [control, setControl] = useState({
    usernameOrEmail: false,
    password: false,
  });

  const handleChange = (event) => {
    setFormbody((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      console.log('form is submited');
    }
    catch (error0) {
      console.error(error0.message);
    }
  };

  return (
    <div className={`${style.forgot} ${forgotIsOpen && style.active}`}>
      <div className={style['forgot-wrap']}>
        <div className={style.header}>
          <h2>Change Password</h2>
          <button
            type="submit"
            className={style.btn}
            onClick={() => {
              setForgotIsOpen(false);
            }}
          >
            <box-icon
              name="x"
              color={darkmode ? '#ffffffdd' : '#000000dd'}
            >
            </box-icon>
          </button>
        </div>
        <form method="post" className={style.form} onSubmit={handleSubmit}>
          <label htmlFor="usernameOrEmail" className={style.cards}>
            <box-icon
              name="user"
              color={darkmode ? '#ffffffdd' : '#000000dd'}
            >
            </box-icon>
            <span className={style['input-field']}>
              <p className={style.label}>Username or Email Address</p>
              <input
                type="text"
                name="usernameOrEmail"
                id="usernameOrEmail"
                value={formbody.usernameOrEmail}
                onChange={handleChange}
                required
              />
            </span>
            <box-icon
              name={control.usernameOrEmail ? 'check-circle' : 'x-circle'}
              color={`${control.usernameOrEmail ? '#00A19D' : '#B91646'}`}
            >
            </box-icon>
          </label>
          <label htmlFor="token" className={style.cards}>
            <box-icon
              name="user"
              color={darkmode ? '#ffffffdd' : '#000000dd'}
            >
            </box-icon>
            <span className={style['input-field']}>
              <p className={style.label}>Token</p>
              <input
                type="text"
                name="token"
                id="token"
                placeholder="6 digit code from email"
                value={formbody.token}
                onChange={handleChange}
                required
              />
            </span>
            <box-icon
              name={control.token ? 'check-circle' : 'x-circle'}
              color={`${control.token ? '#00A19D' : '#B91646'}`}
            >
            </box-icon>
          </label>
          <span className={style.submit}>
            <button type="submit" className={style.btn}>
              <p>Login</p>
              <box-icon
                type="solid"
                name="right-top-arrow-circle"
                color={darkmode ? '#ffffffdd' : '#000000dd'}
              >
              </box-icon>
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
