import React, { useState, useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Checkout from './checkoutView/checkoutView';


const Login = ({ user }) => {

  useEffect(() => {
    
  }, [])

  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title>Checkout | Eagle Wear</title>
            </Helmet>
            <Checkout />
        </HelmetProvider>
    </>
  )
}

export default Login
