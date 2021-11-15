import React from 'react';
import style from '../styles/containers/main.css';

import * as comp from '../components/main';

function Main() {
  return (
    <div className={style.main}>
      <div className={style['main-wrap']}>
        <comp.header />
        <comp.inbox />
      </div>
    </div>
  );
}

export default Main;
