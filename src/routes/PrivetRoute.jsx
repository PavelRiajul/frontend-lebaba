import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

const PrivetRoute = ({children,role}) => {
    const {user} = useSelector((state) => state.auth);
    console.log('User role',user.role)
    const location = useLocation()
    if(!user) {
        alert("You must be logged in")
        return <Navigate to="/login" state={{from: location}}  replace/>
    }
    //admin access
    if(role && user?.role !== role) {
        alert ("Access denied! You must be an admin");
        return <Navigate to="/login" state={{from: location}}  replace/>
    }


  return children
}

export default PrivetRoute