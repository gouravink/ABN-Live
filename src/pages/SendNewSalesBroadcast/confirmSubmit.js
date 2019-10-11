import React, { useState, useContext } from "react";
import "./confirmSubmit.css";
import useRenderCount from "../../renderCountHook"
import Button from "../../components/Button/button";
import Loader from "../../components/Loader/loader";
import ToastContext from "../../Context/toastContext";
import apiRequest from "../../api";

const ConfirmSubmit = (props) => {
   useRenderCount("Confirm & Submit")
   const [showLoader, setShowLoader] = useState(false);
   const { setMessage } = useContext(ToastContext);
   const user = JSON.parse(localStorage.getItem("authenticated"));
   const { carMake, carModel, carStyle, carColor, carCount, carYear, cameraImg, customerTitle, customerLastName, approver, emails, phones, isEdit } = props.location.state;
   ////////////////////////////////////////////////////////////////////
   const submit = async (submitted) => {
      setShowLoader(true)
      const body = {
         "customer_name": customerLastName,
         "approver_id": approver ? approver.id : null,
         "customer_title_id": customerTitle ? customerTitle.id : null,
         "share_email_addresses": emails,
         "share_phone_numbers": phones,
         "photo_url": "https://imgd.aeplcdn.com/600x337/cw/ec/19796/Audi-A6-Right-Front-Three-Quarter-165485.jpg?wm=0",
         "used_year": null,
         "used_make": null,
         "used_model": null,
         "used_style": null,
         // "channel_id": "",//Int(optional) GET /delivery_bay_channels
         "submitted": submitted
      };
      if (carYear) {
         body["used_year"] = carYear.id;
         body["used_make"] = carMake.id;
         body["used_model"] = carModel;
         body["used_style"] = carStyle;
      } else {
         body["car_count"] = carCount;
         body["car_color_id"] = carColor.id;
      }
      if ("geolocation" in navigator) {
         navigator.geolocation.getCurrentPosition(function (position) {
            body["longitude"] = position.coords.longitude;
            body["latitude"] = position.coords.latitude;
         });
      }
      const apiUrl = isEdit ? `posts/${isEdit}` : `posts`;
      const apiMethod = isEdit ? 'PUT' : 'POST';
      const response = await apiRequest(apiUrl, apiMethod, body, setMessage);
      setShowLoader(false)
      if (response) {
         setMessage({ head: "Message", body: `${isEdit ? 'Post has been updated' : 'Post has been created'}` });
         isEdit ? props.history.replace("/history") : props.history.replace("/dashboard")
      }
   };
   ////////////////////////////////////////////////////////////////////
   return (
      <div id="container" className="container confirmSubmit-body">
         <div className="confirmSubmit">
            <div className="banner">
               <div className="showImg">
                  <img src={cameraImg ? cameraImg : carColor.avatar} alt="vehicle-img" />
               </div>
            </div>
            <div className="title p-2"> <p className="actions text-center p-0">
               {`Congratulations ${customerTitle.name} ${customerLastName} on the purchase of your ${carMake.name}`} {carModel ? carModel.name : ""} {carStyle ? carStyle.name : ""}
            </p></div>
            <div className="actions text-center p-0">
               <p className="actions text-center p-2">
                  {`Posted by ${user.first_name} ${user.last_name}, to be approved by ${approver.name}`}
               </p>
            </div>
            <Button btnClick={() => submit(true)} title="Submit for Approval" />
            <Button btnClick={() => submit(false)} title="Save for Later" />
         </div>
         {showLoader && <Loader />}
      </div>
   )
}

export default ConfirmSubmit;