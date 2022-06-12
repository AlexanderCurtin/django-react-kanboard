import React, { useEffect } from 'react';
import { useAuthentication } from "../contexts/AuthContext"

export const LoginComponent = () => {
    const {initiateLogin} = useAuthentication();
    useEffect(() => {
        initiateLogin && initiateLogin();
        console.log('yes');
    },[initiateLogin]);
    return (
        <>...authenticating</>
    )
}