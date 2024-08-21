import React, { useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import DashboardView from './dashboardView/dashboardView'


const Dashboard = ({ children }) => {

    const [isLoged, setIsLoged] = useState(null)
    const navigate = useNavigate()
  
    return (
      <>
        <HelmetProvider>
          <Helmet>
            <title>Dashboard | Eagle Wear</title>
          </Helmet>
          <div>
            <DashboardView />
          </div>
        </HelmetProvider>
        <div>{children ? children : <Outlet/>}</div>
      </>
    )
}
  
export default Dashboard