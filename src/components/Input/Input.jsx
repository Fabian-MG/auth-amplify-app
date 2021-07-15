import React from 'react'

export const Input = ({label, name, type = 'text', handleChange, required = false}) => {

    const renderInput = () => {
        switch(type) {
            case 'checkbox':
                return <CheckboxField label={label} name={name} handleChange={handleChange} required={required}/>
            case 'password':
            case 'email':
            case 'text':
                return <TextField label={label} name={name} type={type} handleChange={handleChange} required={required}/>
        }
    } 

    return renderInput()
}

const TextField = ({label, name, type, handleChange, required}) => (
    <>
        <label className="mt-4">{label}</label>
        <input
            className="mt-1 h-8 pl-2 text-gray-500 border rounded-md border-gray-300"
            type={type}
            name={name}
            onChange={handleChange}
            required={required}
        />
    </>
)

const CheckboxField = ({label, name, handleChange, required}) => (
    <div className="flex items-center justify-center w-max">
        <input
            className="h-8 pl-2 mr-2 text-gray-500 border rounded-md border-gray-300"
            type="checkbox"
            name={name}
            onChange={handleChange}
            required={required}
        />
        <label >{label}</label>
    </div>
)