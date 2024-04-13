import React, { useEffect } from 'react';
import axios  from 'axios';

export const SchedulePage = () => {

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/auth/dummy-route`, {
      withCredentials: true,
    });
  })


  return (
    <div>Schedule Page</div>
  )
}
