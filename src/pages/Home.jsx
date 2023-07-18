import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import notification from '../assets/notification.svg';
import logo from '../assets/serviceLogo.svg';
import CheckBox from '../components/CheckBox';
import SeoulMap from '../components/SeoulMap';

import '../css/Home.css';

const Home = () => {
  const currentMember = useSelector((state) => state.member);

  const navigate = useNavigate();

  const onClickNotification = () => {
    if (currentMember.signed) {
      navigate('/notify');
    } else {
      alert('로그인 모달');
    }
  };

  return (
    <div>
      <div id="title-container">
        <img src={logo} id="logo" />
        <h4 id="service-title">
          실시간 재난/교통 정보 모아보기&nbsp;
          <span>삐용삐용</span>
        </h4>
      </div>

      <div id="notification-container" onClick={onClickNotification}>
        <img src={notification} width="30" />
        <p>알림 설정</p>
      </div>

      <SeoulMap />
      <CheckBox />
    </div>
  );
};

export default Home;
