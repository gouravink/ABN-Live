import React, { Fragment, useContext, useState } from "react";
import TextInput from "../../components/TextInput/textInput";
import Button from "../../components/Button/button";
import ToastContext from "../../Context/toastContext";
import apiRequest from "../../api";
import { withRouter } from "react-router";


const SignUp = ({ email, setShowLoader, askEmail, history }) => {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [dealerNum, setDealerNum] = useState('');
   const [password, setPassword] = useState('');
   const [confPassword, setConfPassword] = useState('');
   const [dealerName, setDealerName] = useState("");
   const { setMessage } = useContext(ToastContext);
   /////////////////////////////////////////////////////////////////////////////
   const verifyDealer = async () => {
      if (dealerNum) {
         setShowLoader(true);
         const response = await apiRequest(`accounts/check_dealer_number/?dealer_number=${dealerNum}`, undefined, undefined, setMessage);
         setShowLoader(false)
         if (response) {
            if (response.exists) {
               setDealerName(response.name)
            } else {
               setMessage("Dealer does not exists")
               setDealerName("")
            }
         }
      }
   };
   /////////////////////////////////////////////////////////////////////////////
   const validateForm = () => {
      let valid = true;
      if (!firstName.trim()) {
         valid = false;
         setMessage("Enter First Name")
      } else if (!lastName.trim()) {
         valid = false;
         setMessage("Enter Last Name")
      } else if (!dealerNum.trim()) {
         valid = false;
         setMessage("Enter Dealer Number")
      } else if (!password.trim()) {
         valid = false;
         setMessage("Enter Password")
      } else if (!confPassword.trim()) {
         valid = false;
         setMessage("Enter Confirm Password")
      }
      return valid;
   };
   /////////////////////////////////////////////////////////////////////////////
   const doSignUp = async () => {
      const validForm = validateForm();
      if (validForm) {
         setShowLoader(true);
         const body = {
            "first_name": firstName,
            "last_name": lastName,
            "dealer_number": dealerNum,
            "email": email,
            "password": password,
            "password_confirmation": confPassword
         };
         const response = await apiRequest("users", "POST", body, setMessage);
         setShowLoader(false);
         if (response) {
            setShowLoader(false)
            history.replace("/newUserStatus")
         }
      }
   };
   /////////////////////////////////////////////////////////////////////////////
   return (
      <Fragment>
         <div className="row h-100 justify-content-center align-items-center">
            <div className="col-12">
               <p style={{ color: '#ffffff' }}>{dealerName}</p>
               <TextInput name="first-name" title="First Name" type="text"
                  value={firstName}
                  onChange={(e) => {
                     setMessage(false)
                     setFirstName(e.target.value)
                  }}
               />
               <TextInput name="last-name" title="Last Name" type="text"
                  value={lastName}
                  onChange={(e) => {
                     setMessage(false)
                     setLastName(e.target.value)
                  }}
               />
               <TextInput name="dealer-number" title="Dealer Number" type="number"
                  value={dealerNum}
                  onChange={(e) => {
                     setMessage(false)
                     setDealerNum(e.target.value)
                  }}
                  onBlur={verifyDealer}
               />
               <TextInput name="user-password" title="Password" type="password"
                  value={password}
                  onChange={(e) => {
                     setMessage(false)
                     setPassword(e.target.value)
                  }}
               />
               <TextInput name="user-conf-password" title="Confirm Password" type="password"
                  value={confPassword}
                  onChange={(e) => {
                     setMessage(false)
                     setConfPassword(e.target.value)
                  }}
               />
               <div className="col-12">
                  <Button title="SignUp" btnClick={doSignUp} />
               </div>
               <div className="password-info">
                  <div className="pass-info-up">
                     <p>Password For - </p><span>{email}</span>
                     <Button btnClick={askEmail} title="Not this email Id?" btnClass="for-pass text-center not-email" />
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   )
}

export default withRouter(SignUp)