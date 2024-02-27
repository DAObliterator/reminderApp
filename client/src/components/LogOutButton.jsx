import React , { useContext} from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";

export const LogOutButton = () => {
  const navigate = useNavigate();

  const { userInfo , setUserInfo } = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();

    setUserInfo({ isAuthenticated: false})
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("role");
    window.localStorage.removeItem("isAuthenticated");
    window.localStorage.removeItem("email");

    axios
      .get("http://localhost:6028/auth/kill-auth" , {withCredentials: true})
      .then((response) => {
        if (response.status == 200) {
          console.log("you have been successfull logged out ");
          alert("User Logged Out");
          navigate("/")
        }
      })
      .catch((error) => {
        console.log(
          `${error} --- error happened while attempting to log out \n`
        );
      });

    
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
