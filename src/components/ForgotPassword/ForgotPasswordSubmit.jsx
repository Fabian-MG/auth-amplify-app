import { Button } from "../Button/Button";

export const ForgotPassword = (props) => {
    return (
      <div >
        <input
          name='username'
          placeholder='Username'
          onChange={e => {e.persist();props.updateFormState(e)}}
        />
        <Button onClick={props.forgotPassword} title="Reset password" />
      </div>
) }


export const ForgotPasswordSubmit = (props) => {
    return (
      <div>
        <input
          name='confirmationCode'
          placeholder='Confirmation code'
          onChange={e => {e.persist();props.updateFormState(e)}}
        /> <input
          name='password'
          placeholder='New password'
          type='password'
          onChange={e => {e.persist();props.updateFormState(e)}}
        />
        <Button onClick={props.forgotPasswordSubmit} title="Save new password" />
      </div>
)  }