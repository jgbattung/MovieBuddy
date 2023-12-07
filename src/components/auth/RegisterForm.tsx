import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { getErrorMessage } from '../../utils';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { setLoading } from '../../store/actions/loadingActions';
import { useDispatch } from 'react-redux';

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const isRegistrationPage = location.pathname === '/registration';

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        await addDoc(collection(db, "users"), {
          uid: userCredential.user.uid,
          email: email,
          firstName: firstName,
          lastName: lastName,
          favorites: [],
        })
        history.push('/login')
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
    <div className={`${isRegistrationPage ? 'w-1/3' : 'w-2/3'} overflow-hidden rounded-lg bg-white shadow-lg p-10`}>
      <div className="w-full p-8">
        {isRegistrationPage ? (
          <h2 className="text-center text-4xl font-bold text-gray-700">MovieBuddy</h2>
        ) : ('')
        }
        <div className={`${isRegistrationPage ? 'mt-4' : ''} flex items-center justify-between`}>
          <span className="w-1/5 border-b lg:w-1/4"></span>
          <p className="text-center text-xs uppercase text-gray-500">Create a new account</p>
          <span className="w-1/5 border-b lg:w-1/4"></span>
        </div>
        <form onSubmit={handleRegister}>
          <div className="mt-4">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="first-name">First Name</label>
            <input 
              className="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 px-4 py-2 text-gray-700 focus:outline-none" 
              id="first-name"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} 
            />
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="last-name">Last Name</label>
            <input 
              className="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-gray-200 px-4 py-2 text-gray-700 focus:outline-none" 
              id="last-name" 
              type="text" 
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
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
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-8">
            <button 
              className="w-full rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-600 disabled:bg-gray-400"
              type="submit"
              disabled={isLoading}
              >
                {!isLoading ? 'Register' : 'Creating your account...'}
            </button>
          </div>
          {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
        </form>
        <div className="mt-4 flex items-center justify-center">
          <p className="text-xs text-gray-500">
            Already have an account?
            <Link to='/login' className="text-xs font-semibold text-gray-500">&nbsp;Login here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
