import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { RouteParams } from '../../interfaces/routes';
import { getOverviewDetails, getFullCredits, getTrivia, getImages, getSimilarFilms } from '../../utils/movieApi';
import { IMovieOverviewDetails, IMovieFullCredits, IMovieCastCredits, IMovieCrewCredits, ITrivia, ITriviaSpoilt, ITriviaUnspoilt, IMovieImages, IImages, ISimilarFilms } from '../../interfaces/movieData';
import { formatQid, imageNotFoundLink } from '../../utils/utils';
import { auth, db } from '../../firebase';
import { addToFavorites } from '../../utils/firebaseFunctions';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../../store/actions/loadingActions';
import { RootState } from '../../store';
import { addFavoriteMovie } from '../../store/actions/userActions';
import { Link } from 'react-router-dom';

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<RouteParams>();
  const [overviewDetails, setOverviewDetails] = useState<IMovieOverviewDetails>();
  const [fullCredits, setFullCredits] = useState<IMovieFullCredits>();
  const [movieTrivia, setMovieTrivia] = useState<ITrivia>();
  const [movieImages, setMovieImages] = useState<IMovieImages>();
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [similarFilms, setSimilarFilms] = useState<IMovieOverviewDetails[]>();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));

        const movieDetails = await getOverviewDetails(movieId);
        setOverviewDetails(movieDetails);

        const movieCredits = await getFullCredits(movieId);
        setFullCredits(movieCredits);


        await new Promise(resolve => setTimeout(resolve, 200));

        const movieTrivia = await getTrivia(movieId);
        setMovieTrivia(movieTrivia);

        await new Promise(resolve => setTimeout(resolve, 200));

        const movieImages = await getImages(movieId);
        setMovieImages(movieImages);

        await new Promise(resolve => setTimeout(resolve, 200));

        const similarFilmsArray = await getSimilarFilms(movieId);
        const regex = /\/title\/(tt\d+)\//;
        const similarFilmsIds: [string] = similarFilmsArray.slice(0,5).map((film: string) => {
          const match = film.match(regex);
          return match && match[1] ? match[1] : null;
        });

        await new Promise(resolve => setTimeout(resolve, 200));

        const fetchSimilarFilmsDetails = async () => {
          try {
            const promises = similarFilmsIds.map((movieId) => getOverviewDetails(movieId));
            const similarFilmDetails = await Promise.all(promises);
            setSimilarFilms(similarFilmDetails);
          } catch (error) {
            throw error;
          }
        }

        fetchSimilarFilmsDetails();

        dispatch(setLoading(false));
      } catch (error) {
        throw error;
      }
    };

    fetchData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId])

  const handleAddToFavorites = async () => {
    try {
      await addToFavorites(movieId);
      dispatch(addFavoriteMovie(movieId));
      setIsInFavorites(true);
    } catch (error) {
      throw error
    }
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

  }, [movieId] );

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

  const extractMovieId = (id: string) => {
    const movieIdRegex = /\/title\/(tt\d+)\//;
    const match = id.match(movieIdRegex);
    return match && match[1] ? match[1] : null;
  };

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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth="0.5" stroke="gray" className="h-12 w-12">
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
          <div className="grid grid-cols-3 gap-1 w-full pb-3 items-center justify-center">
            <div>
              <img src={overviewDetails?.title.image.url} alt={overviewDetails?.title.title} className="w-full h-96 object-cover" />
            </div>
            {movieImages?.images.slice(3, 5).map((image: IImages, index: number) => (
              <div key={index}>
                <img src={image.url} alt={image.caption} className="w-full h-96 object-cover" />
              </div>
            ))}
          </div>
          <div className="mb-8">
            <div className="mb-2">
              {overviewDetails?.genres.map((genre: string, index: number) => (
                <button 
                  key={index}
                  className="rounded-full border-2 border-gray-400 px-3 mr-2 py-1.5 text text-white font-semibold"
                >
                  {genre}
                </button>
              ))}
            </div>
            <div className='grid grid-cols-4 gap-5'>
              <div className='col-span-3'>
                <div>
                  <p className="text-base text-white">{overviewDetails?.plotSummary ? overviewDetails.plotSummary.text : overviewDetails?.plotOutline.text}</p>
                </div>
                <hr className="h-px bg-gray-400 mt-2 mb-2" />
                <div className="flex">
                    <p className="font-bold text-white pr-3">Director</p>
                    {fullCredits?.crew.director?.slice(0, 3).map((director: IMovieCrewCredits, index: number) => (
                      <div key={index} className='flex'>
                        <p className="text-gray-400">{director.name}</p>
                        {index < 2 && <span className='text-gray-500 px-2'>|</span>}
                      </div>
                    ))}
                </div>
                <hr className="h-px bg-gray-400 mt-2 mb-2" />
                <div className="flex">
                  <p className="font-bold text-white pr-3">Writers</p>
                  {fullCredits?.crew.writer?.slice(0,3).map((writer: IMovieCrewCredits, index: number) => (
                    <div key={index} className='flex'>
                      <p className="text-gray-400">{writer.name}</p>
                      {index < 2 && <span className='text-gray-500 px-2'>|</span>}
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
              <div className='grid place-item items-center justify-center ml-4'>
                {currentUser &&       
                  !isInFavorites ?
                    <button onClick={handleAddToFavorites} className="bg-indigo-700 hover:bg-indigo-600 shadow-xl w-60 transition-all text-white font-normal py-2 px-4 rounded-lg">
                      Add to Favorites
                    </button>
                    :
                    <button disabled className="bg-indigo-900 w-60 shadow-xl transition-all text-white font-normal py-2 px-4 rounded-lg">
                      In Favorites
                    </button>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex-grow text-black px-52 bg-slate-100">
          <div className="py-5">
            <div className="flex items-center just">
              <p className="font-extrabold text-3xl text-indigo-800">|</p>
              <p className="font-bold text-2xl">&nbsp;Photos</p>
            </div>
            <div className='carousel w-1/2 py-5'>
              {movieImages?.images.slice(0,10).map((image: IImages, index: number, array: IImages[]) => (
                <div id={image.id} className='carousel-item relative w-full object-cover items-center justify-center place-items-center'>
                  <img src={image.url} alt={image.caption} className='rounded-md h-80' />
                  <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
                  <a href={index > 0 ? `#${array[index - 1].id}` : `#${array[array.length - 1].id}`} className='btn btn-circle'>❮</a>
                  <a href={index < array.length - 1 ? `#${array[index + 1].id}` : `#${array[0].id}`} className='btn btn-circle'>❯</a>
                  </div>
                </div>
              ))}
            </div>
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
            <div className='flex gap-4 items-center pt-4'>
              {similarFilms?.map((similarFilm: IMovieOverviewDetails) => {
                const movieId = extractMovieId(similarFilm.id);

                return (
                  <Link to={`/moviedetail/${movieId}`} key={similarFilm.id} className='hover:scale-110 shadow-lg transition ease-in-out delay-100'>
                    <div className='card w-60 max-h-96 glass px-2 py-4 hover:bg-gray-300 transition ease-in-out delay-100'>
                      <figure><img src={similarFilm.title.image.url} alt={similarFilm.title.title}/></figure>
                      <div className='flex items-center pt-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth="0.3" stroke="gray" className="h-7 w-7 pl-1">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                        <p className='text-gray-500 font-light pl-1'>{similarFilm.ratings.rating}</p>
                      </div>
                      <p className='pl-1 card-title text-gray-700 font-semibold text-base'>{similarFilm.title.title}</p>
                      <p className='pl-1 text-gray-500'>{similarFilm.title.year}</p>
                    </div>
                  </Link>
                )
              })}
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