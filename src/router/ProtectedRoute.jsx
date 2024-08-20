import { Navigate, Outlet } from 'react-router-dom';



export const ProtectedRoute = ({allowed, children, redirecTo = "/login"} )=> {
 
  if(!allowed){
    return  <Navigate to={redirecTo} replace/>
  }
  
 return children ? children : <Outlet/>
  
}
