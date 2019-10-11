import React from "react";
import './header.css'
import { withRouter } from "react-router";
import backButtonImage from "../../Assets/back-arrow.svg";
import helpButtonImage from "../../Assets/help-btn.svg";
import logoutImage from '../../Assets/logout.svg';
import { FBAuth } from "../../firebaseConfig";

const Header = (props) => {
   let title = "Welcome";
   let showBackBtn = false;
   let showHelpBtn = false;
   let showLogoutBtn = false;
   //////////////////////////////////////////////////////
   const logOut = () => {
      FBAuth.signOut().then(function () {
         localStorage.removeItem("authenticated");
         props.history.replace("/")
      })
   }

   const helpRedirect = () => {
      props.history.replace("/help")
   }
   const goBack = () => {
      props.history.go(-1)
   }
   //////////////////////////////////////////////////////
   switch (props.location.pathname) {
      case "/":
         return null
      case "/sendNewSalesBroadcast":
         title = "Select Vehicle"
         showHelpBtn = true
         showLogoutBtn = true
         break;
      case "/help":
         title = "Help"
         showBackBtn = true
         break;
      case "/login":
         title = "Login"
         showHelpBtn = true
         break;
      case "/dashboard":
         title = "Dashboard"
         showHelpBtn = true
         showLogoutBtn = true
         break;
      case "/history":
         title = "history"
         showHelpBtn = true
         showLogoutBtn = true
         break;
      case "/support":
         title = "support"
         showHelpBtn = true
         break;
      case "/users":
         title = "users"
         showHelpBtn = true
         showLogoutBtn = true
         break;
      case "/about":
         title = "about"
         showHelpBtn = true
         showLogoutBtn = true
         break;
      case "/post":
         title = "post"
         showBackBtn = true
         showHelpBtn = true
         showLogoutBtn = true
         break;
      case "/optionalPhoto":
         title = "Optional Photo"
         showBackBtn = true
         showLogoutBtn = true
         showHelpBtn = true
         break;
      case "/enterData":
         title = "Enetr Data"
         showBackBtn = true
         showHelpBtn = true
         showLogoutBtn = true
         break;
      case "/confirm&Submit":
         title = "Confirm & Submit"
         showBackBtn = true
         showHelpBtn = true
         showLogoutBtn = true
         break;
      case "/singleUser":
         title = "Single User"
         showBackBtn = true
         showHelpBtn = true
         showLogoutBtn = true
         break;
      case "/dealer":
         title = "Dealer Info"
         showBackBtn = true
         showHelpBtn = true
         showLogoutBtn = true
         break;
      case "/newUserStatus":
         title = "User Status"
         showHelpBtn = true
         showLogoutBtn = true
         break;
      case "/myProfile":
         title = "My Profile"
         showHelpBtn = true
         showLogoutBtn = true
         break;
      case "/videoBroadcast":
         title = "Video Broadcast"
         showHelpBtn = true
         showLogoutBtn = true
         break;
      case "/previousPost":
         title = "Previous Post"
         showHelpBtn = true
         showLogoutBtn = true
         break;
      default:
         title = "ABN Live"
   }
   return (
      <header>
         <div className="container-fluid text-center w-100 p-0">
            <div className="header-body p-4">
               <p className="mb-0">{title}</p>
               {showBackBtn && <img className="backbtn" src={backButtonImage} onClick={goBack} alt="back-button" />}
               {showHelpBtn && <img className="helpbtn backbtn" style={{ left: showBackBtn ? '16%' : '6%' }} src={helpButtonImage} onClick={helpRedirect} alt="help-button" />}
               {showLogoutBtn && <img className="logoutbtn backbtn" src={logoutImage} onClick={logOut} alt="logout-button" />}
            </div>
         </div>
      </header>
   )
}

const HeaderWithRoutes = withRouter(Header);

export default HeaderWithRoutes;