import React, { useState, Fragment, useContext } from 'react'
import './support.css'
import Navigation from '../../components/Navigation/navigation'
import usersImage from '../../Assets/users (2).svg';
import profileImage from '../../Assets/user (3).svg';
import accountStatusImage from '../../Assets/flag.svg';
import pptvImage from '../../Assets/television.svg';
import logoutImage from '../../Assets/power-button.svg';
import resetPasswordImage from '../../Assets/key.svg';
import infoImage from '../../Assets/worldwide.svg';
import Modal from "../../components/Modal/modal";
import apiRequest from "../../api";
import ToastContext from "../../Context/toastContext";
import Loader from "../../components/Loader/loader"


const Support = props => {
   const [showModal, setShowModal] = useState(false);
   const [showLoader, setShowLoader] = useState(false);
   const { setMessage } = useContext(ToastContext);
   const user = JSON.parse(localStorage.getItem("authenticated"));
   //////////////////////////////////////////////////////////////////
   const resetPassword = async () => {
      const body = {
         "email": user.email
      }
      const response = await apiRequest('reset_password', 'PUT', body, setMessage);
      if (response) {
         setMessage({ head: "Message", body: "Password change email sent to the email id" })
      }
   }
   //////////////////////////////////////////////////////////////////
   const checkAccountStatus = async () => {
      setShowLoader(true)
      const response = await apiRequest(`accounts/${user.account_id}`, undefined, undefined, setMessage);
      setShowLoader(false)
      if (response.account_up) {
         setMessage({ head: "Account Status", body: "The Account network is up and running" })
      } else {
         setMessage({ head: "Account Status", body: "The Account network is not running" })
      }
   }
   //////////////////////////////////////////////////////////////////
   const logOut = () => {
      localStorage.removeItem("authenticated");
      props.history.replace("/")
   }
   //////////////////////////////////////////////////////////////////
   return (
      <Fragment>
         {
            showModal &&
            <Modal show={showModal} handleClose={() => setShowModal(false)}>
               <p className="reset-pass">Password change email sent to the email id</p>
            </Modal>
         }
         {showLoader && <Loader />}
         <div className="support-body pad-btm">
            <div className="grid">
               <Navigation src={usersImage} alt="Show Users" to="/users" title="Show Users" />
               <Navigation src={profileImage} alt="My Profile" to="/myProfile" title="My Profile" />
               <Navigation src={accountStatusImage} alt="Account Status" to="#" title="Account Status" onClick={checkAccountStatus} />
               <Navigation src={pptvImage} alt="PPTV" to="#" title="PPTV" />
               <Navigation src={infoImage} alt="ABN Info" to="/about" title="ABN Info" />
               <Navigation src={resetPasswordImage} alt="Reset Password" to="#" title="Reset Password" onClick={resetPassword} />
            </div>
            <div className="grid-2">
               <Navigation src={logoutImage} alt="Logout" to="#" title="Logout" onClick={logOut} />
            </div>
         </div>
      </Fragment>
   )
}

export default Support