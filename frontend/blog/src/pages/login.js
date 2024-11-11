import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/worker/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate(data.redirectUrl);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('서버 오류가 발생했습니다.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="logo">SHIFTMATE</h1>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="아이디"
          className="input-field"
          value={id}
          onChange={handleIdChange}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="input-field"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit" className="login-button">로그인</button>
      </form>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Login;