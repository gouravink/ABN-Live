import React, { useContext, useEffect, useState } from "react";
import ToastContext from "../../Context/toastContext"
import logo from "../../Assets/logo-abn-144x144.png"
import './toast.css'
let toastStyles = {
   position: "absolute",
   top: 0,
   right: 0,
   transform: 'translateX(100%)',
   transition: 'all 0.5s ease-in-out'
}
const Toast = () => {
   const { message, setMessage } = useContext(ToastContext);
   const [toastStyle, setToastStyle] = useState(toastStyles)
   useEffect(() => {
      setTimeout(() => {
         setToastStyle({
            position: "absolute",
            top: 0,
            right: 0,
            opacity: 1,
            transform: 'translateX(0)',
            transition: 'all 0.5s ease-in-out'
         })
      }, 100)
   }, [])
   return (
      <div className="toast" style={toastStyle}>
         <div className="toast-header">
            <img src={logo} className="rounded mr-2 toast-logo" alt="logo" />
            <strong className="mr-auto">{message.body ? message.head : "Error"}</strong>
            <button onClick={() => setMessage(false)} type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
               <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <div className="toast-body">
            {message.body ? message.body : message}
         </div>
      </div>
   )
}

export default Toast