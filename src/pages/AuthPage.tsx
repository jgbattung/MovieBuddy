import React from 'react'
import RegisterForm from '../components/auth/RegisterForm'
import IPage from '../interfaces/page'
import LoginForm from '../components/auth/LoginForm'

const AuthPage: React.FunctionComponent<IPage> = props => {
  console.log('auth page')
  return (
    <div className='grid h-screen place-items-center'>
      <div className='flex space-x-6'>
        <RegisterForm />
        <LoginForm />
      </div>
    </div>
  )
}

export default AuthPage