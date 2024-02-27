import React , { useContext } from 'react';
import { UserContext } from '../App';

export const ProfileCard = ( ) => {

  const { userInfo , setUserInfo } = useContext(UserContext);

  return (
    <div
      id="Profile-Card"
      className="min-h-40 min-w-40 flex flex-col justify-evenly items-center rounded-md bg-bg3 shadow-md  text-white font-bold tracking-wide "
    >
      <div id="Profile-Dummy-Image" className="max-h-40 max-w-40 p-2">
        <img src="/oldman2.jpg" alt="oldman" className="bg-bg3 rounded-full" />
      </div>
      <div
        id="Profile-Info"
        className="flex flex-col justify-center items-center p-2 flex-grow"
      >
        <div
          id="Username-div"
          className="p-2 sm:p-4 flex flex-row justify-evenly "
        >
          <label htmlFor="username">USERNAME:</label>
          <h4 id="username">{userInfo.username}</h4>
        </div>
        <div id="Role-div" className="p-2 sm:p-4 flex flex-row justify-evenly">
          <label htmlFor="username">ROLE:</label>
          <h4 id="username">{userInfo.role}</h4>
        </div>
        <div id="Email-div" className="p-2 sm:p-4 flex flex-row justify-evenly">
          <label htmlFor="email">EMAIL:</label>
          <h4 id="email">{userInfo.email}</h4>
        </div>
      </div>
    </div>
  );
}
