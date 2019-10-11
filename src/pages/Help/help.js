import React, { useEffect, useState, useContext, Fragment } from "react";
import "./help.css";
import logo from '../../Assets/logo-abn-144x144.png';
import useRenderCount from "../../renderCountHook"
import apiRequest from "../../api";
import Loader from "../../components/Loader/loader"
import addressInfoImage from '../../Assets/address-info.svg';
import ContactModule from "../../components/ContactModule/contactModule";
import ToastContext from "../../Context/toastContext";

const Help = (props) => {
   useRenderCount("HELP")
   const [compDetails, setCompDetails] = useState();
   const [showLoader, setShowLoader] = useState(false);
   const { setMessage } = useContext(ToastContext);
   //////////////////////////////////////////////////////////////////////
   useEffect(() => {
      setShowLoader(true)
      const comapnyDetails = async () => {
         const response = await apiRequest('company', undefined, undefined, setMessage);
         setShowLoader(false)
         if (response) {
            setCompDetails(response)
         }
      };
      comapnyDetails()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   //////////////////////////////////////////////////////////////////////
   const company = compDetails || {};
   return (
      <Fragment>
         {showLoader && <Loader />}
         <div id="container" className="container help-body">
            <div className="help">
               <div className="banner">
                  <img src={logo} alt="logo" />
               </div>
               <h3 className="name p-2">{company.name}</h3>
               <div className="title">Version 2.0.140</div>
               <div className="actions">
                  <img className="address-info p-2" src={addressInfoImage} alt="Address Info" />
                  <div className="title">{company.address_1}</div>
                  <div className="title">{company.address_2}</div>
                  <ContactModule alt="Contact Support" hrefemail={company.support_email} hreftelephone={company.support_phone} />
               </div>
            </div>
         </div>
      </Fragment>
   )
}

export default Help;