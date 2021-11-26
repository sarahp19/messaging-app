import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import style from '../styles/containers/main.css';

import * as comp from '../components/main';

function Main() {
  const props = useSelector((state) => state);

  const [state, setState] = useState({
    miniTabIsOpen: false,
    profileIsOpen: false,
    contactIsOpen: false,
  });

  const handleMiniTabIsOpen = () => {
    setState((prev) => ({
      ...prev,
      miniTabIsOpen: !prev.miniTabIsOpen,
    }));
  }

  const handleProfileIsOpen = () => {
    if (!state.profileIsOpen) {
      return setState((prev) => ({
        ...prev,
        miniTabIsOpen: false,
        profileIsOpen: true,
        contactIsOpen: false,
      }));
    }

    return setState((prev) => ({
      ...prev,
      profileIsOpen: false,
    }));
  }

  const handleContactIsOpen = () => {
    if (!state.contactIsOpen) {
      return setState((prev) => ({
        ...prev,
        miniTabIsOpen: false,
        profileIsOpen: false,
        contactIsOpen: true,
      }));
    }

    return setState((prev) => ({
      ...prev,
      contactIsOpen: false,
    }));
  }

  return (
    <div className={`${style.main} ${props.room.active ? style.active : null}`}>
      <div className={style['main-wrap']}>
        <comp.header
          handleMiniTabIsOpen={handleMiniTabIsOpen}
          miniTabIsOpen={state.miniTabIsOpen}
          handleContactIsOpen={handleContactIsOpen}
        />
        <comp.minitab
          miniTabIsOpen={state.miniTabIsOpen}
          handleProfileIsOpen={handleProfileIsOpen}
        />
        <comp.profile
          handleProfileIsOpen={handleProfileIsOpen}
          profileIsOpen={state.profileIsOpen}
        />
        <comp.contact
          handleContactIsOpen={handleContactIsOpen}
          contactIsOpen={state.contactIsOpen}
        />
        <comp.foreignProfile />
        <comp.inbox />
      </div>
    </div>
  );
}

export default Main;
