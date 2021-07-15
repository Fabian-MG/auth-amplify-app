import React from 'react'
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export const ConfirmSignUp = ({updateFormState, changeToSignUp, confirmSignUp, loading}) => {
    return (
        <div className="flex w-5/6 flex-col  justify-center items-center">
          <div className="w-full py-3 text-center">
              <img className="mx-auto h-12 w-auto mb-4" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
              <h2 className="font-extrabold text-3xl">Enter your verification code</h2>
              <h6>You didn´t receive your <span className="text-indigo-600 cursor-pointer" onClick={changeToSignUp}>verification code</span>?</h6>
          </div>
          <form className="w-full py-3 flex flex-col" onSubmit={confirmSignUp}>
            <Input 
                label='Confirmation Code' 
                name="confirmationCode" 
                handleChange={(e) => { e.persist(); updateFormState(e)}}
            />
            <Button title="Confirm Sign Up" loading={loading}/>
          </form>
       </div>
    )
}