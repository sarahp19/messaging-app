import React, { useState } from 'react';
import style from '../../styles/components/main/contact.css';
import * as photo from '../../assets/images';

import * as comp from './add';

function Contact({ handleContactIsOpen, contactIsOpen }) {
  const [state, setState] = useState({
    groupTabIsOpen: false,
    contactTabIsOpen: false,
  });

  const handleContactTabIsOpen = () => {
    setState((prev) => ({
      ...prev,
      contactTabIsOpen: !prev.contactTabIsOpen,
    }));
  }

  return (
    <div
      className={`${style.contact} ${contactIsOpen ? style.active : null}`}
    >
      <div className={style['contact-wrap']}>
        <comp.newContact
          handleContactTabIsOpen={handleContactTabIsOpen}
          contactTabIsOpen={state.contactTabIsOpen}
        />
        <div className={style.navigation}>
          <button
            onClick={handleContactIsOpen}
            className={style.btn}
          >
            <box-icon name="arrow-back" color="#ffffffdd"></box-icon>
          </button>
        </div>
        <div className={style.new}>
          <div className={style.cards}>
            <span className={style.icon}>
              <box-icon name="group" color="#ffffffdd"></box-icon>
            </span>
            <p>Create a New Group</p>
          </div>
          <div
            className={style.cards}
            onClick={handleContactTabIsOpen}
            aria-hidden="true"
          >
            <span className={style.icon}>
              <box-icon name="user-plus" color="#ffffffdd"></box-icon>
            </span>
            <p>Add New Contact</p>
          </div>
        </div>
        <div className={style.list}>
          <div className={style.cards}>
            <span
              className={style.avatar}
              style={{
                background: `url(${photo.gates})`,
                backgroundSize: 'cover',
              }}
            >
            </span>
            <div
              className={style.text}
              aria-hidden="true"
            >
              <span className={style.info}>
                <h3 className={style['profile-name']}>Bill Gates</h3>
                <p className={style.username}>@billgates</p>
              </span>
            </div>
            <span>
              <box-icon name="dots-vertical-rounded" color="#ffffffdd"></box-icon>
            </span>
          </div>
          <div className={style.cards}>
            <span
              className={style.avatar}
              style={{
                background: `url(${photo.zuck})`,
                backgroundSize: 'cover',
              }}
            >
            </span>
            <div
              className={style.text}
              aria-hidden="true"
            >
              <span className={style.info}>
                <h3 className={style['profile-name']}>Mark Zuckerberg</h3>
                <p className={style.username}>@zuck</p>
              </span>
            </div>
            <span>
              <box-icon name="dots-vertical-rounded" color="#ffffffdd"></box-icon>
            </span>
          </div>
          <div className={style.cards}>
            <span
              className={style.avatar}
              style={{
                background: `url(${photo.linus})`,
                backgroundSize: 'cover',
              }}
            >
            </span>
            <div
              className={style.text}
              aria-hidden="true"
            >
              <span className={style.info}>
                <h3 className={style['profile-name']}>Linus Torvald</h3>
                <p className={style.username}>@torvald</p>
              </span>
            </div>
            <span>
              <box-icon name="dots-vertical-rounded" color="#ffffffdd"></box-icon>
            </span>
          </div>
          <div className={style.cards}>
            <span
              className={style.avatar}
              style={{
                background: `url(${photo.eich})`,
                backgroundSize: 'cover',
              }}
            >
            </span>
            <div
              className={style.text}
              aria-hidden="true"
            >
              <span className={style.info}>
                <h3 className={style['profile-name']}>Brendan Eich</h3>
                <p className={style.username}>@eich</p>
              </span>
            </div>
            <span>
              <box-icon name="dots-vertical-rounded" color="#ffffffdd"></box-icon>
            </span>
          </div>
          <div className={style.cards}>
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
                <h3 className={style['profile-name']}>Bill Gates</h3>
                <p className={style.username}>@billgates</p>
              </span>
            </div>
            <span>
              <box-icon name="dots-vertical-rounded" color="#ffffffdd"></box-icon>
            </span>
          </div>
          <div className={style.cards}>
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
                <h3 className={style['profile-name']}>Bill Gates</h3>
                <p className={style.username}>@billgates</p>
              </span>
            </div>
            <span>
              <box-icon name="dots-vertical-rounded" color="#ffffffdd"></box-icon>
            </span>
          </div>
          <div className={style.cards}>
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
                <h3 className={style['profile-name']}>Bill Gates</h3>
                <p className={style.username}>@billgates</p>
              </span>
            </div>
            <span>
              <box-icon name="dots-vertical-rounded" color="#ffffffdd"></box-icon>
            </span>
          </div>
          <div className={style.cards}>
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
                <h3 className={style['profile-name']}>Bill Gates</h3>
                <p className={style.username}>@billgates</p>
              </span>
            </div>
            <span>
              <box-icon name="dots-vertical-rounded" color="#ffffffdd"></box-icon>
            </span>
          </div>
          <div className={style.cards}>
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
                <h3 className={style['profile-name']}>Bill Gates</h3>
                <p className={style.username}>@billgates</p>
              </span>
            </div>
            <span>
              <box-icon name="dots-vertical-rounded" color="#ffffffdd"></box-icon>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
