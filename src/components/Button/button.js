import React from "react";
import { Link } from 'react-router-dom';
import "./button.css";

const Button = ({ title, to, navData, btnClass, btnClick, disabled }) => {
   const btnClassName = "buttonCls w-100 " + btnClass
   return (
      <div className="mb-4 button-wrapper">
         {
            to &&
            <Link to={{ pathname: to, state: navData }}>
               <button type="button" className={btnClassName} >
                  {title}
               </button>
            </Link>
         }
         {
            btnClick &&
            <button type="button" className={btnClassName} onClick={btnClick} disabled={disabled} >
               {title}
            </button>
         }
      </div>
   )
}

export default Button