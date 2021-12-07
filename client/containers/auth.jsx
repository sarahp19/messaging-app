import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import style from '../styles/containers/auth.css';

import * as comp from '../components/auth';

function Auth() {
  const { darkmode } = useSelector((state) => state);
  const [registerPage, setRegisterPage] = useState(false);

  const handleRegisterPage = () => {
    setRegisterPage(!registerPage);
  }

  return (
    <div className={`${style.auth} ${darkmode ? style.dark : null}`}>
      <div className={style['auth-main']}>
        <comp.login
          registerPage={registerPage}
          setRegisterPage={setRegisterPage}
        />
        <comp.register
          registerPage={registerPage}
          setRegisterPage={handleRegisterPage}
        />
      </div>
      <div className={style.banner}></div>
    </div>
  );
}

export default Auth;
