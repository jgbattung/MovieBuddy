import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { RouteParams } from '../../interfaces/routes';
import { getOverviewDetails, getFullCredits } from '../../utils/movieApi';
import { IMovieOverviewDetails, IMovieFullCredits, IMovieCastCredits, IMovieCrewCredits } from '../../interfaces/movieData';
import { formatQid, imageNotFoundLink } from '../../utils/utils';
import { auth } from '../../firebase';
import { addToFavorites } from '../../utils/firebaseFunctions';

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<RouteParams>();
  const [overviewDetails, setOverviewDetails] = useState<IMovieOverviewDetails>();
  const [fullCredits, setFullCredits] = useState<IMovieFullCredits>();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieDetails = await getOverviewDetails(movieId)
        const movieCredits = await getFullCredits(movieId);
        setOverviewDetails(movieDetails);
        setFullCredits(movieCredits);
      } catch (error) {
        throw error;
      }
    };

    fetchData();

  }, [movieId])

  const handleAddToFavorites = () => {
    addToFavorites(movieId);
  }

  return (
    <div>
      <h1 className='text-white'>{overviewDetails?.title.title}</h1>
      <img src={overviewDetails?.title.image ? overviewDetails?.title.image.url : imageNotFoundLink} alt={overviewDetails?.title.title} className='w-40 rounded-lg object-cover' />
      {currentUser &&       
        <button onClick={handleAddToFavorites} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Add to Favorites
        </button>
      }
    <p className='text-white'>{overviewDetails?.title && formatQid(overviewDetails.title.titleType)}</p>
      <p className='text-white'>{overviewDetails?.title.year}</p>
      <p className='text-white'>{overviewDetails?.genres.join(' | ')}</p>
      <p className='text-white'>{overviewDetails?.title.seriesStartYear && `${overviewDetails?.title.seriesStartYear} to ${overviewDetails?.title.seriesEndYear}`}</p>
      <p className='text-white'>{overviewDetails?.title.numberOfEpisodes}</p>
      <p className='text-white'>{`${overviewDetails?.ratings.rating}/10`}</p>
      <p className='text-white'>{overviewDetails?.plotSummary ? overviewDetails.plotSummary.text : overviewDetails?.plotOutline.text}</p>

      <p className='text-white font-bold'>
        {fullCredits?.crew.director.map((director: IMovieCrewCredits) => (
          <div key={director.id}>
            <p className='text-white font-extrabold'>{`Director: ${director.name}`}</p>
            <img src={director?.image ? director.image.url : imageNotFoundLink} alt={director.name} className='w-40 rounded-lg object-cover' />
          </div>
        ))}
      </p>
      <p className='text-white font-bold'>CAST</p>
      {fullCredits?.cast.slice(0, 15).map((castMember: IMovieCastCredits) => (
        <div key={castMember.id}>
          <p className='text-white font-extrabold'>{castMember.name}</p>
          <p className='text-white'>{castMember.characters.join(' | ')}</p>
          <img src={castMember?.image ? castMember.image.url : imageNotFoundLink} alt={castMember.name} className='w-40 rounded-lg object-cover' />
        </div>
      ))};
    </div>
  )
}

export default MovieDetail