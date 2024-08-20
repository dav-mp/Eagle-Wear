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
      <HelmetProvider>
        <Helmet>
          <title>Login | Eagle Wear</title>
          <meta name="description" content="Descripción de mi aplicación" />
        </Helmet>
        <div style={{ width: '100%' }}>
            {!isLoged.email
            ? <LoginView />
            : null
            }
        </div>
      </HelmetProvider>
    </>
  )
}

export default Login
