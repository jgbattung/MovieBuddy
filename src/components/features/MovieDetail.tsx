import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { RouteParams } from '../../interfaces/routes';
import { getOverviewDetails, getFullCredits, getTrivia } from '../../utils/movieApi';
import { IMovieOverviewDetails, IMovieFullCredits, IMovieCastCredits, IMovieCrewCredits, ITrivia, ITriviaSpoilt, ITriviaUnspoilt } from '../../interfaces/movieData';
import { formatQid, imageNotFoundLink } from '../../utils/utils';
import { auth, db } from '../../firebase';
import { addToFavorites } from '../../utils/firebaseFunctions';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../../store/actions/loadingActions';
import { RootState } from '../../store';
import { addFavoriteMovie } from '../../store/actions/userActions';

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<RouteParams>();
  const [overviewDetails, setOverviewDetails] = useState<IMovieOverviewDetails>();
  const [fullCredits, setFullCredits] = useState<IMovieFullCredits>();
  const [movieTrivia, setMovieTrivia] = useState<ITrivia>();
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
        const movieTrivia = await getTrivia(movieId)
        setOverviewDetails(movieDetails);
        setFullCredits(movieCredits);
        setMovieTrivia(movieTrivia);
        dispatch(setLoading(false));
      } catch (error) {
        throw error;
      }
    };

    fetchData();

  }, [movieId, dispatch])

  const handleAddToFavorites = () => {
    addToFavorites(movieId);
    dispatch(addFavoriteMovie(movieId));
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

  const convertMinutesToHours = (mins: number | undefined) => {
    if (!mins) {
      return "";
    }

    if (mins < 60) {
      return `${mins}m`
    }

    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;

    if (minutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${minutes}m`;
  }

  console.log(movieTrivia?.spoilt);

  return (
    <div>
      {!isLoading ? 
      <div className="flex flex-col items-center justify-center overflow-y-auto">
        <div className="w-full bg-gradient-to-r from-indigo-950 via-indigo-800 to-indigo-950 pt-4 px-60">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold text-white">{overviewDetails?.title.title}</h1>
              <div className="text-sm font-medium text-gray-400">{overviewDetails?.title.year} | {convertMinutesToHours(overviewDetails?.title.runningTimeInMinutes)}</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-sm font-bold text-gray-400 tracking-widest">IMDb Rating</div>
              <div className="flex">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="h-12 w-12">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  <div className="flex flex-col pl-2">
                    <p className="text-white text-lg font-bold">{overviewDetails?.ratings.rating}<span className="text-base text-gray-400 font-normal">/10</span></p>
                    <p className="text-gray-400 text-sm">2.8M</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 mb-4">
            <div className="w-1/3">
              <img className="w-full" src="https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg" />
            </div>
            <div className="w-2/3 object">
              <img className="w-full" src="https://m.media-amazon.com/images/M/MV5BZGVmZjg5NTEtMjJhNS00OWJjLThjOTYtZTk0NjUwMjA3MjkyXkEyXkFqcGdeQXVyMzQ3Nzk5MTU@._V1_.jpg" />
            </div>
          </div>
          <div className="mb-8">
            <div className="mb-2">
              {overviewDetails?.genres.map((genre, index) => (
                <button 
                  key={index}
                  className="rounded-full border-2 border-gray-400 px-3 mr-2 py-1.5 text text-white font-semibold"
                >
                  {genre}
                </button>
              ))}
            </div>
            <div>
              <p className="text-base text-white">{overviewDetails?.plotSummary ? overviewDetails.plotSummary.text : overviewDetails?.plotOutline.text}</p>
            </div>
            <hr className="h-px bg-gray-400 mt-2 mb-2" />
            <div className="flex">
                <p className="font-bold text-white pr-3">Director</p>
                {fullCredits?.crew.director?.map((director: IMovieCrewCredits, index: number) => (
                  <div key={index} className='flex'>
                    <p className="text-gray-400">{director.name}</p>
                    {index < fullCredits.crew.director.length - 1 && <span className='text-gray-500 px-2'>|</span>}
                  </div>
                ))}
            </div>
            <hr className="h-px bg-gray-400 mt-2 mb-2" />
            <div className="flex">
              <p className="font-bold text-white pr-3">Writers</p>
              {fullCredits?.crew.writer?.map((writer: IMovieCrewCredits, index: number) => (
                <div key={index} className='flex'>
                  <p className="text-gray-400">{writer.name}</p>
                  {index < fullCredits.crew.writer?.length - 1 && <span className='text-gray-500 px-2'>|</span>}
                </div>
              ))}
            </div>
            <hr className="h-px bg-gray-400 mt-2 mb-2" />
            <div className="flex">
              <p className="font-bold text-white pr-3">Stars</p>
              {fullCredits?.cast.slice(0, 3).map((castMember: IMovieCastCredits, index: number) => (
                <div key={index} className='flex'>
                  <p className="text-gray-400">{castMember.name}</p>
                  {index < 2 && <span className='text-gray-500 px-2'>|</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex-grow text-black px-52 bg-slate-100">
          <div className="py-5">
            <div className="flex items-center just">
              <p className="font-extrabold text-3xl text-indigo-800">|</p>
              <p className="font-bold text-2xl">&nbsp;Photos</p>
            </div>
            {/* <!-- CAROUSEL HERE --> */}
          </div>
          <div className="py-5">
            <div className="flex items-center">
              <p className="font-extrabold text-3xl text-indigo-800">|</p>
              <p className="font-bold text-2xl pl-3">Top Cast</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {fullCredits?.cast.slice(0, 16).map((castMember: IMovieCastCredits) => (
                <div className="flex items-center p-3" key={castMember.id}>
                  <div>
                    <img
                      className="rounded-full h-32 w-32 object-cover"
                      src={castMember?.image ? castMember.image.url : imageNotFoundLink }
                      alt={castMember.name} />
                  </div>
                  <div className="flex flex-col pl-4">
                    <p className="font-bold text-base">{castMember.name}</p>
                    <p className="font-light text-gray-500">{castMember.characters[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="py-5">
            <div className="flex items-center">
              <p className="font-extrabold text-3xl text-indigo-800">|</p>
              <p className="font-bold text-2xl pl-3">Did you know?</p>
            </div>
            {movieTrivia?.unspoilt.slice(0,5).map((trivia: ITriviaUnspoilt) => (
                <div className="bg-slate-200 max-w-2xl overflow-hidden shadow-lg rounded-md mx-5 my-4 px-8 py-5">
                <p className='text-gray-700'>{trivia.text}</p>
              </div>
            ))}
            {movieTrivia?.spoilt.slice(0, 5).map((trivia: ITriviaSpoilt, index) => (
              <div
                className="mx-5 my-4 max-w-2xl overflow-hidden rounded-md bg-slate-200 px-8 py-5 shadow-lg relative group"
                key={index}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-indigo-700 bg-opacity-60 transition-opacity opacity-100 group-hover:opacity-0">
                  <p className="text-base text-white font-light">Spoiler Trivia! Hover to reveal.</p>
                </div>
                <p className="text-gray-700 opacity-0 group-hover:opacity-100">
                  {trivia.text}
                </p>
              </div>
            ))}

          </div>
          <div className="py-5">
            <div className="flex items-center">
              <p className="font-extrabold text-3xl text-indigo-800">|</p>
              <p className="font-bold text-2xl">&nbsp;More like this</p>
            </div>
          </div>
        </div>
      </div>
      : (
          <div className="flex justify-center items-center h-screen">
            <div role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )
      }

    </div>
  )
}

export default MovieDetail