import React, { useEffect } from 'react';
import axios  from 'axios';

export const SchedulePage = () => {

  useEffect(() => {
    axios.get("http://localhost:6028/auth/dummy-route" , {withCredentials: true} )
  })


  return (
    <div>Schedule Page</div>
  )
}
