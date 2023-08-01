import React from 'react'
import IPage from '../interfaces/page'
import Header from '../components/common/Header'
import User from '../components/features/User'

const UserProfile: React.FunctionComponent<IPage> = props => {
  return (
    <div>
      <Header />
      <User />
    </div>
  )
}

export default UserProfile