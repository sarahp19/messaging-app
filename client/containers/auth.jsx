import React, { useState } from 'react';
import style from '../styles/containers/auth.css';

import * as comp from '../components/auth';

function Auth() {
  const [registerPage, setRegisterPage] = useState(false);
  const strip = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const [response, setResponse] = useState({
    success: true,
    message: '',
    active: false,
  });

  return (
    < >
      <div className={`${style.response} ${response.active ? style.active : null}`}>
        <div
          className={style['response-wrap']}
        >
          <box-icon
            name={`${response.success ? 'check' : 'x'}`}
            color={`${response.success ? '#73ba9b' : '#c1121f'}`}
          >
          </box-icon>
          <p>{response.message}</p>
        </div>
      </div>
      <comp.login
        registerPage={registerPage}
        setRegisterPage={() => setRegisterPage(true)}
        setResponse={setResponse}
      />
      <comp.register
        registerPage={registerPage}
        setRegisterPage={setRegisterPage}
      />
      <div className={style.banner}>
        { strip.map((item) => <span key={item} className={style.strip}></span>) }
      </div>
    </>
  );
}

export default Auth;
