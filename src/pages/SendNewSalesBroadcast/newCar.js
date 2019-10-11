import React, { useState, useRef } from "react";
import useRenderCount from "../../renderCountHook";
import DropDown from "../../components/DropDown/dropdown";
import { filterArray } from "../../utility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/button";


const NewCar = ({carMakeList, isEdit}) => {
   useRenderCount("SELECT VEHICLE--NEW CAR")
   const [carMake, setCarMake] = useState();
   const [carModel, setCarModel] = useState();
   const [carStyle, setCarStyle] = useState();
   const [carColor, setCarColor] = useState();
   const [carCount, setCarCount] = useState(1);
   let latestList = useRef([]);
   ////////////////////////////////////////////////////////////////////////
   const getArray = (list, key, setType) => {
      if (key) {
         const arr = filterArray(list, key.id, setType);
         latestList.current = arr;
         return arr
      }
      return []
   };
   ////////////////////////////////////////////////////////////////////////
   const isDisabled = (val) => ((val === 0) || (!val));
   ////////////////////////////////////////////////////////////////////////
   const handleSuffix = () => {
      let suffix = "th";
      if (carCount === 1) {
         suffix = "st";
      } else if (carCount === 2) {
         suffix = "nd";
      } else if (carCount === 3) {
         suffix = "rd";
      }
      return suffix
   }
   ////////////////////////////////////////////////////////////////////////
   const handleCarCount = () => {
      if (carCount > 1) {
         setCarCount(carCount - 1)
      }
   }
   ////////////////////////////////////////////////////////////////////////
   return (
      <div className="selVeh">
         <div className="ddList">
            <div className="h-100 justify-content-center align-items-center">
               <div className="">
                  <DropDown ddclassName="box-1" list={carMakeList}
                     onChange={e => {
                        setCarMake(JSON.parse(e.target.value));
                        setCarModel(null)
                        setCarStyle(null)
                        setCarColor(null)
                     }}
                  />
                  <DropDown ddclassName="box-2" list={getArray(carMakeList, carMake, "car_models")}
                     onChange={e => {
                        setCarModel(JSON.parse(e.target.value))
                        setCarStyle(null)
                        setCarColor(null)
                     }}
                     disabled={isDisabled(carMake)}
                  />
                  <DropDown ddclassName="box-3" list={getArray(latestList.current, carModel, "car_styles")}
                     onChange={e => {
                        setCarStyle(JSON.parse(e.target.value))
                        setCarColor(null)
                     }}
                     disabled={isDisabled(carModel)}
                  />
                  <DropDown ddclassName="box-4" list={getArray(latestList.current, carStyle, "car_colors")}
                     disabled={isDisabled(carStyle)}
                     carColor={carColor}
                     setCarColor={setCarColor}
                     image={true}
                  />
               </div>
            </div>
         </div>
         {
            carColor &&
            <div className="row car-image text-center mb-4">
               <div className="col-12">
                  <div className="vehicle-img">
                     <img src={carColor.avatar} alt="carImage" />
                  </div>
               </div>
            </div>
         }
         <div className="row justify-content-center align-items-center mb-4 mt-4">
            <button type="button" className="btn-circle btn-outline" onClick={handleCarCount}>
               <FontAwesomeIcon icon={faMinus} />
            </button>
            <button type="button" className="btn-circle btn-outline" onClick={() => setCarCount(carCount + 1)}>
               <FontAwesomeIcon icon={faPlus} />
            </button>
         </div>
         <div className="row justify-content-center align-items-center mb-4 carCount">
            <p className="m-0 p-2">{`This is their ${carCount}${handleSuffix()} ${carMake ? carMake.name : "____"} !`}</p>
         </div>
         {carColor && <Button to="/optionalPhoto" navData={{ carMake, carModel, carStyle, carColor, carCount, isEdit }} title="Next" />}
      </div>
   )
}

export default NewCar