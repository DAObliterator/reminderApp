import React,{ useState , useEffect , useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import axios from "axios"

export const AuthenticationPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);

  const  navigate = useNavigate()

  const handleSubmit = (e) => {

     e.preventDefault();

     axios
       .post(
         "http://localhost:6028/auth/login",

         { username, password },
         { withCredentials: true }
       )
       .then((response) => {
         console.log(
           `${JSON.stringify(
             response.data
           )} ---data from /auth/login endpoint \n`
         );

         if (response.status === 200) {
           setUserInfo(response.data.user);
           window.localStorage.setItem("username", response.data.user.username);
           window.localStorage.setItem("role", response.data.user.role);
           window.localStorage.setItem("isAuthenticated", response.data.user.isAuthenticated);
           window.localStorage.setItem(
             "email",
             response.data.user.email
           );
           navigate("/profile");
         }
       })
       .catch((error) => {
         console.log(`${error} error happened while attempting to Register \n`);
       });


  }

  return (
    <div
      id="Authentication-Main"
      className="w-screen h-screen flex flex-col justify-center items-center bg-bg4"
    >
      <form
        id="Login-Form"
        className="sm:p-4 p-2 flex flex-col justify-evenly items-center rounded-md  bg-bg3 w-1/4 h-1/2  min-w-64 min-h-80"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-2xl font-extrabold">LOGIN</h2>
        <input
          type="text"
          id="username"
          placeholder="...username"
          className="p-2 sm:p-4 rounded-md "
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="...password"
          className="p-2 sm:p-4 rounded-md "
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id="submit-btn" className="rounded-md" type="submit">
          Submit
        </button>
        <a href="/register" className="text-xs tracking-wider text-white">
          {" "}
          Dont have an Account? Register
        </a>
      </form>
    </div>
  );
}
