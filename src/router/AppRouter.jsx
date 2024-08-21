import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Spiner  } from '../presentation/components/spinner/Spiner'
import { ProtectedRoute } from './ProtectedRoute';
import useAuth from '../presentation/hooks/auth/useAuth';

const Login = lazy(() => import('../presentation/page/login/login'))
// const Demo = lazy(() => import('../pages/DemoPage'))
// const Dashboard = lazy(() => import('../Layout/DashboardIndex/DashboardIndex'))
// const NewBorn = lazy(() => import('../pages/NewBorn/NewBorn'))


const AppRouter = () => {
  const { userStatus } = useAuth();
  const user = userStatus
  // console.log('AAAAAAA', user);

  return (
    <BrowserRouter>
      <Suspense fallback={<Spiner />} >
        {/* <Login /> */}
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
            <Route path="/" element={<Login user={user}/>} />

            

            <Route path='*' element={<h1>Sin info</h1>}/>
          {/* </Route> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )

}
export default AppRouter
 