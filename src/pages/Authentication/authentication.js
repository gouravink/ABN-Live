import React, { useState, Fragment, useContext } from "react";
import "./authentication.css"
import Button from "../../components/Button/button";
import TextInput from "../../components/TextInput/textInput"
import ForgotPassword from "../../components/ForgotPassword/forgotPassword"
import ToastContext from "../../Context/toastContext"
import useRenderCount from "../../renderCountHook"
import { validateEmail } from "../../utility"
import Loader from "../../components/Loader/loader"
import apiRequest from "../../api";
import SignUp from "./signup";
import LogIn from "./login";

const ASK_EMAIL = "ASK_EMAIL";
const SING_IN = "SING_IN";
const SIGN_UP = "SIGN_UP";

const LoginEmail = props => {
   useRenderCount("LOGIN")
   const [View, setView] = useState(ASK_EMAIL);
   const [email, setEmail] = useState("");
   const [showLoader, setShowLoader] = useState(false);
   const { setMessage } = useContext(ToastContext);
   ////////////////////////////////////////////////////////////////////////
   const askEmail = () => {
      setView(ASK_EMAIL)
      setEmail(email)
   }
   ////////////////////////////////////////////////////////////////////////
   const pokeAPI = async () => {
      setShowLoader(true)
      try {
         if (View === ASK_EMAIL) {
            const response = await apiRequest(`users/check_email?email=${email}`, undefined, undefined, setMessage);
            setShowLoader(false)
            if (response) {
               if (response.exists) {
                  setView(SING_IN)
               } else {
                  setView(SIGN_UP)
               }
            }
         }
      } catch (e) {
         setMessage(e.message)
      }
   }
   ////////////////////////////////////////////////////////////////////////
   const renderInput = () => {
      if (View === ASK_EMAIL) {
         return (
            <div className="row h-100 justify-content-center align-items-center login-inner">
               <div className="col-12">
                  <TextInput name="email" title="Enter Your Email Address" type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)} />
                  <div className="col-12">
                     {
                        <Button disabled={!validateEmail(email)} btnClick={pokeAPI} title="Submit" />
                     }
                     <ForgotPassword email={email} />
                  </div>
               </div>
            </div>
         )
      } else if (View === SING_IN) {
         return (
            <LogIn email={email} setShowLoader={setShowLoader} askEmail={askEmail} />
         )
      } else if (View === SIGN_UP) {
         return (
            <SignUp email={email} setShowLoader={setShowLoader} askEmail={askEmail} />
         )
      }
   }
   ////////////////////////////////////////////////////////////////////////
   return (
      <Fragment>
         {showLoader && <Loader />}
         <div className="login-body" id="login-body">
            <div className="container h-100">
               {renderInput()}
            </div>
         </div>
      </Fragment>

   )
}

export default LoginEmail;