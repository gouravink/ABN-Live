import React from "react";
import './footer.css'
import { withRouter } from "react-router";
import FooterItem from "./footerItem";
import homeImage from '../../Assets/home-white.svg';
import historyImage from '../../Assets/history-grey.svg';
import settingsImage from '../../Assets/settings-white.svg';

const Footer = ({ location }) => {
   if ((location.pathname === "/login") || (location.pathname === "/") || (location.pathname === "/help") || (location.pathname === "/dealer") || (location.pathname === "/newUserStatus")) {
      return null
   }
   return (
      <footer>
         <div className="text-center w-100 p-0">
            <div className="footer-body p-2">
               <div className="row align-items-center h-100">
                  <FooterItem title="Main Menu" src={homeImage} to="/dashboard" />
                  <FooterItem title="History" src={historyImage} to="/history" />
                  <FooterItem title="Support" src={settingsImage} to="/support" />
               </div>
            </div>
         </div>
      </footer>
   )
}

const FooterWithRoutes = withRouter(Footer);

export default FooterWithRoutes;