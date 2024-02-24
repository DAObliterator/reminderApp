import React , { useContext} from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export const LogOutButton = () => {
  const navigate = useNavigate();

  const { userInfo , setUserInfo } = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();

    setUserInfo({ isAuthenticated: false})
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("isAuthenticated");

    
  };

  return (
    <button
      id="Profile-Button"
      className="bg-white rounded-full text-black position-absolute bottom-0 h-16 w-16 flex justify-center items-center shadow-md"
      onClick={(e) => handleLogout(e)}
    >
      <LogoutIcon></LogoutIcon>
    </button>
  );
};
