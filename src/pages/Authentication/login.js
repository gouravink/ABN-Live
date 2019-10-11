import React, { useContext, useState } from "react";
import TextInput from "../../components/TextInput/textInput";
import Button from "../../components/Button/button";
import ToastContext from "../../Context/toastContext";
import apiRequest from "../../api";
import { withRouter } from "react-router";
import ForgotPassword from "../../components/ForgotPassword/forgotPassword";

const LogIn = ({ email, askEmail, setShowLoader, location, history }) => {
   const [password, setPassword] = useState('');
   const { setMessage } = useContext(ToastContext);
   /////////////////////////////////////////////////////////////////////////////
   const { from } = location.state || { from: { pathname: "/dashboard" } };
   /////////////////////////////////////////////////////////////////////////////
   const validateForm = () => {
      let valid = true;
      if (!password.trim()) {
         valid = false;
         setMessage("Enter Password")
      }
      return valid;
   };
   /////////////////////////////////////////////////////////////////////////////
   const doLogIn = async () => {
      const validForm = validateForm();
      if (validForm) {
         setShowLoader(true);
         const body = {
            "email": email,
            "password": password
         };
         const response = await apiRequest("sign_in", "POST", body, setMessage);
         setShowLoader(false);
         if (response) {
            if (response.error) {
               history.replace("/newUserStatus", { message: response.responseObject.error[0] })
            } else {
               localStorage.setItem("authenticated", JSON.stringify(response))
               setShowLoader(false)
               history.replace(from.pathname)
            }
         }
      }
   };
   /////////////////////////////////////////////////////////////////////////////
   return (
      <div className="row h-100 justify-content-center align-items-center login-inner">
         <div className="col-12">
            <TextInput name="user-password" title="Enter Your Password" type="password"
               value={password}
               onChange={(e) => {
                  setMessage(false)
                  setPassword(e.target.value)
               }}
            />
            <div className="col-12">
               <Button title="Sign In" btnClick={doLogIn} />
               <ForgotPassword email={email} />
            </div>
            <div className="password-info">
               <div className="pass-info-up">
                  <p>Password For -  </p><p></p><span>{email}</span>
                  <Button btnClick={askEmail} title="Not this email Id?" btnClass="for-pass text-center not-email" />
               </div>
            </div>
         </div>
      </div>
   )
}

export default withRouter(LogIn)