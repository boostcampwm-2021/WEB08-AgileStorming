import React from 'react';
import Button from 'components/atoms/Button';

const clickHandle = () => {
  console.log(123);
};

const Login = () => {
  return (
    <div>
      로그인페이지
      <Button onClick={clickHandle}></Button>
    </div>
  );
};

export default Login;
