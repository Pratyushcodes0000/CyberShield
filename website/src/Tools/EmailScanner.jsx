import React from 'react'
import { useState, useEffect } from 'react'

const EmailScanner = () => {
  
    const [email,setEmail] = useState('')

    useEffect(()=>{
        const userData = localStorage.getItem('user')
        if(userData){
            const parsedUser = JSON.parse(userData)
            setEmail(parsedUser.email)
        }
    },[])

    //fetch email from server
    const fetchEmail = async () => {
        try{
            const response = await axios.get(`http://localhost:8000/api/emails/${email}`)
            console.log(response.data)
        }catch(error){
            console.error('Error fetching email:', error)
        }
    }


   return(
    <div>
        <h1>Email Scanner</h1>
    </div>
   )
}

export default EmailScanner