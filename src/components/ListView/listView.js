import React from 'react';
import './listView.css'
import { Link } from 'react-router-dom';
import nextArrowImage from "../../Assets/next.svg";
import demoHistoryImg from "../../Assets/demo-img.svg"

const ListView = ({ data, to, from }) => {
   const notUser = from !== "USERLIST";
   let statusClass = " ";
   if (data.approved === true) {
      statusClass = "approved";
   } else if (data.status === "Rejected") {
      statusClass = "rejected";
   } else if (data.status === "Submitted") {
      statusClass = "submitted";
   } else {
      statusClass = "new";
   }
   const statusClassName = "mb-0 listview-body-" + statusClass;
   return (
      <div className="col-12 tab-hor">
         <Link to={{ pathname: to, state: { data } }}>
            <div className="listview-body">
               <div className="list-data">
                  <div className="row">
                     {
                        notUser &&
                        <div className="col-3 img">
                           <img alt="listview-thumb" src={demoHistoryImg} />
                        </div>
                     }
                     <div className="col-8">
                        <p className="cus-title his-title mb-0">{notUser ? data.customer_name : (data.first_name + data.last_name)}</p>
                        {notUser && <p className="listview-time mb-0">{new Date(data.created_at).getHours() + ":" + new Date(data.created_at).getMinutes()}</p>}
                     </div>
                     <div className="col-1 listview-arrow">
                        <img src={nextArrowImage} alt="next-button" />
                     </div>
                  </div>
               </div>
               <div className="row text-center">
                  {
                     notUser &&
                     <div className="col-6 offset-3">
                        <p className={statusClassName}>{data.status}</p>
                     </div>
                  }
               </div>
            </div>
         </Link>
      </div >
   )
}

export default ListView;