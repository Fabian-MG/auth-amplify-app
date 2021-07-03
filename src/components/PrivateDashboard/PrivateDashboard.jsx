import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const PrivateDashboard = () => {
    const history = useHistory()
    
    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .catch(() => {
                history.push('/profile')
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return ( 
        <div>
            <h1>Protected Route</h1>
        </div>
     );
}
 
export default PrivateDashboard;