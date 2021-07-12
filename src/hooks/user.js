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
       } catch(err) {}
    }

    const signIn = async ({username, password}) => {
        try {
            const signInUser = await Auth.signIn(username, password)
            setUser({ username: signInUser.username, ...signInUser.attributes })
        } catch(err) {
            console.log('error signing in..', err)
        }
    }

    const signUp = async ({username, password, email}) => {
        try {
            await Auth.signUp({username, password, attributes: { email }})
            console.log('sign up success')
        } catch(err) {
            console.log('error signing up..', err)
        }
    }

    async function confirmSignUp({ username, confirmationCode }) {
        try {
          await Auth.confirmSignUp(username, confirmationCode)
        } catch (err) {
          console.log('error signing up..', err)
        }
    }
    
    async function forgotPassword({ username }) {
        try {
          await Auth.forgotPassword(username)
        } catch (err) {
          console.log('error submitting username to reset password...', err)
        }
    }

    async function forgotPasswordSubmit({ username, confirmationCode, password }) { 
        try {
            await Auth.forgotPasswordSubmit(username, confirmationCode, password)
        } catch (err) {
            console.log('error updating password... :', err)
        }
    }
    
    useEffect(() => {
        checkUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value = { user, signIn, signUp, confirmSignUp, forgotPassword, forgotPasswordSubmit }
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