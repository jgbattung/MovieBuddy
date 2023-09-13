import React from 'react'
import MovieDetail from '../components/features/MovieDetail'
import IPage from '../interfaces/page'
import Header from '../components/common/Header'

const MovieDetailPage: React.FunctionComponent<IPage> = props => {
  return (
    <div>
      <Header />
      <MovieDetail />
    </div>
  )
}

export default MovieDetailPage