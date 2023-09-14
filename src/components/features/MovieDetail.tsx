import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { RouteParams } from '../../interfaces/routes';
import { getOverviewDetails, getFullCredits } from '../../utils/movieApi';
import { IMovieOverviewDetails, IMovieFullCredits, IMovieCastCredits, IMovieCrewCredits } from '../../interfaces/movieData';
import { formatQid, imageNotFoundLink } from '../../utils/utils';
import { auth, db } from '../../firebase';
import { addToFavorites } from '../../utils/firebaseFunctions';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../../store/actions/loadingActions';
import { RootState } from '../../store';

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<RouteParams>();
  const [overviewDetails, setOverviewDetails] = useState<IMovieOverviewDetails>();
  const [fullCredits, setFullCredits] = useState<IMovieFullCredits>();
  const [isInFavorites, setIsInFavorites] = useState(false);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const movieDetails = await getOverviewDetails(movieId)
        const movieCredits = await getFullCredits(movieId);
        setOverviewDetails(movieDetails);
        setFullCredits(movieCredits);
        dispatch(setLoading(false));
      } catch (error) {
        throw error;
      }
    };

    fetchData();

  }, [movieId, dispatch])

  const handleAddToFavorites = () => {
    addToFavorites(movieId);
  }

  useEffect(() => {
    const checkIfInFavorites = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userCollectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(query(userCollectionRef, where('uid', '==', currentUser.uid)));
    
        const userData = querySnapshot.docs[0].data();
        if (userData?.favorites.includes(movieId)) {
          setIsInFavorites(true);
        } else {
          setIsInFavorites(false);
        }
      }
    }

    checkIfInFavorites();

  }, [movieId]);

  return (
    <div>
      {!isLoading ? 
      <>
        <h1 className='text-white'>{overviewDetails?.title.title}</h1>
        <img src={overviewDetails?.title.image ? overviewDetails?.title.image.url : imageNotFoundLink} alt={overviewDetails?.title.title} className='w-40 rounded-lg object-cover' />
        {currentUser &&       
          !isInFavorites ?
            <button onClick={handleAddToFavorites} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Add to Favorites
            </button>
            :
            <p className='text-gray-400'>In Favorites</p>
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
      </> 
      : 
      <div className="flex justify-center items-center h-screen">
        <div role="status">
          <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      }

    </div>
  )
}

export default MovieDetail