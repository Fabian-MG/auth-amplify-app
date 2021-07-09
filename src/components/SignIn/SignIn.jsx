import { Button } from "../Button/Button";

export const SignIn = ({signIn, updateFormState}) => {
    return (
        <div>
            <input 
              name="username" 
              onChange={(e) => { e.persist(); updateFormState(e)}} 
              placeholder='username'
            />
            <input
              type='password'
              name='password'
              onChange={e => {e.persist();updateFormState(e)}}
              placeholder='password'
            />
            <Button onClick={signIn} title="Sign In" />
        </div>
    )
}
