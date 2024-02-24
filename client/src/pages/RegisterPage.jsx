import React , { useState , useEffect , useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";

export const RegisterPage = () => {

  const [ username , setUsername ] = useState("");
  const [ password , setPassword ] = useState("");
  const [ role , setRole ] = useState("Patient");
  const userInfo = useContext(UserContext)

  const navigate = useNavigate();


  const handleFormSubmit = (e) => {

    e.preventDefault()

    console.log( username , password , role , " : (")

    axios
      .post(
        "http://localhost:6028/auth/register",

        { username, password, role },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(
          `${
            JSON.stringify(response.data.newUser)
          } ---data from /auth/register endpoint \n`
        );

        if (response.status === 200 ) {
          navigate("/authenticate")
        }
      })
      .catch((error) => {
        console.log(`${error} error happened while attempting to Register \n`);
      });


  }


  return (
    <div
      id="Register-Main"
      className="w-screen h-screen flex flex-col justify-center items-center bg-bg4 "
    >
      <form
        id="Register-Form"
        className="sm:p-4 p-2 flex flex-col justify-evenly items-center rounded-md  bg-bg3 w-1/4 h-1/2 min-w-64 min-h-80"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <h2 className="text-2xl font-extrabold">REGISTER</h2>
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
        <div
          id="select-role"
          className="flex flex-row justify-evenly items-center"
        >
          <label htmlFor="roles"> Select Role </label>
          <select
            name="roles"
            id="roles"
            className=""
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Patient">Patient</option>
            <option value="CareTaker">CareTaker</option>
          </select>
        </div>

        <button id="submit-btn" className="rounded-md" type="submit">
          Submit
        </button>
        <a href="/authenticate" className="text-xs tracking-wider text-white">
          Have an Account? Login
        </a>
      </form>
    </div>
  );
};
