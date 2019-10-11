import React, { useState, Fragment, useEffect, useContext } from "react";
import Button from "../../components/Button/button";
import Modal from "../../components/Modal/modal";
import TextInput from "../../components/TextInput/textInput";
import { validateEmail } from "../../utility"
import ToastContext from "../../Context/toastContext";
import apiRequest from "../../api";

const isLoggedIn = () => localStorage.getItem("authenticated");
const ForgotPassword = props => {
   const [showModal, setShowModal] = useState(false);
   const [userEmail, setUserEmail] = useState("");
   const { setMessage } = useContext(ToastContext);
   ////////////////////////////////////////////////////////////////////////
   const resetPassword = async () => {
      setShowModal(false)
      const body = {
         "email": userEmail
      }
      const response = await apiRequest('reset_password', 'PUT', body, setMessage);
      if (response) {
         setMessage({ head: "Message", body: "Password change email sent to the email id" })
      }
   };
   ////////////////////////////////////////////////////////////////////////
   useEffect(() => setUserEmail(props.email), [props.email])
   ////////////////////////////////////////////////////////////////////////
   return (
      <Fragment>
         {
            !isLoggedIn() && <Button title="Forgot Password?" btnClass="for-pass"
               btnClick={() => setShowModal(true)} />
         }
         {showModal &&
            <Modal show={showModal} handleClose={() => setShowModal(false)}>
               <TextInput name="email" title="Enter your email id"
                  type="email" style={{ color: "#C42532" }}
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
               />
               <Button disabled={!validateEmail(userEmail)} btnClick={resetPassword} title="Submit" />
            </Modal>
         }
      </Fragment>
   )
}

export default ForgotPassword