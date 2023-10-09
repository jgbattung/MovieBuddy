import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { getOverviewDetails } from '../../utils/movieApi';
import { Movie } from '../../interfaces/movie';
import { IMovieOverviewDetails } from '../../interfaces/movieData';

const Favorites: React.FC = () => {
  const userData = useSelector((state: RootState) => state.userData)
  const { firstName, lastName, email, favorites } = userData;
  const [favoriteMovies, setFavoriteMovies] = useState<IMovieOverviewDetails[]>([])

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        if (favorites.length === 0) return;

        const favoriteMovieDetails = await Promise.all(favorites.map(async (favorite: string) => {
          try {
            return await getOverviewDetails(favorite);
          } catch (error) {
            console.log('Fave Detail Error', error);
          }
        }));

        const filteredFavoriteMovieDetails = favoriteMovieDetails.filter((movie) => movie !== null)

        setFavoriteMovies(filteredFavoriteMovieDetails);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavoriteMovies();
  }, [favorites]);

  const handleClick = () => {
    console.log(favorites)
    console.log(favoriteMovies)
  }

  return (
    <div className='mx-80 mt-6'>
      <div className='grid grid-cols-4 h-screen'>
        <div className='col-span-3 bg-slate-800'>
          {/* <button onClick={handleClick}>FAVES</button> */}
          <div className='bg-black text-white'>
            <p className='pl-4 pt-4 text-2xl font-bold'>Your Favorites</p>
            <p className='pl-4 pb-4'>{favorites.length} Titles</p>
          </div>
          <div className='px-5'>
            {favoriteMovies.map((movie: IMovieOverviewDetails) => (
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
                    <div className='my-3 text-sm text-white'>
                      {movie.plotOutline.text}
                    </div>
                  </div>
                </div>
                <hr className="h-px bg-gray-300 mt-7" />
              </div>
            ))}
          </div>
        </div>
        <div className='bg-green-500'>
          <p className='pt-4 pl-4 text-white'>Welcome back, {firstName}!</p>
          <p className='pl-4 text-white'>{email}</p>
        </div>
      </div>
    </div>
  )
}

export default Favorites