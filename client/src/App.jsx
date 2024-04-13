import { useState, useEffect , createContext } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import './App.css'
import { HomePage } from './pages/HomePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SchedulePage } from './pages/SchedulePage';
import { AuthenticationPage } from './pages/AuthenticationPage';
import { RegisterPage } from './pages/RegisterPage';
import { Navbar } from './components/Navbar';
import axios from 'axios';
import { ProfilePage } from './pages/ProfilePage';
import { ProfileButton } from './components/ProfileButton';


export const UserContext = createContext({
  userInfo: { isAuthenticated: false },
  setUserInfo: () => {},
});

function App() {

  const [userInfo, setUserInfo] = useState({ isAuthenticated: false });

     useEffect(() => {
       axios
         .post(
           `${import.meta.env.VITE_API}/auth/auth-status`,

           {
             username: window.localStorage.getItem("username"),
             role: window.localStorage.getItem("role"),
           },
           { withCredentials: true }
         )
         .then((response) => {
           if (response.status === 200) {
             console.log(JSON.stringify(response.data), " ---response data \n");
             setUserInfo(response.data);
           }
         })
         .catch(() => {});
     }, []);
  

  return (
    <div id="Main" className=" bg-bg4 w-screen h-screen relative overflow-auto">
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route
              path="/notifications"
              element={<NotificationsPage></NotificationsPage>}
            ></Route>
            <Route
              path="/schedule"
              element={<SchedulePage></SchedulePage>}
            ></Route>
            <Route
              path="/authenticate"
              element={<AuthenticationPage></AuthenticationPage>}
            ></Route>
            <Route
              path="/register"
              element={<RegisterPage></RegisterPage>}
            ></Route>
            <Route
              path="/profile"
              element={<ProfilePage></ProfilePage>}
            ></Route>
          </Routes>
          
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App
