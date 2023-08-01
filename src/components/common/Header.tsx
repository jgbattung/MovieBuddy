import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../../store';
import { signOut } from 'firebase/auth';
import { logoutAction } from '../../store/actions/authActions';

const Header: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userData = useSelector((state: RootState) => state.userData);
  
  const history = useHistory ();
  const dispatch = useDispatch();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      await signOut(auth)
      dispatch(logoutAction());
      history.push('/');
    } catch (error: any) {
      console.log('signout error')
    }
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center justify-between">
          <li>
            <Link to="/homepage" className="text-white font-semibold text-lg">
              Home
            </Link>
          </li>
          {isLoggedIn ? (
              <>
                <Link to="/profile" className="text-white font-medium">
                  Profile
                </Link>
                <Link to="/favorites" className="text-white font-medium">
                  Favorites
                </Link>
                <p className= "text-white">Welcome back, {userData.firstName} {userData.lastName}</p>
                <button
                  onClick={handleLogout}
                  className="text-white font-medium border border-white rounded-md px-3 py-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/authentication" className="text-white font-medium">
                Login
              </Link>
            )}
          <li className="space-x-4">
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
