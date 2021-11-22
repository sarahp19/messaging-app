import React from 'react';
import style from '../../styles/components/room/chat.css';

function Chat() {
  return (
    <div className={style.chat}>
      <div className={`${style.cards} ${style['is-not-user']}`}>
        <p className={style.message}>
          <span className={style.tip}></span>
          Lorem ipsum dolor sit amet consectetur
        </p>
      </div>
      <div className={`${style.cards} ${style['is-user']}`}>
        <p className={style.message}>
          <span className={style.tip}></span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className={`${style.cards} ${style['is-not-user']}`}>
        <p className={style.message}>
          <span className={style.tip}></span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nulla nihil
        </p>
      </div>
      <div className={`${style.cards} ${style['is-not-user']}`}>
        <p className={style.message}>
          <span className={style.tip}></span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nulla nihil iusto omnis architecto perspiciatis
        </p>
      </div>
      <div className={`${style.cards} ${style['is-not-user']}`}>
        <p className={style.message}>
          <span className={style.tip}></span>
          Lorem ipsum dolor sit amet
        </p>
      </div>
      <div className={`${style.cards} ${style['is-not-user']}`}>
        <p className={style.message}>
          <span className={style.tip}></span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className={`${style.cards} ${style['is-user']}`}>
        <p className={style.message}>
          <span className={style.tip}></span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className={`${style.cards} ${style['is-not-user']}`}>
        <p className={style.message}>
          <span className={style.tip}></span>
          Lorem ipsum dolor sit amet consectetur adipisicing
        </p>
      </div>
      <div className={`${style.cards} ${style['is-not-user']}`}>
        <p className={style.message}>
          <span className={style.tip}></span>
          Lorem ipsum dolor sit
        </p>
      </div>
      <div className={`${style.cards} ${style['is-user']}`}>
        <p className={style.message}>
          <span className={style.tip}></span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Natus quos ipsa qui dolor culpa mollitia veritatis
        </p>
      </div>
    </div>
  );
}

export default Chat;
