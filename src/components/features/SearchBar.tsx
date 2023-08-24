import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../store/actions/movieActions';
import { RootState } from '../../store';
import { Movie } from '../../interfaces/movie';
import { setLoading } from '../../store/actions/loadingActions';
import { Link } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const searchResults = useSelector((state: RootState) => state.movies.searchResult);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    await dispatch(fetchMovies(searchQuery) as any);
    dispatch(setLoading(false));
  }

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  const formatQid = (qid: string) => {
    return qid
      .replace(/(movie|tvSeries|tvMiniSeries|short)/g, (match) => {
        return match.charAt(0).toUpperCase() + match.slice(1);
      })
      .replace(/([A-Z])/g, ' $1')
      .replace(/Tv V/g, 'TV V')
      .replace(/Tv ([A-Z])/g, (match, p1) => {
        return 'TV ' + p1.toUpperCase();
      })
      .trim();
  };
  
  

  const imageNotFoundLink = "data:image/png;base64,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"

  return (
    <div className='flex h-screen flex-col justify-center'>
      <div className='flex h-1/4 w-full items-center justify-center bg-slate-950 p-4'>
        <form onSubmit={handleSearch}>
          <input 
            type='text'
            className = 'sm:w-24 md:w-44 lg:w-96 rounded-l-md border bg-slate-950 px-4 py-2 text-white focus:border-indigo-400 focus:outline-none focus:ring'
            value={searchQuery}
            placeholder='Search for a movie, series, or actor...'
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type='submit'
            className='rounded-r-md border bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700 disabled:bg-indigo-300'
            disabled={isLoading}
            style={{ width: '120px' }}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {isLoading ? (
        <div className="flex flex-col justify-center items-center overflow-y-scroll flex-grow h-3/4 bg-slate-950">
          <div role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div>
      </div>
      ) : (
        <div className='flex-grow h-3/4 grid grid-cols-1 gap-4 overflow-y-scroll bg-slate-950 sm:px-16 md:px-56 px-96 py-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {searchResults
          .filter((movie: Movie) => movie.qid && ['movie', 'tvSeries', 'tvMiniSeries', 'tvMovie', 'short'].includes(movie.qid))
          .map((movie: Movie) => (
            <Link to="/moviedetail" key={movie.id} className='max-h-96 min-h-[24rem] overflow-hidden rounded-lg bg-stone-900 p-3 shadow-lg transition ease-in-out delay-100 hover:bg-stone-700 hover:-translate-y-1 hover:scale-110'>
              <img src={movie.i?.imageUrl ? movie.i.imageUrl : imageNotFoundLink} alt={movie.l} className='mb-4 h-4/6 w-full rounded-lg object-cover' />
              <h2 className='text-xl font-semibold text-white'>{movie.l}</h2>
              <p className='text-sm text-gray-400'>{movie.y}</p>
              <p className='text-xs font-bold text-gray-400'>{movie.qid && formatQid(movie.qid)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar