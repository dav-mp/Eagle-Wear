import React, { useState, useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import LoginView from './loginView/loginView';
import { useNavigate } from 'react-router-dom';


const Login = ({ user }) => {

  const [isLoged, setIsLoged] = useState(user)
  const navigate = useNavigate()
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log(apiUrl, isLoged);
    
    if (isLoged.email) {
      navigate('/')
    }
  }, [])

  return (
    <>
      {!isLoged.email
        ? <HelmetProvider>
            <Helmet>
              <title>Eagle Wear</title>
            </Helmet>
            <div style={{ width: '100%' }}>
                <LoginView />
            </div>
          </HelmetProvider>
        : null}
    </>
  )
}

export default Login
