import React from 'react'
import IPage from '../interfaces/page'
import Header from '../components/common/Header'
import Favorites from '../components/features/Favorites'

const FavoritesPage:React.FunctionComponent<IPage> = props => {
  
  return (
    <div>
      <Header />
      <Favorites />
    </div>
  )
}

export default FavoritesPage