import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../store';

const UserProfile: React.FC = () => {
  const userData = useSelector((state: RootState) => state.userData)
  const { firstName, lastName, email } = userData;

  return (
    <div>
      <h1>User Info</h1>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{email}</p>
    </div>
  )
}

export default UserProfile