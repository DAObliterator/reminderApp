import React , { useEffect} from 'react';
import axios from "axios"

export const HomePage = () => {

   useEffect(() => {
     axios
       .get("http://localhost:6028/initialize-session")
       .then((response) => {
         console.log(`session initialized ${response.data.message}`);
       })
       .then((error) => {
         console.log(`${error} -- error happened \n`);
       });
   }, []);


  return (
    <div>HomePage</div>
  )
}
