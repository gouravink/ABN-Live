import React, { useEffect, useState, useContext, Fragment } from "react";
import "./selectVehicle.css";
import ToastContext from "../../Context/toastContext"
import useRenderCount from "../../renderCountHook";
import Tab from 'react-cool-tabs';
import NewCar from "./newCar";
import PreOwnedCar from "./preOwnedCar";
import Loader from "../../components/Loader/loader";
import apiRequest from "../../api";

const SelectVehicle = props => {
   useRenderCount("SELECT VEHICLE")
   const [carMakeList, setCarMakeList] = useState([]);
   const [usedCarYearList, setUsedCarYearList] = useState([]);
   const [usedCarMakeList, setUsedCarMakeList] = useState([]);
   const [showLoader, setShowLoader] = useState(false);
   const { setMessage } = useContext(ToastContext);
   ////////////////////////////////////////////////////////////////////////////
   useEffect(() => {
      setShowLoader(true)
      const fetchcarMakes = async () => {
         const response = await apiRequest('car_makes', undefined, undefined, setMessage);
         setShowLoader(false)
         if (response) {
            setCarMakeList(response.car_makes)
         }
      };
      fetchcarMakes()
      const fetchUsedcarYears = async () => {
         const response = await apiRequest('used_car_years', undefined, undefined, setMessage);
         setShowLoader(false)
         if (response) {
            const used_car_years = response.used_car_years.map(year => {
               return { id: year, name: year }
            })
            setUsedCarYearList(used_car_years)
         }
      };
      fetchUsedcarYears()
      const fetchUsedcarMakes = async () => {
         const response = await apiRequest('used_car_makes', undefined, undefined, setMessage);
         setShowLoader(false)
         if (response) {
            setUsedCarMakeList(response.used_car_makes)
         }
      };
      fetchUsedcarMakes()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <Fragment>
         {showLoader && <Loader />}
         <div className="select-vehicle" id="select-vehicle-body">
            <Tab
               className={'tab-wrapper'}
               style={{ marginBottom: '50px' }}
               activeTabStyle={{ background: 'transparent', color: 'white' }}
               unActiveTabStyle={{ background: 'transparent', color: '#fff' }}
               activeLeftTabBorderBottomStyle={{ height: 2, background: '#C42532' }}
               activeRightTabBorderBottomStyle={{ height: 2, background: '#C42532' }}
               tabsBorderBottomStyle={{ height: 4 }}
               leftContentStyle={{ color: 'white' }}
               rightContentStyle={{}}
               leftTabTitle={'New'}
               rightTabTitle={'Pre Owned'}
               leftContent={<NewCar carMakeList={carMakeList} isEdit={(props.location.state && props.location.state.id) ? props.location.state.id : null} />}
               rightContent={<PreOwnedCar usedCarYearList={usedCarYearList} usedCarMakeList={usedCarMakeList} isEdit={(props.location.state && props.location.state.id) ? props.location.state.id : null} />}
               contentTransitionStyle={'transform 0.3s ease-in'}
               borderTransitionStyle={'all 0.3s ease-in'} />
         </div>
      </Fragment>
   )
}

export default SelectVehicle;