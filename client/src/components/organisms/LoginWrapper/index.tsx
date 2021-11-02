import React, { ChangeEvent, useRef } from 'react'
import { common } from 'styles'
import { Wrapper } from './style'
import { BoxButton } from 'components/atoms'
import { Input } from 'components/atoms'

const LoginBox = () => {
  const id = useRef<string>("")

  const getId = (e: ChangeEvent<HTMLInputElement>) => {
    id.current = e.target.value
  }

  const login = (e: React.MouseEvent) => { }

  const openRegisterModal = (e: React.MouseEvent) => { }

  return (
    <Wrapper>
      <Input placeholder="아이디를 입력해주세요" onChange={getId} spellCheck={false} />
      <BoxButton onClick={login} color={common.color.white} bgColor={common.color.primary2}>로그인</BoxButton>
      <BoxButton onClick={openRegisterModal} bgColor={common.color.primary3}>회원가입</BoxButton>
    </Wrapper >
  )
}

export default LoginBox