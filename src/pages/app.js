import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';
import Home from "../pages/Home/home";
import SelectVehicle from "./SendNewSalesBroadcast/selectVehicle";
import Help from "../pages/Help/help";
import Authentication from "./Authentication/authentication";
import History from "./History/history";
import Support from "./Support/support";
import Post from "./Post/post";
import Users from "../pages/Users/users"
import Dashboard from "../pages/Dashboard/dashboard"
import MyProfile from "../pages/MyProfile/myProfile"
import ABNInfo from "../pages/ABNInfo/about"
import SingleUser from "../pages/Users/singleUser"
import OptionalPhoto from "../pages/SendNewSalesBroadcast/optionalPhoto"
import EnterData from "../pages/SendNewSalesBroadcast/enterData"
import ConfirmSubmit from "../pages/SendNewSalesBroadcast/confirmSubmit"
import PageNotFound from "../pages/404/404"
import PreviousPost from "../pages/sendPreviousSalesBroadcast/previousPost"
import NewUserStatus from "../pages/UserStatus/newUserStatus"
import VideoBroadcast from "../pages/sendVideo/videoBroadcast"
import ToastContext from "../Context/toastContext"
import Toast from "../components/Toast/toast"


const isLoggedIn = () => localStorage.getItem("authenticated");


const App = props => {
   const [message, showMessage] = useState(false)
   //////////////////////////////////////////////////////
   return (
      <Router>
         <ToastContext.Provider value={{ message, setMessage: showMessage }}>
            <div className="bg"></div>
            <div className="wrapper">
               <div className="layer">
                  {message && <Toast />}
                  <Header />
                  <Switch>
                     <Route path="/" exact component={Home} />
                     <Route path="/help" component={Help} />
                     <Route path="/login" component={Authentication} />
                     <Route path="/newUserStatus" component={NewUserStatus} />
                     <PrivateRoute path="/sendNewSalesBroadcast" component={SelectVehicle} />
                     <PrivateRoute path="/dashboard" component={Dashboard} />
                     <PrivateRoute path="/history" component={History} />
                     <PrivateRoute path="/support" component={Support} />
                     <PrivateRoute path="/post" component={Post} />
                     <PrivateRoute path="/myProfile" component={MyProfile} />
                     <PrivateRoute path="/users" component={Users} />
                     <PrivateRoute path="/singleUser" component={SingleUser} />
                     <PrivateRoute path="/about" component={ABNInfo} />
                     <PrivateRoute path="/optionalPhoto" component={OptionalPhoto} />
                     <PrivateRoute path="/enterData" component={EnterData} />
                     <PrivateRoute path="/confirm&Submit" component={ConfirmSubmit} />
                     <PrivateRoute path="/previousPost" component={PreviousPost} />
                     <PrivateRoute path="/videoBroadcast" component={VideoBroadcast} />
                     <Route path="/" component={PageNotFound} />
                  </Switch>
               </div>
            </div>
            <Footer />
         </ToastContext.Provider>
      </Router>
   )
   //////////////////////////////////////////////////////////
   // switch (view) {
   //    case 1:
   //       // return <AuthLoadingView />
   //       return mainApp()
   //    default:
   //       return mainApp()
   // }
}

function PrivateRoute({ component: Component, ...rest }) {
   return (
      <Route
         {...rest}
         render={props =>
            isLoggedIn() ?
               (
                  // isAccountGiven() ?
                  <Component {...props} /> //:
                  // (
                  //    <Redirect
                  //       to={{
                  //          pathname: "/dealer",
                  //          state: { from: props.location }
                  //       }} />
                  // )
               ) :
               (
                  <Redirect
                     to={{
                        pathname: "/login",
                        state: { from: props.location }
                     }} />
               )
         } />
   );
}

export default App;