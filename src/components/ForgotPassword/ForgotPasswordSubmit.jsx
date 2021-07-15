import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

export const ForgotPasswordSubmit = (props) => {
    return (
      <div className="flex w-5/6 flex-col  justify-center items-center">
         <div className="w-full py-3 text-center">
              <img 
                className="mx-auto h-12 w-auto mb-4" 
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" 
                alt="Workflow" 
              />
              <h2 className="font-extrabold text-3xl">Enter the verification code</h2>
              <h6>You didn´t recieve the <span className="text-indigo-600 cursor-pointer" onClick={changeToSignIn}>verification code</span>?</h6>
        </div>
        <form className="w-full py-3 flex flex-col">
          <Input  
            name="confirmationCode"
            label="Confirmation Code"
            handleChange={(e) => { e.persist(); updateFormState(e)}}
          />
          <Input  
            name="password"
            label="Password"
            type="password"
            handleChange={(e) => { e.persist(); updateFormState(e)}}
          />
          <Button 
            onClick={props.forgotPasswordSubmit} 
            title="Save new password" 
          />
        </form>
      </div>
    )  
}