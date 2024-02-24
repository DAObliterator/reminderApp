import React from 'react'
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useNavigate } from 'react-router-dom';

export const ProfileButton = () => {

    const navigate = useNavigate()

    const handleProfileRedirection = (e) => {
        e.preventDefault();
        navigate("/profile")

    }

  return (
    <button id="Profile-Button" className="bg-white rounded-full text-black position-absolute bottom-0 h-16 w-16 flex justify-center items-center shadow-md" onClick={(e) => handleProfileRedirection(e)}>
        <AccountBoxIcon></AccountBoxIcon>
    </button>
  )
}
