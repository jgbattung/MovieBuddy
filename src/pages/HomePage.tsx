import React from 'react'
import IPage from '../interfaces/page'
import Header from '../components/auth/Header'

const HomePage:React.FunctionComponent<IPage> = props => {
  return (
    <div>
      <Header />
      <h1>MOVIEBUDDY</h1>
    </div>
  )
}

export default HomePage