import { Redirect, Route } from "react-router-dom";  
import { useAuth } from "../../hooks";

export const PrivateRoute = ({Component, ...props}) => {  
  const { user: { username } } = useAuth()
  
  return (  
    <Route {...props}>
        {
         username ? (  
          <Component/>  
         ) : (  
          <Redirect to={"/profile"} />  
         )
        }
    </Route>  
  );  
};