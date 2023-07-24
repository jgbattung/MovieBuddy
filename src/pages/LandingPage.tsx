import React from 'react'
import { Link } from 'react-router-dom';
import IPage from '../interfaces/page'

const LandingPage: React.FunctionComponent<IPage> = props => {

  return (
    <div className='grid h-screen place-items-center'>
      <h1>LANDING PAGE</h1>
      <Link to='/authentication'>Login</Link>
    </div>
  )
}

export default LandingPage