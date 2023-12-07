import React from 'react'
import IPage from '../interfaces/page'
import LoginForm from '../components/auth/LoginForm'

const LoginPage: React.FunctionComponent<IPage> = props => {
  return (
    <div 
      className='flex items-center justify-center h-screen'       
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
      }}  
    >
      <LoginForm />
    </div>
  )
}

export default LoginPage