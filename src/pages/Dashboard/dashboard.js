import React from 'react';
import './dashboard.css'
import useRenderCount from "../../renderCountHook"
import icon1 from '../../Assets/send-new-sales-broadcast-icon.png';
import icon2 from '../../Assets/send-previous-sales-broadcast-icon.png';
import icon3 from '../../Assets/send-video.png';
import icon4 from '../../Assets/send-delivery-broadcast-only.png';
import Menu from './menu';
import { Link } from 'react-router-dom';

const Dashboard = props => {
   useRenderCount("DASHBOARD")
   /////////////////////////////////////////////////////////////////////////////
   return (
      <div className="dashboard-body" id="dashboard-body">
         <Link to="/sendNewSalesBroadcast">
            <Menu className="animate-one" alt="Sends New Sales Broadcast icon" title="Send New Sales Broadcast" src={icon1} />
         </Link>
         <Link to="/previousPost">
            <Menu className="offset-4 animate-two" alt="Send Previous Sales Broadcast icon" title="Send Previous Sales Broadcast" src={icon2} />
         </Link>
         {/* <Link to="/videoBroadcast"> */}
            <Menu className="animate-three" alt="Send Videos" title="Send Videos" src={icon3} />
         {/* </Link> */}
         <Menu className="offset-4 animate-four" alt="Send Delivery Broadcast Only" title="Send Delivery Broadcast Only" src={icon4} />
      </div>
   )
}

export default Dashboard