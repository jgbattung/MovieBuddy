import React, { useState } from 'react';
import { auth } from '../../firebase';
import { getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getErrorMessage } from '../../utils';

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lasttName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    console.log('clicked')
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      console.log('registered')
    } catch (error: any) {
      const regex = /auth\/(.*?)\)/;
      const regexMatch = error.message.match(regex);
      const errorText = regexMatch && regexMatch[1];
      setErrorMessage(getErrorMessage(errorText));
      console.log(errorText)
    }
  }

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={handleRegister} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3>Register</h3>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            First Name
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="first-name" 
            type="text" 
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Last Name
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="lasst-name" 
            type="text" 
            placeholder="Last name"
            value={lasttName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Email
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="email" 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
            id="password" 
            type="password" 
            placeholder="***********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit"
          >
            Register
          </button>
        </div>
        {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
      </form>
    </div>
  )
}

export default RegisterForm
