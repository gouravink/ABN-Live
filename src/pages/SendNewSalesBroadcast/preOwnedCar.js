import React, { useState, Fragment } from "react";
import useRenderCount from "../../renderCountHook";
import DropDown from "../../components/DropDown/dropdown";
import TextInput from "../../components/TextInput/textInput";
import Button from "../../components/Button/button";

const PreOwnedCar = ({ usedCarYearList, usedCarMakeList }) => {
   useRenderCount("SELECT VEHICLE--PRE_OWNED")
   const [carYear, setCarYear] = useState();
   const [carMake, setCarMake] = useState();
   const [carModel, setCarModel] = useState();
   const [carStyle, setCarStyle] = useState();
   ////////////////////////////////////////////////////////////////////////
   return (
      <Fragment>
         <div className="ddList">
            <div className="h-100 justify-content-center align-items-center">
               <div className="">
                  <DropDown ddclassName="box-0" list={usedCarYearList}
                     onChange={e => {
                        setCarYear(JSON.parse(e.target.value));
                        setCarMake(null)
                     }}
                  />
                  <DropDown ddclassName="box-1" list={usedCarMakeList}
                     onChange={e => {
                        setCarMake(JSON.parse(e.target.value));
                     }}
                  />
                  <TextInput name="model" title="Enter Model" type="text"
                     value={carModel}
                     onChange={(e) => setCarModel(e.target.value)}
                  />
                  <TextInput name="style" title="Enter Style" type="text"
                     value={carStyle}
                     onChange={(e) => setCarStyle(e.target.value)}
                  />
               </div>
            </div>
         </div>
         {carStyle && <Button to="/optionalPhoto" navData={{ carMake, carYear, carModel, carStyle }} title="Next" />}
      </Fragment>
   )
}

export default PreOwnedCar