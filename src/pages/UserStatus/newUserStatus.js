import React, { useContext } from "react";
import "./newUserStatus.css"
import Button from "../../components/Button/button";
import useRenderCount from "../../renderCountHook"
import apiRequest from "../../api";
import ToastContext from "../../Context/toastContext";

const NewUserStatus = props => {
   useRenderCount("New User Status")
   const { setMessage } = useContext(ToastContext);
   let message = <p className="success-msg">A message with a confirmation link has been sent to your email address.<small>Please open the link to activate your account.</small></p>
   if (props.history.location.state) {
      message = <p className="success-msg">{props.history.location.state.message}</p>
   }
   ///////////////////////////////////////////////////
   const resendConfirmation = async () => {
      const response = await apiRequest('resend_confirmation', "PUT", undefined, setMessage);
      if (response) {
         setMessage({ head: "Message", body: "Instructions were resent to your email id" })
      }
   };
   ///////////////////////////////////////////////////
   return (
      <div className="userStatus-body" id="userStatus-body">
         <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
               <div className="col-12">
                  {message}
                  <div className="col-12">
                     <Button btnClick={resendConfirmation} title="Resend Confirmation" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default NewUserStatus