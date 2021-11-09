import React from 'react';
import { Template } from './style';
import { Title } from 'components/atoms';
import { LoginWrapper } from 'components/organisms';

const Login = () => {
  return (
    <Template>
      <Title titleStyle={'title'} color={'white'} margin={'0 0 0 auto'}>
        쉽게 쓰는 실시간 애자일 협업툴
      </Title>
      <Title titleStyle={'xxxlarge'} color={'white'} margin={'0 0 0 auto'}>
        마인드맵으로 동료들과 작업을 간편하게 관리할 수 있습니다.
      </Title>
      <LoginWrapper />
    </Template>
  );
};

export default Login;
