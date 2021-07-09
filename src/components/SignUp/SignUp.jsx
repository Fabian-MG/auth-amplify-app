import React from 'react'
import { Button } from '../Button/Button';

export const SignUp = ({ updateFormState, signUp }) => {
    return (
        <div >
          <input
            name='username'
            onChange={e => {e.persist();updateFormState(e)}}
            placeholder='username'  
          /> <input
            type='password'
            name='password'
            onChange={e => {e.persist();updateFormState(e)}}
            placeholder='password'  
          /> <input
            name='email'
            onChange={e => {e.persist();updateFormState(e)}}
            placeholder='email'
          />
          <Button onClick={signUp} title="Sign Up" />
        </div>
) }