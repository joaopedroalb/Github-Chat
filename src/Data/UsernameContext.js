import { createContext,useState } from "react";


export const UsernameContext = createContext({})

export default function UserNameProvider({children}){
    const [username,setUsername] = useState('joaopedroalb')

    return <UsernameContext.Provider value={{username,setUsername}}>
            {children}
           </UsernameContext.Provider>
}