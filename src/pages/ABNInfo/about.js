import React, { useEffect, useState, useContext, Fragment } from 'react'
import './about.css';
import Loader from "../../components/Loader/loader"
import useRenderCount from "../../renderCountHook";
import ContactModule from "../../components/ContactModule/contactModule"
import logo from '../../Assets/logo-abn-144x144.png';
import addressInfoImage from '../../Assets/address-info.svg';
import apiRequest from "../../api";
import ToastContext from "../../Context/toastContext"


const ABNInfo = (props) => {
   useRenderCount("ABOUT")
   const [compDetails, setCompDetails] = useState();
   const [dealerDetail, setDealerDetail] = useState();
   const [showLoader, setShowLoader] = useState(false);
   const { setMessage } = useContext(ToastContext);
   const user = JSON.parse(localStorage.getItem("authenticated"));
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
      //////////////////////////////////////////////////////////////////
      const dealerDetail = async () => {
         const dealerResponse = await apiRequest(`accounts/${user.account_id}`, undefined, undefined, setMessage);
         if (dealerResponse) {
            setDealerDetail(dealerResponse)
         }
      }
      dealerDetail()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   //////////////////////////////////////////////////////////////////////
   const company = compDetails || {};
   const dealer = dealerDetail || {};
   return (
      <Fragment>
         {showLoader && <Loader />}
         <div id="container" className="container about-body">
            <div className="about">
               <div className="banner">
                  <img src={logo} alt="abn-logo" />
               </div>
               <h2 className="name">{company.name}</h2>
               <div className="title">Version - 2.0.140</div>
               <div className="actions">
                  <div className="follow-phone desc">
                     <img className="address-info" src={addressInfoImage} alt="Address Info" />
                     <ul>
                        <li>{company.address_1}</li>
                        <li>{company.address_2}</li>
                     </ul>
                  </div>
               </div>
               <div className="grid">
                  <ContactModule aboutTitle="Contact Details" alt="Contact Support" hrefemail={company.support_email} hreftelephone={company.support_phone} />
                  <ContactModule aboutTitle="RAM" alt="RAM" hrefemail={dealer.ram_email} hreftelephone={dealer.ram_phone_number} />
                  <ContactModule aboutTitle="RAM Supervisor" alt="RAM Supervisor" hrefemail={company.ram_supervisor_email} hreftelephone={company.ram_supervisor_phone} />
                  <ContactModule aboutTitle="Billing Contact" alt="Billing Contact" hrefemail={company.billing_contact_email} hreftelephone={company.billing_contact_name} />
               </div>
               <div className="desc">
                  <ul>
                     <li>{dealer.name}</li>
                     <li><small>#{dealer.dealer_number}</small></li>
                  </ul>
                  <p className="copyr">&copy; Copyright 2019 - Automative Broadcasting Network</p>
               </div>
            </div>
         </div>
      </Fragment>
   )
}

export default ABNInfo