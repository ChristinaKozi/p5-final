import { createContext, useState, useEffect } from 'react';

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        // auto-login
        fetch("/checksession")
        .then((r) => {
          if (r.status === 200) {
            r.json()
            .then((user) => setUser(user));
          }
        });
      }, []);
    
    return <UserContext.Provider value={{ user, setUser }}>{ children }</UserContext.Provider>
}

export { UserContext, UserProvider }