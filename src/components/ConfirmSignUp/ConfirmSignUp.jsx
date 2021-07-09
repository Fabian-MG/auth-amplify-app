import React from 'react'
import { Button } from '../Button/Button';

export const ConfirmSignUp = (props) => {
    return (
        <div >
          <input
           name='confirmationCode'
           placeholder='Confirmation Code'
           onChange={e => {e.persist();props.updateFormState(e)}}
          />
          <Button onClick={props.confirmSignUp} title="Confirm Sign Up" />
       </div>
    )
}