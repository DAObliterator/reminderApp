import React , { useEffect} from 'react';
import { GiMedicines } from "react-icons/gi";
import axios from "axios"

export const HomePage = () => {

   useEffect(() => {
     axios
       .get(`${import.meta.env.VITE_API}/initialize-session`)
       .then((response) => {
         console.log(`session initialized ${response.data.message}`);
       })
       .then((error) => {
         console.log(`${error} -- error happened \n`);
       });
   }, []);

   return (
     <div id="Home-Page-Main" className="flex flex-col mt-16">
       <h1 className="text-5xl tracking-wider hover:text-green-500 text-green-800 flex justify-center sm:m-4 m-2">
         Welcome To Da Pill Guru{" "}
         <GiMedicines className="inline-block text-7xl" />
       </h1>
       <div className="flex flex-col justify-center items-center m-4 sm:m-2 text-xl sm:text-2xl">
         <h2 className="text-3xl flex flex-col text-center">
           Use this App to Schedule Reminders to Take Medicines on Time
         </h2>

         <div className="mt-8">
           <h4 className="font-bold mb-2">Instructions on How to Use</h4>
           <ul className="flex flex-col ml-4">
             <li className="mb-2">
               <a href="/register">
                 {" "}
                 <strong >Register</strong>{" "}
               </a>
               here
             </li>
             <li className="mb-2">
               <strong>Login</strong> to Continue. On successful login, you
               would be redirected to the Profile Page
             </li>
             <li className="mb-2">
               Click on the + Button on the Profile Page to Keep Adding
               Reminders
             </li>
             <li className="mb-2">
               You Will Receive Emails When It Is Time to Take Medicine
             </li>
           </ul>
         </div>
       </div>
     </div>
   );
}
