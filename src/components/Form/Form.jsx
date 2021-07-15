import { useState } from "react"
import { useAuth } from "../../hooks/user"
import { SignUp } from "../SignUp/SignUp"
import { SignIn } from "../SignIn/SignIn"
import { ForgotPassword } from "../ForgotPassword/ForgotPassword"
import { ConfirmSignUp } from "../ConfirmSignUp/ConfirmSignUp"

const initialState = {
    username: '', 
    password: '', 
    email: '', 
    confirmationCode: ''
}

export const Form = () => {
    const [state, setState] = useState(initialState)
    const [formType, setFormType] = useState('signIn')
    const { error, loading, clearError, signUp, signIn, confirmSignUp} = useAuth()

    const updateForm = (event) => {
        const {name, value} = event.target
        setState({...state, [name]: value})
    }

    const handleSignIn = (e) => {
        e.preventDefault()
        signIn(state)
    }

    const handleSignUp = () => {
        e.preventDefault()
        signUp(state)
        setFormType('confirmSignUp')
    }

    const handleForgotPassword = () => {
        e.preventDefault()
        signIn(state)
        setFormType('confirmSignUp')
    }

    const handleConfirmSignUp = () => {
        e.preventDefault()
        confirmSignUp(state)
        setFormType('signIn')
    } 

    const handleChangeForm = (type) => {
        clearError()
        setFormType(type)
    }

    const renderForm = () => {
        switch(formType) {
            case 'signUp': 
                return (
                    <SignUp
                        loading={loading}
                        signUp={handleSignUp} 
                        updateFormState={updateForm} 
                        changeFormType={() => handleChangeForm('signIn')} 
                    />
                )
            case 'confirmSignUp': 
                return (
                    <ConfirmSignUp 
                        loading={loading}
                        updateFormState={updateForm} 
                        confirmSignUp={handleConfirmSignUp} 
                        changeFormType={() => handleChangeForm('signIn')} 
                    />
                )
            case 'signIn':
                return (
                    <SignIn 
                        loading={loading}
                        signIn={handleSignIn}
                        updateFormState={updateForm} 
                        changeToSignUp={() => handleChangeForm('signUp')} 
                        changeToForgot={() => handleChangeForm('forgotPassword')} 
                    />
                )
            case 'forgotPassword':
                return (
                    <ForgotPassword 
                        loading={loading}
                        updateFormState={updateForm} 
                        forgotPassword={handleForgotPassword}
                        changeToSignIn={() => shandleChangeForm('signIn')} 
                    />
                )
            default:
                return null
        }
    }

    return (
        <div className="w-10/12 lg:w-2/5 min-h-400 p-8 rounded-md shadow-lg flex flex-col justify-center items-center">
            {renderForm()}
            { error && <div className="w-10/12 mt-3 p-4 bg-gray-200 rounded-md text-center">
                <h6 className="text-red-500">{error.message}</h6>
            </div>}
        </div>
    )
}

