import { useState } from "react"
import { useAuth } from "../../hooks/user"
import { SignUp } from "../SignUp/SignUp"
import { SignIn } from "../SignIn/SignIn"


const initialState = {
    username: '', 
    password: '', 
    email: '', 
    confirmationCode: ''
}

export const Form = () => {
    const [state, setState] = useState(initialState)
    const [formType, setFormType] = useState('signIn')
    const { signUp, signIn} = useAuth()

    const updateForm = (event) => {
        const {name, value} = event.target
        setState({...state, [name]: value})
    }

    const renderForm = () => {
        switch(formType) {
            case 'signUp': 
                return <SignUp updateFormState={updateForm} signUp={() => signUp(state)}/>
            case 'signIn':
                return <SignIn updateFormState={updateForm} signIn={() => signIn(state)}/>
            default:
                return null
        }
    }

    return (
        <div>
            {renderForm()}
        </div>
    )
}

