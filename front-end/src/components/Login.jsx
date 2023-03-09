import React, { useState } from 'react';
// import LoggedIn from './LoggedIn';
// import LoggedOut from './LoggedOut';
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import './styles/Login.css'
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import Todo from './Todo';
import { useNavigate } from 'react-router-dom';


const clientId = "926518660554-0re23c9bvdcclmshk1oo9rhlomum7ldo.apps.googleusercontent.com"


function Login() {
  const navigate = useNavigate()
  const [showloginButton, setShowloginButton] = useState(false)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    function start() {
      gapi.client.init({
        client_Id: clientId,
        scope: ""
      })
    }
    gapi.load('client:auth2', start)
  }, [])


  const onSuccess = (res) => {
    setUserData(res.profileObj)
    setShowloginButton(false)
  }

  const onFailure = (res) => {
    console.log("Login Failed!: ", res);
  }
  const onLogoutSuccess = (res) => {
    console.clear()
    setShowloginButton(true)
  }

  return (
    <div className='g-signin'>

      {
        showloginButton ?
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
          // isSignedIn={true}
          />
          :
          <>
            {navigate('/todo', {
              state: { "Login": "<GoogleLogout clientId={clientId} buttonText='Logout' onLogoutSuccess={onLogoutSuccess}/>",
                       "Data" : userData }
            })
            }

          </>
      }
    </div>
  );
}
export default Login;