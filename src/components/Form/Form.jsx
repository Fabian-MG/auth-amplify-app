import { useState } from "react"

const initialState = {
    username: '', 
    password: '', 
    email: '', 
    confirmationCode: ''
}

export const Form = () => {
    const [state, setState] = useState(initialState)
    const [formType, setFormType] = useState('signIn')

    return (
        <div>
            
        </div>
    )
}

