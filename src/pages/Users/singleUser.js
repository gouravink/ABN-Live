import React from 'react'
import './singleUser.css'
import logo from '../../Assets/logo-abn-144x144.png'

const SingleUser = (props) => {
   const user = props.location.state.data;
   return (
      <div id="container" className="container singleUser-body">
         <div className="singleUser">
            <div className="profile-logo">
               <img src={logo} alt="logo" />
            </div>
            <h2 className="name">{user.first_name + user.last_name}</h2>
            <div className="actions">
               <div className="follow-info">
                  <h4 className="single-user-email">{user.email}</h4>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SingleUser