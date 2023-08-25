import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { RouteParams } from '../../interfaces/routes';
import { getOverviewDetails } from '../../utils/movieApi';
import { IMovieOverviewDetails } from '../../interfaces/movieData';

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<RouteParams>();
  const [overviewDetails, setOverviewDetails] = useState<IMovieOverviewDetails>();

  useEffect(() => {
    console.log(movieId)

    const fetchData = async () => {
      try {
        const movieDetails = await getOverviewDetails(movieId)
        setOverviewDetails(movieDetails);
      } catch (error) {
        throw error;
      }
    };

    fetchData();

  }, [movieId])



  return (
    <div>
      <h1 className='text-white'>{overviewDetails?.title.title}</h1>
      <p className='text-white'>{overviewDetails?.title.title}</p>
    </div>
  )
}

export default MovieDetail