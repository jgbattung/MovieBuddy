import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getOverviewDetails, getFullCredits } from '../../utils/movieApi';
import { useHistory } from 'react-router';
import { IMovieFullCredits, IMovieOverviewDetails } from '../../interfaces/movieData';
import { setLoading } from '../../store/actions/loadingActions';
import { Link } from 'react-router-dom';


const Favorites: React.FC = () => {
  const userData = useSelector((state: RootState) => state.userData)
  const { firstName, favorites } = userData;
  const [favoriteMoviesOverview, setFavoriteMoviesOverview] = useState<IMovieOverviewDetails[]>([])
  const [favoriteMoviesCrew, setFavoriteMoviesCrew] = useState<IMovieFullCredits[]>([])
  const [errorFetchingMovies, setErrorFetchingMovies] = useState<boolean>(false)
  const history = useHistory();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        if (!favorites || favorites.length === 0) return; 
        
        if (favoriteMoviesOverview.length > 0 && favoriteMoviesCrew.length > 0) return;

        const favoriteMovieOverviewDetails = [];
        const favoriteMovieCrewDetails = [];

        for (const favorite of favorites) {
          try {
            dispatch(setLoading(true));
            await new Promise(resolve => setTimeout(resolve, 200));
            const overviewDetails = await getOverviewDetails(favorite);
            favoriteMovieOverviewDetails.push(overviewDetails);

            await new Promise(resolve => setTimeout(resolve, 200));

            const crewDetails = await getFullCredits(favorite);
            favoriteMovieCrewDetails.push(crewDetails);
          } catch (error) {
            setErrorFetchingMovies(true);
            return null
          }
        }

        const filteredFavoriteMovieOverviewDetails = favoriteMovieOverviewDetails.filter((movie) => movie !== null);
        const filteredFavoriteMovieCrewDetails = favoriteMovieCrewDetails.filter((movie) => movie !== null);

        setFavoriteMoviesOverview([...filteredFavoriteMovieOverviewDetails]);
        setFavoriteMoviesCrew([...filteredFavoriteMovieCrewDetails]);
        dispatch(setLoading(false));
      } catch (error) {
        throw error;
      }
    };

    fetchFavoriteMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites, history.location.pathname]);

  return (
    <div className='mx-80 mt-6'>
      <div className={`grid grid-cols-4 ${isLoading ? 'h-screen' : favorites.length < 3 ? 'h-screen' : 'h-full'}`}>
        <div className='col-span-3 bg-slate-800'>
          <div className=' bg-slate-900 text-white border-b border-white'>
            <p className='pl-7 pt-7 pb-2 text-4xl font-semibold'>Your Favorites</p>
            {favorites ? (
              <p className='pl-7 pb-7 text-gray-400 font-thin text-base'>{`${favorites.length} Titles`}</p>
            ) : (
              <p className='pl-7 pb-7 text-gray-400 font-thin text-base'></p>
            )}
          </div>
          <div className='px-5'>
            {errorFetchingMovies ? (
              <p className='pt-20 px-8 text-center text-gray-300 font-mono'>There was an error in displaying your favorite movies. Please try again later.</p>
            ) : isLoading ? (
              <div className="flex flex-col justify-center items-center pt-7">
                <span className="loading loading-bars loading-lg"></span>
                <p className='pt-3 text-gray-300 text-base font-medium'>Loading your favorite movies</p>
              </div>
            ) : (
              favoriteMoviesOverview.map((movie: IMovieOverviewDetails, index) => {
                if (!movie) {
                  return null
                }
                
                return (
                  <div key={movie.title.title} className='w-full mt-5'>
                  <div className='flex'>
                    <img src={movie.title.image.url} alt={movie.title.title} className=' h-44' />
                    <div className='pl-3'>
                      <p className='text-xl font-semibold text-white'>{movie.title.title}</p>
                      <div className='flex text-sm font-thin text-white'>
                        <div className='flex text-sm font-thin text-gray-500'>
                          <p>{movie.title.year} &nbsp;|&nbsp;</p>
                          <p>{movie.genres.join(' | ')}</p>
                        </div>
                      </div>
                      <div className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="h-6 w-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                        <p className='font-semibold text-white'>{movie.ratings.rating}</p>
                      </div>
                      <div className='flex text-gray-300 font-light text-sm'>
                        {favoriteMoviesCrew[index]?.crew.director.map((director) => (
                          <p>{director.name}&nbsp;|&nbsp;</p>
                        ))}
                        {favoriteMoviesCrew[index]?.cast.slice(0, 3).map((actor, actorIndex) => (
                          <span>
                            {actor.name}
                            {actorIndex < favoriteMoviesCrew[index].cast.slice(0, 3).length - 1 && ',\u00A0'}
                          </span>
                        ))}
                      </div>
                      <div className='my-3 text-sm text-white'>
                        {movie.plotOutline.text}
                      </div>
                    </div>
                  </div>
                  <hr className="h-px bg-gray-300 mt-7" />
                </div>
                )
              })
            )}
          </div>
        </div>
        <div className='border-l border-white bg-slate-900 pl-7'>
          <p className='pt-20 text-gray-200 text-2xl font-medium'>Welcome back, {firstName}!</p>
          <div className='pt-7'>
            <Link to='/homepage' className='text-gray-400 text-base font-semibold hover:text-gray-200 transition-all'>Find new films to add to Your Favorites!</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Favorites