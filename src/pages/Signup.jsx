import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import logo from '../assets/serviceLogo.svg';
import '../css/Signup.css';
import TextInput from '../components/TextInput';

const Signup = () => {
  const currentMember = useSelector((state) => state.member);

  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState(null);

  const [isIdValid, setIsIdValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);

  const isSignupValid = isIdValid && isPwValid && isPasswordMatched;

  const navigate = useNavigate();

  const handleID = (e) => {
    setId(e.target.value);
    setIsIdValid(!e.target.validity.patternMismatch);
  };

  const handlePW = (e) => {
    setPassword(e.target.value);
    setIsPwValid(!e.target.validity.patternMismatch);
  };

  const handleConfirmPW = (e) => {
    setConfirmPassword(e.target.value);
    setIsPasswordMatched(e.target.value === password);
  };

  const signup = async () => {
    console.log(`${id} / ${password}로 회원가입 시도`);
    const signupData = {
      id,
      password,
    };
    try {
      await axios.post('api url', signupData);
      navigate('/');
    } catch (e) {
      if (e.response.status === 404) {
        setError('이미 사용 중인 아이디입니다');
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  useEffect(() => {
    if (currentMember.signed) {
      alert('이미 로그인 한 사용자입니다.');
      navigate(-1);
    }
  }, []);

  return (
    <div id="signup-container">
      <div id="signup-text">
        <h1> 회원가입</h1>
        <p> 회원가입 후 백그라운드 알림 기능을 설정하세요! </p>
      </div>

      <form id="signup-input-container" onSubmit={onSubmit}>
        <h5> 아이디 </h5>
        <TextInput
          label="ID"
          placeholder="6~12자리 영문, 숫자 사용"
          pattern="[a-z\d]{6,12}"
          onChange={handleID}
        />
        {id && !isIdValid && (
          <p className="signup-error-message">
            규칙에 맞는 아이디를 입력해주세요. (6~12자리 영문, 숫자 사용)
          </p>
        )}
        {error && <p className="signup-error-message"> {error} </p>}

        <h5> 비밀번호 </h5>
        <TextInput
          label="PW"
          placeholder="6~12자리 영문, 숫자 사용"
          type="password"
          pattern="[a-z\d]{6,12}"
          onChange={handlePW}
        />
        {password && !isPwValid && (
          <p className="signup-error-message">
            규칙에 맞는 비밀번호를 입력해주세요. (6~12자리 영문, 숫자 사용)
          </p>
        )}

        <h5> 비밀번호 확인 </h5>
        <TextInput
          label="PW"
          placeholder="6~12자리 영문, 숫자 사용"
          type="password"
          onChange={handleConfirmPW}
        />
        {confirmPassword && !isPasswordMatched && (
          <p className="signup-error-message"> 비밀번호가 일치하지 않습니다</p>
        )}

        <div id="submit-button-container">
          <button disabled={!isSignupValid}> 확인 </button>
        </div>
      </form>

      <div id="logo-container">
        <img src={logo} />
      </div>
    </div>
  );
};

export default Signup;
