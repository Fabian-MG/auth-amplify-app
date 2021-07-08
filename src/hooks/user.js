import { Auth } from "aws-amplify"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()
const initialState = {
    username: null,
}

const AuthProvider = (props) => {
    const [user, setUser] = useState(initialState)

    const checkUser = async () => {
       try { 
           const userCredentials = await Auth.currentAuthenticatedUser()
           setUser({username: userCredentials.username, ...userCredentials})
       } catch(err) {
       }
    }

    const logIn = () => {}

    const logOut= () => {}

    const register = () => {}

    useEffect(() => {
        checkUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value = { user, logIn, logOut, register }
    return (
        <AuthContext.Provider value={value} {...props}/>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw new Error('You must use Auth hook inside the provider')
    }
    
    return context
}

export { AuthProvider, useAuth }