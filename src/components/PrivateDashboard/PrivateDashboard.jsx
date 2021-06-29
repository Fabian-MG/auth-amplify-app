import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

const PrivateDashboard = () => {
    const history = useHistory()
    const location = useLocation()
    
    useEffect(() => {

    })

    return ( 
        <div>
            <h1>Protected Route</h1>
        </div>
     );
}
 
export default PrivateDashboard;