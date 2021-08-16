import React, { useEffect, useState } from "react";
import firebase from './Firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setPending(false);
        });
    }, []);

    if (pending) return <>Caricamento...</>;

    return (<AuthContext.Provider value={{ currentUser }} >{children}</AuthContext.Provider>)
};