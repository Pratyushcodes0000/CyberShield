import React from 'react'
import { useState,useEffect } from 'react'


const EmailScanner = ()=>{
    const[user,setUser] = useState("");

    useEffect(()=>{
  // Get user data from localStorage
  const userData = localStorage.getItem('user');
  console.log("Retrieved user data from localStorage:", userData);
  if (userData) {
    try {
      const parsedUser = JSON.parse(userData);
      console.log("Parsed user data:", parsedUser);
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem('user');
    }
  }
    },[]);

    return(
        <div className='container'>
          <div className='message'>
            `${user.name} let's check and secure your mails!!! `
          </div>
        </div>
    );
}
export default EmailScanner