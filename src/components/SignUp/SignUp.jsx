import React from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export const SignUp = ({ updateFormState, changeFormType, signUp, loading }) => (
  <div className="flex w-5/6 flex-col  justify-center items-center">
    <div className="w-full py-3 text-center">
      <img className="mx-auto h-12 w-auto mb-4" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
      <h2 className="font-extrabold text-3xl">Create your account</h2>
      <h6>
        Or sign in with
        <span className="text-indigo-600 cursor-pointer" onClick={changeFormType}> your credentials</span>
      </h6>
    </div>

    <form className="w-full py-3 flex flex-col" onSubmit={signUp}>
      <Input label="Username" name="username" handleChange={updateFormState} required/>
      <Input label="Password" name="password" type="password" handleChange={updateFormState} required/>
      <Input label="Email" name="email" type="email" handleChange={updateFormState} required/>
      <Button title="Sign Up" loading={loading}/>
    </form>

  </div>
);