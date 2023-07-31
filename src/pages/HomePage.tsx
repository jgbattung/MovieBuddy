import React from 'react'
import IPage from '../interfaces/page'
import Header from '../components/common/Header'
import Home from '../components/auth/Home'

const HomePage:React.FunctionComponent<IPage> = props => {
  return (
    <div>
      <Header />
      <Home />
    </div>
  )
}

export default HomePage