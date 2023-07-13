import React from 'react'
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ isAuth, children }) => {
   return isAuth ? children : <Navigate to='/lg/home' />
}

export default PrivateRoutes