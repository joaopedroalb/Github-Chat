import { createContext } from "react";
import { useState } from "react/cjs/react.development";


export const UsernameContext = createContext()

export const UserNameProvider = ({children}) =>{
    const [username,setUsername] = useState('joaopedroalb')

    return <UsernameContext.Provider value={{username,setUsername}}>
            {children}
           </UsernameContext.Provider>
}