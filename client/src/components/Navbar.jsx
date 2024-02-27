import React , { useState , useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { ProfileButton } from './ProfileButton';
import { LogOutButton } from './LogOutButton';

export const Navbar = () => {

  const [ isAuthenticated , setIsAuthenticated ] = useState(false)

  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
      setIsAuthenticated(userInfo.isAuthenticated);
  } )


  return (
    <div
      id="navbar"
      className="w-full h-16 absolute flex flex-row justify-evenly items-center bg-bg2  text-xl font-extrabold sm:text-lg"
    >
      <Link to="/" className="text-white">
        HOME
      </Link>
      {!isAuthenticated && (
        <Link to="/authenticate" className="text-white">
          LOGIN
        </Link>
      )}
      {isAuthenticated && (
        <Link to="/notifications" className="text-white">
          NOTIFICATION
        </Link>
      )}
      {isAuthenticated && (
        <Link to="/schedule" className="text-sd">
          SCHEDULE
        </Link>
      )}
      {isAuthenticated && <ProfileButton></ProfileButton>}
      {isAuthenticated && <LogOutButton></LogOutButton>}
    </div>
  );
}
