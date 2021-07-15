import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export const ForgotPassword = ({forgotPassword, changeToSignIn, updateFormState}) => {
  return (
    <div className="flex w-5/6 flex-col  justify-center items-center">
        <div className="w-full py-3 text-center">
              <img className="mx-auto h-12 w-auto mb-4" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
              <h2 className="font-extrabold text-3xl">Enter your email</h2>
              <h6>Or return to <span className="text-indigo-600 cursor-pointer" onClick={changeToSignIn}>Sign In</span></h6>
        </div>
        <form className="w-full py-3 flex flex-col ">
            <Input
              label="Username"
              name='username'
              onChange={e => {e.persist(); updateFormState(e)}}
            />
            <Button 
              title="Reset password" 
              onClick={forgotPassword}
            />
        </form>
    </div>
) }
