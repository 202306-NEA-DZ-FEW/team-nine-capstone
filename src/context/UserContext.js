import React, { createContext, useContext, useEffect, useState } from "react";

import { auth } from "@/lib/firebase/controller";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const isLogged = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // User is signed in
                setUser(authUser);
            } else {
                // User is signed out
                setUser(null);
            }
        });

        // Clean up the subscription
        return () => isLogged();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
