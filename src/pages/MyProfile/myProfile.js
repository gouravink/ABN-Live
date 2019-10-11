import React, { useState, useContext, useRef } from 'react'
import "./myProfile.css"
import singleUserImage from "../../Assets/single-user.svg"
import TextInput from "../../components/TextInput/textInput"
import Button from "../../components/Button/button";
import apiRequest from "../../api";
import Loader from "../../components/Loader/loader"
import ToastContext from "../../Context/toastContext";
import { withRouter } from "react-router";

const MyProfile = (location, history) => {
   const [showLoader, setShowLoader] = useState(false);
   const { setMessage } = useContext(ToastContext);
   const user = JSON.parse(localStorage.getItem("authenticated"));
   const first_name = useRef();
   const last_name = useRef();
   const retention_days = useRef();
   ////////////////////////////////////////////////////////////////////////////////
   const updateUser = async () => {
      setShowLoader(true)
      const body = {
         "first_name": first_name.current.value,
         "last_name": last_name.current.value,
         "history_retention_days": retention_days.current.value
      };
      const response = await apiRequest(`users/${user.id}`, "PUT", body, setMessage);
      setShowLoader(false)
      if (response) {
         user["first_name"] = first_name.current.value;
         user["last_name"] = last_name.current.value;
         user["history_retention_days"] = retention_days.current.value;
         localStorage.setItem("authenticated", JSON.stringify(user))
         setShowLoader(false)
         setMessage({ head: "Message", body: "User has been saved" });
      }
   };
   ////////////////////////////////////////////////////////////////////////////////
   return (
      <div id="container" className="container myProfile-body">
         <div className="post">
            <div className="profile-logo">
               <img src={singleUserImage} alt="user-img" />
            </div>
            <h2 className="name m-4">{user.email}</h2>
            <div className="actions">
               <div className="follow-info">
                  <TextInput name=""
                     defaultValue={user.first_name}
                     title="Enetr your first name"
                     type="text"
                     ref={first_name}
                  />
                  <TextInput name=""
                     defaultValue={user.last_name}
                     title="Enetr your last name"
                     type="text"
                     ref={last_name}
                  />
                  <TextInput name=""
                     title="Post History Retention Days"
                     defaultValue={user.history_retention_days}
                     type="number"
                     ref={retention_days}
                  />
               </div>
               <div className="follow-btn text-center">
                  <Button title="Save" btnClick={updateUser} />
               </div>
            </div>
         </div>
         {showLoader && <Loader />}
      </div>
   )
}

export default withRouter(MyProfile)