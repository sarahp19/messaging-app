import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './styles/utils/app.css';
import 'boxicons';

import * as action from './redux/actions';
import * as cont from './containers';

function App() {
  const props = useSelector((state) => state);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(document.title);

  const loggedIn = () => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(action.loggedIn());
    }
  }

  useEffect(() => {
    loggedIn();

    setTitle('Messaging - @febriadj');
    document.title = title;
  }, [
    title,
  ]);

  return (
    <div
      className={`${style.app} ${props.loggedIn ? null : style.active}`}
    >
      {
        props.loggedIn ? (
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
