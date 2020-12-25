import './App.css';
import React from 'react';

import {AmplifyAuthenticator, AmplifyForgotPassword, AmplifySignIn, AmplifySignOut,AmplifySignUp} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import TaskFetch from './Components/TaskFetch';


const App = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
      onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          setUser(authData)
          console.log(authData)
      });
  }, []);


  return authState === AuthState.SignedIn && user ? (
    <div className="App">
        <div>Hello, {user.username}</div>
        {/* <div>Email, {user.attributes.email} </div> */}
        {/* <small>JWT↓ {user.signInUserSession.accessToken.jwtToken}</small> */}
        <AmplifySignOut />
        <TaskFetch />
    </div>
  ) : (
    <AmplifyAuthenticator>
       <AmplifySignUp
           slot="sign-up"
           validationErrors='すでに'
           formFields={[
             { type: "username" },
             { type: "password" },
             { type: "email" }
           ]}
        />
        <AmplifySignIn
          headerText="Cognitoへサインイン"
          slot="sign-in"
        />
        <AmplifyForgotPassword
          headerText="パスワードの再設定"
          slot="forgot-password"
        />
       </AmplifyAuthenticator>
  )
}



export default App;