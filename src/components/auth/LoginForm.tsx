import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getErrorMessage } from '../../utils';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../store/actions/authActions';
import { fetchAndSetUserData } from '../../utils/firebaseFunctions';
import { setUserData } from '../../store/actions/userActions';
import { IUserData } from '../../interfaces/userData';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { setLoading } from '../../store/actions/loadingActions';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginAction());
      history.push('/homepage');

      const userData = await fetchAndSetUserData()
      if (userData) {
        dispatch(setUserData(userData as IUserData));
      }
    } catch (error: any) {
      const regex = /auth\/(.*?)\)/;
      const regexMatch = error.message.match(regex);
      const errorText = regexMatch && regexMatch[1];
      setErrorMessage(getErrorMessage(errorText));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="mx-auto w-1/3 overflow-hidden rounded-lg bg-white shadow-lg p-10">
      <div className="w-full p-8">
        <h2 className="text-center text-4xl font-bold text-gray-700">MovieBuddy</h2>
        <p className="text-center text-lg text-gray-600">Welcome back!</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="w-1/5 border-b lg:w-1/4"></span>
          <p className="text-center text-xs uppercase text-gray-500">Login with email</p>
          <span className="w-1/5 border-b lg:w-1/4"></span>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mt-4">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="email">Email</label>
            <input 
              className="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 px-4 py-2 text-gray-700 focus:outline-none" 
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="password">Password</label>
            <input 
              className="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 px-4 py-2 text-gray-700 focus:outline-none" 
              id="password" 
              type="password" 
              placeholder="***********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-8">
            <button 
              className="w-full rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-600 disabled:bg-gray-400"
              type="submit"
              >
                {isLoading ? 'Logging you in ...' : 'Log in'}
            </button>
          </div>
          {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
        </form>
        <div className="mt-4 flex items-center justify-center">
          <p className="text-xs text-gray-500">
            New to MovieBuddy?
            <Link to='/registration' className="text-xs font-semibold text-gray-500">&nbsp;Register here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}



export default LoginForm