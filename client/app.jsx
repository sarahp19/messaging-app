import React, { useEffect, useState } from 'react';
import style from './styles/utils/app.css';
import 'boxicons';

import * as cont from './containers';

function App() {
  const [title, setTitle] = useState(document.title);

  useEffect(() => {
    setTitle('Messaging - @febriadj');
    document.title = title;
  }, [title]);

  return (
    <div className={style.app}>
      <cont.main />
      <cont.room />
    </div>
  );
}

export default App;
