import React, { useState } from "react";
import useRenderCount from "../../renderCountHook";
import Modal from "../../components/Modal/modal";
import "./dropdown.css";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

const DropDown = ({ list, onChange, ddclassName, disabled, carColor, setCarColor, image }) => {
   useRenderCount("DROP_DOWN")
   let title = "Make"
   switch (ddclassName) {
      case "box-0":
         title = "Year"
         break;
      case "box-2":
         title = "Model"
         break;
      case "box-3":
         title = "Style"
         break;
      case "box-4":
         title = "Color"
         break;
      case "box-5":
         title = "Title"
         break;
      case "box-6":
         title = "Approver"
         break;
      case "box-7":
         title = "Type"
         break;
      case "box-8":
         title = "Video"
         break;
      default:
         title = "Make"
   }
   const ddClass = "box col-12 " + ddclassName;
   ////////////////////////////////////////////////////////
   const [showImgModal, setshowImgModal] = useState(false);
   ///////////////////////////////////////////////////////
   const handleCarColor = (color) => {
      setshowImgModal(false);
      setCarColor(color)
   }
   //////////////////////////////////////////////////////
   const renderSelectOption = () => {
      if (!image) {
         return (
            <select onChange={onChange} disabled={disabled}>
               <option value={0}>Choose {title}</option>
               {list.map(e => {
                  return (
                     <option value={JSON.stringify(e)} key={e.id} >
                        {e.name}
                     </option>
                  )
               })}
            </select>
         )
      } else {
         return (
            <div className="carImgColor-wrapper">
               {carColor ?
                  null :
                  <div className="carImgColor"
                     onClick={disabled ? undefined : (() => setshowImgModal(true))}
                     style={{ backgroundColor: !disabled ? '#C42532' : 'transparent', boxShadow: !disabled ? 'none' : '0px 0px 7px 1px rgb(196,37,50)' }} >
                     <p className="m-0">Choose Color</p>
                  </div>
               }

               {!disabled && showImgModal &&
                  <Modal show={showImgModal} handleClose={() => setshowImgModal(false)} >
                     <Slider direction="horizontal">
                        {list.map(e => (
                           <div key={e.id} className="slider" onChange={onChange}>
                              <img alt="" src={e.avatar} className="slider-img" onClick={() => handleCarColor(e)} />
                           </div>
                        ))}
                     </Slider>
                  </Modal>
               }
            </div>
         )
      }
   }
   return (
      <div className={ddClass}>
         {renderSelectOption()}
      </div>
   )
};

export default DropDown