import { useEffect, useState } from "react";

import { Auth } from "aws-amplify";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";

const Profile = () => {
    const [user, setUser] = useState({})

    const checkUser = async () => {
        try {
            const data = await Auth.currentAuthenticatedUser()
            const userInfo = { username: data.username, ...data.attributes }
            setUser(userInfo)
        } catch(err) {
            console.log('error: ', err)
        }
    } 

    useEffect(() => {
        checkUser()
    }, [])

    return ( 
        <div>
            <h1>Profile</h1>
            <h2>Username: {user.username}</h2>
            <h3>Email: {user.email}</h3>
            <h4>Phone: {user.phone_number}</h4>
            <AmplifySignOut />        
        </div>
     );
}
 
export default withAuthenticator(Profile);