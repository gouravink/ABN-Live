import React, { useEffect, useState, Fragment, useContext } from "react";
import useRenderCount from "../../renderCountHook";
import DropDown from "../../components/DropDown/dropdown";
import TextInput from "../../components/TextInput/textInput";
import Loader from "../../components/Loader/loader"
import './enterData.css'
import Button from "../../components/Button/button";
import apiRequest from "../../api";
import ToastContext from "../../Context/toastContext";
import { validateEmail, validatePhone } from "../../utility";

const EnterData = (props) => {
   useRenderCount("ENTER DATA")
   const [customerTitles, setCustomerTitles] = useState([]);
   const [customerTitle, setCustomerTitle] = useState("");
   const [customerLastName, setCustomerLastName] = useState("");
   const [emailNphone, setemailNphone] = useState("");
   const [approvers, setApprovers] = useState([]);
   const [approver, setApprover] = useState(null);
   const [showLoader, setShowLoader] = useState(false);
   const { setMessage } = useContext(ToastContext);
   ////////////////////////////////////////////////////////////////////
   const { carMake, carModel, carStyle } = props.location.state;
   ////////////////////////////////////////////////////////////////////
   useEffect(() => {
      setShowLoader(true)
      const fetchTitles = async () => {
         const response = await apiRequest('customer_titles', undefined, undefined, setMessage);
         setShowLoader(false)
         if (response) {
            setCustomerTitles(response.customer_titles)
         }
      };
      const fetchApprovers = async () => {
         const response = await apiRequest('approvers', undefined, undefined, setMessage);
         setShowLoader(false)
         if (response) {
            const approvers = response.approvers.map(({ id, first_name, last_name }) => {
               return { id, name: first_name + " " + last_name }
            })
            setApprovers(approvers)
         }
      };
      fetchTitles()
      fetchApprovers()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   ////////////////////////////////////////////////////////////////////////
   const next = () => {
      if (emailNphone) {
         let valid = true;
         const emails = [];
         const phones = [];
         const emailNphoneArray = emailNphone.replace(/\s/g, '').split(",");
         for (let eNp of emailNphoneArray) {
            if (eNp) {
               if (validateEmail(eNp)) {
                  emails.push(eNp)
               } else if (validatePhone(eNp)) {
                  phones.push(eNp)
               } else {
                  valid = false;
                  setMessage(`${eNp} is neither a valid email nor phone`)
                  break;
               }
            }
         }
         if (valid) {
            props.history.push({ pathname: '/confirm&Submit', state: { ...props.location.state, customerTitle, approver, customerLastName, emails, phones } })
         }
      } else {
         props.history.push({ pathname: '/confirm&Submit', state: { ...props.location.state, customerTitle, approver, customerLastName } })
      }
   };
   ////////////////////////////////////////////////////////////////////////
   return (
      <Fragment>
         {showLoader && <Loader />}
         <div className="select-vehicle enter-data-body" id="select-vehicle-body enter-data-body pad-btm">
            <div className="ddList">
               <div className="h-100 justify-content-center align-items-center">
                  <div className="">
                     <DropDown ddclassName="box-5" list={customerTitles}
                        onChange={e => {
                           setCustomerTitle(JSON.parse(e.target.value));
                        }}
                     />
                     <TextInput name="model" title="Enter Customer Last Name" type="text"
                        value={customerLastName}
                        onChange={(e) => setCustomerLastName(e.target.value)}
                     />
                     <TextInput name="model" title="Enter emails/phone" type="text"
                        value={emailNphone}
                        onChange={(e) => setemailNphone(e.target.value)}
                     />
                     <DropDown ddclassName="box-6" list={approvers}
                        onChange={e => {
                           setApprover(JSON.parse(e.target.value));
                        }}
                     />
                  </div>
                  <p className="p-2 text-center m-4">
                     Congratulations on purchase of your {carMake.name + ""} {carModel ? carModel.name : ""} {carStyle ? carStyle.name : ""}
                  </p>
               </div>
            </div>
            {(customerTitle && approver && customerLastName) && <Button btnClick={next} title="Next" />}}
      </div>
      </Fragment>
   )
}

export default EnterData