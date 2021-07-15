import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

export const SignIn = ({signIn, changeToSignUp, changeToForgot, updateFormState, loading}) => {
    return (
        <div className="flex w-5/6 flex-col  justify-center items-center">
            <div className="w-full py-3 text-center">
              <img className="mx-auto h-12 w-auto mb-4" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
              <h2 className="font-extrabold text-3xl">Sign in to your account</h2>
              <h6>Or create a <span className="text-indigo-600 cursor-pointer" onClick={changeToSignUp}>new account</span></h6>
            </div>

            <div className="w-full my-3 py-1">
              Sign in with
              <div className="w-full mt-1 flex justify-between">
                <div className="cursor-pointer p-2 w-3/12 border rounded-md border-gray-300 flex justify-center">
                  <FontAwesomeIcon icon={["fab", "facebook-f"]} color="gray" />
                </div>
                <div className="cursor-pointer p-2 w-3/12 border rounded-md border-gray-300 flex justify-center red">
                  <FontAwesomeIcon icon={["fab", "twitter"]} color="gray"/>
                </div>
                <div className="cursor-pointer p-2 w-3/12 border rounded-md border-gray-300 flex justify-center">
                  <FontAwesomeIcon icon={["fab", "github"]} color="gray"/>
                </div>
              </div>
            </div>

            <div className="w-full pt-3 flex justify-between items-center">
              <div className="border-t w-3/12 h-0 border-gray-300"></div>
              <span className="text-gray-400 text-md">Or continue with</span>
              <div className="border-t w-3/12 h-0 border-gray-300"></div>
            </div>

            <form className="w-full py-1 flex flex-col" onSubmit={signIn}>
              <Input label='Username' name="username" required handleChange={(e) => { e.persist(); updateFormState(e)}} />
              <Input label='Password' name="password" required type="password" handleChange={(e) => { e.persist(); updateFormState(e)}} />
              <div className="flex justify-between items-center mt-3">
                <Input label='Remember me' name="remember" type="checkbox"/>
                <span className="cursor-pointer text-indigo-600 font-medium" onClick={changeToForgot}>
                  Forgot your password?
                </span>
              </div>
              <Button title="Sign In" loading={loading}/>
            </form>
            
        </div>
    )
}
