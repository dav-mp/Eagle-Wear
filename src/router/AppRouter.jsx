import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Spiner  } from '../presentation/components/spinner/Spiner'
import { ProtectedRoute } from './ProtectedRoute';
import useAuth from '../presentation/hooks/auth/useAuth';

const Login = lazy(() => import('../presentation/page/login/login'))
const Dashboard = lazy(() => import('../presentation/page/dashboard/dashboard'))
const ListArticle = lazy(() => import('../presentation/page/articles/articles'))
// const Demo = lazy(() => import('../pages/DemoPage'))
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
            <Route path="/login" element={<Login user={user}/>} />

            <Route element={<ProtectedRoute allowed={user.email} />}>
              {/* El dashboard siempre se renderiza después de pasar la ruta protegida */}
              <Route element={<Dashboard />}>
                {/* Rutas internas del Dashboard */}
                <Route path="/" element={<Suspense fallback={<Spiner />}><ListArticle /></Suspense>} />
                {/* <Route path="/NewBornPlan" element={<Suspense fallback={<Spiner />}><NewBorn /></Suspense>} /> */}
                {/* Puedes agregar más rutas dentro del Dashboard según necesites */}
              </Route>
            </Route>

            <Route path='*' element={<h1>Sin info</h1>}/>
          {/* </Route> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )

}
export default AppRouter
 