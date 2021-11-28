import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './styles/utils/app.css';
import 'boxicons';

import * as action from './redux/actions';
import * as cont from './containers';

function App() {
  const isDev = process.env.NODE_ENV === 'development';

  const props = useSelector((state) => state);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(document.title);

  const handleGetUser = async () => {
    const token = localStorage.getItem('token');
    const url = isDev ? 'http://localhost:8000/api/users?init=true' : '/api/users?init=true';

    const request = await (await fetch(url, {
      method: 'get',
      headers: {
        Authorization: `bearer ${token}`,
      },
    })).json();

    dispatch(action.getUser({
      data: request.data,
    }));
  }

  useEffect(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(action.loggedIn({
        active: true,
      }));
    }

    if (props.loggedIn) {
      handleGetUser();
    }

    setTitle('Messaging - @febriadj');
    document.title = title;
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
