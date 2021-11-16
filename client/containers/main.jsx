import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import style from '../styles/containers/main.css';

import * as comp from '../components/main';

function Main() {
  const props = useSelector((state) => state);

  const [state, setState] = useState({
    miniTabIsOpen: false,
    profileIsOpen: false,
  });

  const handleMiniTabIsOpen = () => {
    if (!state.miniTabIsOpen) {
      return setState((prev) => ({
        ...prev,
        miniTabIsOpen: true,
      }));
    }

    return setState((prev) => ({
      ...prev,
      miniTabIsOpen: false,
    }));
  }

  const handleProfileIsOpen = () => {
    if (!state.profileIsOpen) {
      return setState((prev) => ({
        ...prev,
        miniTabIsOpen: false,
        profileIsOpen: true,
      }));
    }

    return setState((prev) => ({
      ...prev,
      profileIsOpen: false,
    }));
  }

  return (
    <div className={`${style.main} ${props.room ? style.active : null}`}>
      <div className={style['main-wrap']}>
        <comp.header
          handleMiniTabIsOpen={handleMiniTabIsOpen}
          miniTabIsOpen={state.miniTabIsOpen}
        />
        <comp.minitab
          miniTabIsOpen={state.miniTabIsOpen}
          handleProfileIsOpen={handleProfileIsOpen}
        />
        <comp.profile
          handleProfileIsOpen={handleProfileIsOpen}
          profileIsOpen={state.profileIsOpen}
        />
        <comp.inbox />
      </div>
    </div>
  );
}

export default Main;
