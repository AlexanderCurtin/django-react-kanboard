import React, {useEffect, useState} from 'react';
import {UserManager} from 'oidc-client-ts';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../services/board-api-service';
const userManager = new UserManager({
    authority: 'https://dev-a--80hrm.us.auth0.com/',
    client_id: 'ewXo5g3X5uEN2ZtxPQAyeBYWVDVBMlBK',
    redirect_uri: 'http://localhost:3000/callback'
});
export const AuthContext = React.createContext({
    user: null, loaded: false
});

export const useAuthentication = () => React.useContext(AuthContext);

export const AuthContextProvider = (props) => {
    const [contextState, setContextState] = useState({ user: null, loaded: false});
    const navigate = useNavigate();
    useEffect(() => {
        console.log(contextState);
    });
    useEffect(() => {
        console.log('heyyyy');
        userManager.getUser().then(user => {
            if(user && user.access_token){
                console.log(user.access_token);
                setAuth(user.access_token);
            }
            setContextState({user, loaded: true});
        });
    }, []);

    const setUser = (user) => {
        if(user && user.access_token){
            console.log(user.access_token);
            setAuth(user.access_token);
        }
        setContextState({...contextState, user});
    }

    const initiateLogin = async () => {
        console.log('heyyy');
        const prevUrl = window.location.pathname;
        console.log(prevUrl);
        userManager.signinRedirect({state: prevUrl});
    };

    const finalizeLogin = async () => {
        const user = await userManager.signinRedirectCallback(window.url);
        setUser(user);
        navigate(user.state || '/');

    };

    const contextValue = {
        user: contextState.user,
        loaded: contextState.loaded,
        setUser,
        initiateLogin,
        finalizeLogin,
    };

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>

}