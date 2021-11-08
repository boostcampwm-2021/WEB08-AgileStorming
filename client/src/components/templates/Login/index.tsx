import React from 'react';
import { common } from 'styles';
import { Template } from './style';
import Title from 'components/atoms/Title';
import { LoginWrapper } from 'components/organisms';

const Login = () => {
  return (
    <Template>
      <Title size={common.fontSize.title} toLeft={true}>
        쉽게 쓰는 실시간 애자일 협업툴
      </Title>
      <Title size={common.fontSize.xxxlarge} toLeft={true}>
        마인드맵으로 동료들과 작업을 간편하게 관리할 수 있습니다.
      </Title>
      <LoginWrapper />
    </Template>
  );
};

export default Login;
