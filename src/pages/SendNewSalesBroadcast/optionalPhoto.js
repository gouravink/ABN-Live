import React, { useState } from 'react';
import './optionalPhoto.css'
import Button from "../../components/Button/button";
import ImgModal from "../../components/Modal/imgModal";


const OptionalPhoto = (props) => {
   const [cameraImg, setCameraImg] = useState();
   const navData = { ...props.location.state };
   if (cameraImg) {
      navData["cameraImg"] = cameraImg;
   }
   return (
      <div className="oprtionalPhoto-wrapper">
         <div className="optPhoto-btn choose-photo">
            <div className="optionalPhoto"
               style={{ backgroundColor: '#C42532', boxShadow: '0px 0px 7px 1px rgb(196,37,50)' }} >
               <label> Choose Photo
               <input type="file" accept="image/*" size="60" capture="camera"
                     onChange={(e) => {
                        let reader = new FileReader();
                        let file = e.target.files[0];
                        reader.readAsDataURL(file)
                        reader.onloadend = () => setCameraImg(reader.result)
                     }}
                  />
               </label>
            </div>
         </div>
         {props.location.state.carColor &&
            <div className="optPhoto-btn skip-btn">
               <Button to="/enterData" title="Skip" navData={props.location.state} style={{ width: '70% !important' }} />
            </div>
         }

         {cameraImg &&
            <div className="showImg">
               <img src={cameraImg} alt="choose-img" />
               <Button navData={navData} to="/enterData" title="Next" />
            </div>
         }
      </div>
   )
}

export default OptionalPhoto