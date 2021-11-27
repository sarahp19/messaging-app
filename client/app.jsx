import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './styles/utils/app.css';
import 'boxicons';

import * as action from './redux/actions';
import * as cont from './containers';

import socket from './helpers/socket';

function App() {
  const mounted = useRef(true);

  const props = useSelector((state) => state);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(document.title);

  const handleGetUser = async () => {
    const token = await localStorage.getItem('token');
    socket.emit('user/findOne', { token });

    socket.on('user/findOne/callback', (args) => {
      if (!args.success) {
        console.log(args.message);
      }

      dispatch(action.getUser({
        data: args.data,
      }));
    });
  }

  useEffect(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(action.loggedIn({
        active: true,
      }));
    }

    if (props.loggedIn) {
      await handleGetUser();
    }

    setTitle('Messaging - @febriadj');
    document.title = title;

    return () => {
      mounted.current = false;
    }
  }, [
    title, props.loggedIn,
  ]);

  return (
    <div
      className={`${style.app} ${props.darkmode ? style.dark : null} ${props.loggedIn && props.user ? null : style.active}`}
    >
      {
        props.loggedIn && props.user ? (
          < >
            <cont.main />
            <cont.room />
          </>
        ) : <cont.auth />
      }
    </div>
  )
}

export default App;
