import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../../store';
import { signOut } from 'firebase/auth';
import { logoutAction } from '../../store/actions/authActions';

const Header: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  // const userData = useSelector((state: RootState) => state.userData);
  
  const history = useHistory ();
  const dispatch = useDispatch();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    try {
      await signOut(auth)
      dispatch(logoutAction());
      history.push('/');
    } catch (error: any) {
      console.log('signout error')
    }
  }

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    history.push('/login');
  }

  return (
    <nav className="bg-slate-950">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <p className="self-center text-3xl font-semibold whitespace-nowrap text-white">Movie<span className='text-3xl font-bold text-indigo-600'>Buddy</span></p>
      <div className="flex md:order-2">
        {isLoggedIn ? (
          <>
            <div className='font-medium p-4 md:p-0 mt-4 md:flex-row md:mt-0 md:border-0 hover:text-indigo-400 transition-all'>
              <Link to="/favorites" className="flex items-center justify-center py-2 pr-20 text-white hover:text-indigo-400 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
                Favorites
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="text-white text-md bg-indigo-600 transition hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center mr-3 md:mr-0">
                Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="text-white text-md bg-indigo-600 transition hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center mr-3 md:mr-0">
              Login
          </button>        )}
      </div>
      <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/homepage" className="block py-2 pl-3 pr-4 mx-8 text-white hover:text-indigo-400">Home</Link>
              </li>
            </>
          ) : (
            <>
            </>
          )}
        </ul>
      </div>
      </div>
    </nav>
  );
};

export default Header;
