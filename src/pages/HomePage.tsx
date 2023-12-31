import React from 'react'
import IPage from '../interfaces/page'
import Home from '../components/features/Home'
import Header from '../components/common/Header'

const HomePage:React.FunctionComponent<IPage> = props => {
  return (
    <div>
      <Header />
      <Home />
    </div>
  )
}

export default HomePage