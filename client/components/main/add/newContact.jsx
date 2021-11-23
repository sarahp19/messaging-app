import React, { useState, useEffect } from 'react';
import style from '../../../styles/components/main/add/newContact.css';
import photo from '../../../assets/images/avatar.png';

function NewContact({
  handleContactTabIsOpen,
  contactTabIsOpen,
}) {
  const isDev = process.env.NODE_ENV === 'development';

  const [data, setData] = useState([]);
  const [blank, setBlank] = useState(false);

  function Blank() {
    return (
      <div className={style.blank}>
        <h3 className={style.title}>Users Not Found.</h3>
      </div>
    );
  }

  const handleChange = async (event) => {
    const token = localStorage.getItem('token');
    const { value } = event.target;

    const url = isDev ? `http://localhost:8000/api/users?profile=${value}` : `/api/users?profile=${value}`;

    if (value.length === 0) {
      return setBlank(true);
    }

    const request = await (await fetch(url, {
      method: 'get',
      headers: {
        Authorization: `bearer ${token}`,
      },
    })).json();

    if (request.data.length === 0) {
      return setBlank(true);
    }

    setBlank(false);

    return setData(request.data);
  }

  useEffect(() => {
  }, [blank]);

  return (
    <div
      className={`${style['contact-tab']} ${contactTabIsOpen ? style.active : null}`}
    >
      <div className={style['contact-tab-main']}>
        <div className={style.navigation}>
          <button
            onClick={handleContactTabIsOpen}
            className={style.btn}
          >
            <box-icon name="arrow-back" color="#000000dd"></box-icon>
          </button>
          <h2 className="title">Search.</h2>
        </div>
        <div className={style.form}>
          <box-icon name="search-alt" color="#000000dd"></box-icon>
          <input
            type="text"
            name="usernameOrEmail"
            placeholder="Enter Username or Email user"
            className={style['form-control']}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className={style.list}>
          {
            !blank
              ? data.map((item) => (
                <div className={style.cards} key={item._id}>
                  <span
                    className={style.avatar}
                    style={{
                      background: `url(${photo})`,
                      backgroundSize: 'cover',
                    }}
                  >
                  </span>
                  <div
                    className={style.text}
                    aria-hidden="true"
                  >
                    <span className={style.info}>
                      <h3 className={style['profile-name']}>{item.profileName}</h3>
                      <p className={style.username}>{item.username}</p>
                    </span>
                  </div>
                  <span>
                    <box-icon name="dots-vertical-rounded" color="#000000dd"></box-icon>
                  </span>
                </div>
              ))
              : <Blank />
          }
        </div>
      </div>
    </div>
  );
}

export default NewContact;
