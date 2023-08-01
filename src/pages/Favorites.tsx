import React from 'react'
import IPage from '../interfaces/page'
import Header from '../components/common/Header'

const Favorites:React.FunctionComponent<IPage> = props => {
  return (
    <div>
      <Header />
      Favorites
    </div>
  )
}

export default Favorites