import { Auth } from "aws-amplify"
import { useReducer } from "react"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()
const initialState = {
    user: null,
    unauthUser: null,
    error: null,
    loading: false,
}

const userReducer = (state, action) => {
    switch(action.type) {
        case 'START':
            return {...state, error: null, loading: true}
        case 'SIGNIN':
            return {...state, user: action.payload, error: null, loading: false}
        case 'SIGNUP':
            return {...state, unauthUser: action.payload, error: null, loading: false}
        case 'ERROR': 
            return {...state, error: action.payload, loading: false}
        case 'CLEAR':
            return initialState
    }
}

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(userReducer,initialState)
    const { user, error, loading } = state

    const checkUser = async () => {
       try { 
        const userCredentials = await Auth.currentAuthenticatedUser()
        const checkedUser = { username: userCredentials.username, ...userCredentials.attributes }
        dispatch({type: 'SIGNIN', payload: checkedUser})
       } catch(err) {}
    }

    const signIn = async ({username, password}) => {
        try { 
            dispatch({type: 'START'})
            const signInUser = await Auth.signIn(username, password)
            dispatch({type: 'SIGNIN', payload: { username: signInUser.username, ...signInUser.attributes }})
        } catch(err) {
            dispatch({type: 'ERROR', payload: err})
        }
    }

    const signUp = async ({username, password, email}) => {
        try {
            dispatch({type: 'START'})
            await Auth.signUp({username, password, attributes: { email }})
            dispatch({type: 'SIGNUP', payload: { username, password, email }})
        } catch(err) {
            dispatch({type: 'ERROR', payload: err})
        }
    }

    const confirmSignUp = async ({ username, confirmationCode }) => {
        try {
          dispatch({type: 'START'})
          await Auth.confirmSignUp(username, confirmationCode)
          dispatch({type: 'CLEAR'})
        } catch (err) {
          dispatch({type: 'ERROR', payload: err})
        }
    }
    
    const forgotPassword = async ({ username }) => {
        try {
          await Auth.forgotPassword(username)
        } catch (err) {
            dispatch({type: 'ERROR', payload: err})
        }
    }

    const clearError = () => {
        dispatch({type: 'CLEAR'})
    }

    const forgotPasswordSubmit = async ({ username, confirmationCode, password }) => { 
        try {
            await Auth.forgotPasswordSubmit(username, confirmationCode, password)
        } catch (err) {
            dispatch({type: 'ERROR', payload: err})
        }
    }

    const signOut = async () => { 
        try {
            await Auth.signOut()
            dispatch({type: 'CLEAR'})
        } catch (err) {
            dispatch({type: 'ERROR', payload: err})
            console.log(err)
        }
    }
    
    useEffect(() => {
        checkUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value = { 
        user, 
        error, 
        clearError, 
        loading, 
        signIn, 
        signUp, 
        signOut, 
        confirmSignUp, 
        forgotPassword, 
        forgotPasswordSubmit 
    }

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