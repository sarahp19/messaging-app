import React, { useState, useEffect } from 'react';
import style from '../../styles/components/auth/register.css';

function Register({
  registerPage,
  setRegisterPage,
  setResponse,
}) {
  const isDev = process.env.NODE_ENV === 'development';

  const [formbody, setFormbody] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [control, setControl] = useState({
    username: false,
    email: false,
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

      const url = isDev ? 'http://localhost:8080/api/users/register' : '/api/users/register';
      const request = await (await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formbody.username,
          email: formbody.email,
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
        message: 'Account created successfully',
        active: true,
      }));

      setTimeout(() => {
        setRegisterPage(false);
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
    if (formbody.username.length >= 3) {
      setControl((prev) => ({
        ...prev,
        username: true,
      }));
    } else {
      setControl((prev) => ({
        ...prev,
        username: false,
      }));
    }

    const emailValid = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (emailValid.test(formbody.email)) {
      setControl((prev) => ({
        ...prev,
        email: true,
      }));
    } else {
      setControl((prev) => ({
        ...prev,
        email: false,
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
      className={`${style.register} ${registerPage ? style.active : null}`}
    >
      <div className={style['register-wrap']}>
        <div className={style.header}>
          <h2>Register.</h2>
          <p>
            Register your account & start a conversation with your friends any + where/time.
          </p>
        </div>
        <form
          method="post"
          className={style.control}
          onSubmit={handleSubmit}
        >
          <label htmlFor="username" className={style.cards}>
            <box-icon name="user" color="#ffffffdd"></box-icon>
            <span className={style['input-field']}>
              <p className={style.label}>Username</p>
              <input
                type="text"
                name="username"
                id="username"
                value={formbody.username}
                onChange={handleChange}
                required
              />
            </span>
            <box-icon
              name={control.username ? 'check' : 'x'}
              color={`${control.username ? '#73ba9b' : '#c1121f'}`}
            >
            </box-icon>
          </label>
          <label htmlFor="email" className={style.cards}>
            <box-icon name="envelope" color="#ffffffdd"></box-icon>
            <span className={style['input-field']}>
              <p className={style.label}>Email Address</p>
              <input
                type="email"
                name="email"
                id="email"
                value={formbody.email}
                onChange={handleChange}
                required
              />
            </span>
            <box-icon
              name={control.email ? 'check' : 'x'}
              color={`${control.email ? '#73ba9b' : '#c1121f'}`}
            >
            </box-icon>
          </label>
          <label htmlFor="password-regis" className={style.cards}>
            <box-icon name="lock-open" color="#ffffffdd"></box-icon>
            <span className={style['input-field']}>
              <p className={style.label}>Password</p>
              <input
                type="password"
                name="password"
                id="password-regis"
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
          <span className={style.submit}>
            <button type="submit" className={style.btn}>Create Account</button>
          </span>
        </form>
        <div className={style.footer}>
          <p>Already have an account?</p>
          <button
            className={style.btn}
            onClick={() => setRegisterPage(false)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
