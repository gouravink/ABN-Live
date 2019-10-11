import React from 'react';
import "./home.css"
import Button from "../../components/Button/button";
import ForgotPassword from "../../components/ForgotPassword/forgotPassword"
import useRenderCount from "../../renderCountHook"
import logo from '../../Assets/logo-abn-144x144.png';

const isLoggedIn = () => localStorage.getItem("authenticated");

const Home = () => {
   useRenderCount("HOME")
   return (
      <div className="home-body" id="home-body">
         <div className="row justify-content-center align-items-center home-area">
            <div className="col-10 text-center mb-4">
               <img className="logo" src={logo} alt="logo" />
            </div>
            <div className="col-10">
               <Button to={isLoggedIn() ? "/dashboard" : "/login"} title="Get Started" />
               <Button to="/help" title="Help" />
               <ForgotPassword email="" />
            </div>
         </div>
      </div>
   )
}

export default Home;