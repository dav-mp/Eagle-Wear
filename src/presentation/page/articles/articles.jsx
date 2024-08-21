import React, { useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import ArticlesView from './articlesView/articlesView'


const Articles = ({ children }) => {

    const [isLoged, setIsLoged] = useState(null)
    const navigate = useNavigate()
  
    return (
      <>
        <HelmetProvider>
          <Helmet>
            <title>Articles | Eagle Wear</title>
          </Helmet>
          <div>
            <ArticlesView />
          </div>
        </HelmetProvider>
      </>
    )
}
  
export default Articles