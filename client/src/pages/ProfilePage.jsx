import React , { useState , useEffect , useContext } from 'react';
import { UserContext } from '../App';
import axios from 'axios';


export const ProfilePage = () => {

    const { userInfo, setUserInfo } = useContext(UserContext);


  
    
  return (
    <div id="Profile-Page-Main" className="w-screen h-screen flex flex-col justify-evenly items-center bg-bg1">
        Profile Page {userInfo.username}
    </div>
  )
}
