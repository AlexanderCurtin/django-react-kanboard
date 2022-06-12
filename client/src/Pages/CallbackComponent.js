import { useEffect } from "react";
import { renderMatches, useNavigate } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthContext"

export const CallbackComponent = () => {
    const {finalizeLogin} = useAuthentication();
    const navigate = useNavigate();
    useEffect(() => {
        finalizeLogin && setTimeout(() => finalizeLogin(), 10);
    }, [finalizeLogin]);

}