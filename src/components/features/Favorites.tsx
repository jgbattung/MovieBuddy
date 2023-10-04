import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { fetchMovies } from '../../store/actions/movieActions';
import { Movie } from '../../interfaces/movie';

const Favorites: React.FC = () => {
  const userData = useSelector((state: RootState) => state.userData)
  const { firstName, lastName, email, favorites } = userData;
  const dispatch = useDispatch();
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        if (favorites.length === 0) {
          return;
        }

        // Fetch movie details for each favorite movie
        const movieDetailPromises = favorites.map((movieId: string) =>
          dispatch(fetchMovies(movieId) as any)
        );

        // Wait for all movie details to be fetched
        const movieDetails = await Promise.all(movieDetailPromises);

        // Set the fetched movie details in state
        setFavoriteMovies(movieDetails);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavoriteMovies();
  }, [favorites, dispatch]);

  console.log(favoriteMovies)

  return (
    <div className='mx-80 mt-6'>
      <div className='grid grid-cols-4 h-screen'>
        <div className='col-span-3 bg-green-700'>
          <div className='bg-orange-500'>
            <p className='p-4 text-white text-2xl font-bold'>Your Favorites</p>
            <p className='pl-4 pb-4'>0 Titles</p>
          </div>
          <div>
            {/* render the favorite movies here (title, year, rating) */}
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