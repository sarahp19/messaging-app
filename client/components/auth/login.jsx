import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import style from '../../styles/components/auth/login.css';
import * as action from '../../redux/actions';

function Login({
  registerPage,
  setRegisterPage,
  setResponse,
}) {
  const isDev = process.env.NODE_ENV === 'development';
  const dispatch = useDispatch();

  const [formbody, setFormbody] = useState({
    usernameOrEmail: '',
    password: '',
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
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const url = isDev ? 'http://localhost:8080/api/users/login' : '/api/users/login';
      const request = await (await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usernameOrEmail: formbody.usernameOrEmail,
          password: formbody.password,
        }),
      })).json();

      if (!request.success) {
        const newError = {
          message: request.message,
        }
        throw newError;
      }

      setResponse((prev) => ({
        ...prev,
        success: true,
        message: 'Authenticate',
        active: true,
      }));

      localStorage.setItem('token', request.data);

      setTimeout(() => {
        dispatch(action.loggedIn());
      }, 2000);
    }
    catch (error0) {
      setResponse((prev) => ({
        ...prev,
        success: false,
        message: error0.message,
        active: true,
      }));

      setTimeout(() => {
        setResponse((prev) => ({
          ...prev,
          active: false,
        }));
      }, 10000);
    }
  }

  useEffect(() => {
    if (formbody.usernameOrEmail.length >= 3) {
      setControl((prev) => ({
        ...prev,
        usernameOrEmail: true,
      }));
    } else {
      setControl((prev) => ({
        ...prev,
        usernameOrEmail: false,
      }));
    }

    const passValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\W).{8,16}$/g;

    if (passValid.test(formbody.password)) {
      setControl((prev) => ({
        ...prev,
        password: true,
      }));
    } else {
      setControl((prev) => ({
        ...prev,
        password: false,
      }));
    }
  }, [
    formbody,
  ]);

  return (
    <div
      className={`${style.login} ${registerPage ? null : style.active}`}
    >
      <div className={style['login-wrap']}>
        <div className={style.header}>
          <h2>Messaging.</h2>
          <p>Welcome to the messaging app, please login to your account to start a conversation.</p>
        </div>
        <form
          method="post"
          className={style.control}
          onSubmit={handleSubmit}
        >
          <label htmlFor="usernameOrEmail" className={style.cards}>
            <box-icon name="user" color="#ffffffdd"></box-icon>
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
              name={control.usernameOrEmail ? 'check' : 'x'}
              color={`${control.usernameOrEmail ? '#73ba9b' : '#c1121f'}`}
            >
            </box-icon>
          </label>
          <label htmlFor="password" className={style.cards}>
            <box-icon name="lock-open" color="#ffffffdd"></box-icon>
            <span className={style['input-field']}>
              <p className={style.label}>Password</p>
              <input
                type="password"
                name="password"
                id="password"
                value={formbody.password}
                onChange={handleChange}
                required
              />
            </span>
            <box-icon
              name={control.password ? 'check' : 'x'}
              color={`${control.password ? '#73ba9b' : '#c1121f'}`}
            >
            </box-icon>
          </label>
          <div className={style.action}>
            <span className={style.remember}>
              <input type="checkbox" name="" id="" />
              <p>Remember Me</p>
            </span>
            <button className={style.forgot}>Forgot Password</button>
          </div>
          <span className={style.submit}>
            <button type="submit" className={style.btn}>Get Started</button>
          </span>
        </form>
        <div className={style.footer}>
          <p>Don't have an account yet?</p>
          <button
            className={style.btn}
            onClick={setRegisterPage}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
