import React, { useState, useEffect, Fragment, useContext } from "react";
import ToastContext from "../../Context/toastContext";
import apiRequest from "../../api";
import "./users.css"
import ListView from "../../components/ListView/listView"
import Loader from "../../components/Loader/loader"


const Users = props => {
   const [users, setUsers] = useState([]);
   const [showLoader, setShowLoader] = useState(false);
   const { setMessage } = useContext(ToastContext);
   const loggedInUser = JSON.parse(localStorage.getItem("authenticated"));
   ////////////////////////////////////////////////////////////////////////////////
   useEffect(() => {
      setShowLoader(true)
      const fetchUsers = async () => {
         const response = await apiRequest('users', undefined, undefined, setMessage);
         setShowLoader(false)
         if (response) {
            setUsers(response)
         }
      };
      fetchUsers()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   ////////////////////////////////////////////////////////////////////////////////
   return (
      <Fragment>
         {showLoader && <Loader />}
         <div id="container users-body-id" className="container listview-body-wrapper users-body pad-btm">
            <div className="row">
               {users.map(({ user }) => {
                  return (
                     <ListView
                        key={user.id}
                        data={user}
                        from="USERLIST"
                        to={(user.id === loggedInUser.id) ? "/myProfile": `/singleUser/${user.first_name + " " + user.last_name}`}
                     />
                  )
               })}
            </div>
         </div>
      </Fragment>
   )
};

export default Users;