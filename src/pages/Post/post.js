import React, { useState, useContext, Fragment } from 'react'
import './post.css';
import Button from "../../components/Button/button";
import Modal from "../../components/Modal/modal";
import demoHistoryImg from "../../Assets/demo-img.svg";
import apiRequest from "../../api";
import ToastContext from "../../Context/toastContext";
import Loader from "../../components/Loader/loader";

const Post = ({ location, history }) => {
   const post = location.state.data;
   const { setMessage } = useContext(ToastContext);
   const [showLoader, setShowLoader] = useState(false);
   const [showModal, setShowModal] = useState(false);
   ///////////////////////////////////////////////////////////////////
   let statusClass = " ";
   if (post.approved === true) {
      statusClass = "approved";
   } else if (post.status === "Rejected") {
      statusClass = "rejected";
   } else if (post.status === "Submitted") {
      statusClass = "submitted";
   } else {
      statusClass = "new";
   }
   const statusClassName = "text-center post-status-" + statusClass;
   /////////////////////////////////////////////////////////////
   const deletePost = async () => {
      setShowLoader(true)
      const response = await apiRequest(`posts/${post.id}`, "DELETE", undefined, setMessage);
      setShowLoader(false)
      if (response) {
         setMessage({ head: "Message", body: "Post has been deleted" })
         history.goBack()
      }
   }
   /////////////////////////////////////////////////////////////
   const duplicate_recall_Post = async (callFrom) => {
      setShowLoader(true)
      const apiUrl = callFrom === 'duplicate' ? `posts/${post.id}/duplicate` : `posts/${post.id}/recall`
      const response = await apiRequest(apiUrl, "PUT", undefined, setMessage);
      setShowLoader(false)
      if (response) {
         history.goBack()
      }
   }
   /////////////////////////////////////////////////////////////
   const submitForApproval = async () => {
      setShowLoader(true)
      const body = { ...post, submitted: true };
      const response = await apiRequest(`posts/${post.id}`, "PUT", body, setMessage);
      setShowLoader(false)
      if (response) {
         setMessage({ head: "Message", body: "Post has been Submitted" });
         history.goBack()
      }
   }
   /////////////////////////////////////////////////////////////
   return (
      <Fragment>{showLoader && <Loader />}
         <div id="container" className="container post-body">
            <div className="post">
               <div className="banner">
                  <img src={!post.photo_is_portrait ? demoHistoryImg : null} alt="avatar-img" />
               </div>
               <h2 className="name">{post.customer_name}</h2>
               <div className="title">{new Date(post.created_at).toDateString()}</div>
               <div className="actions">
                  <div className="follow-info">
                     <p>{post.customer_message}</p>
                  </div>
                  <div className={statusClassName} >
                     <p className="m-0 p-2">{post.status}</p>
                  </div>
                  <Button btnClick={() => setShowModal(true)} title="Action" />
               </div>
               <div className="desc">
                  <h6>{post.footer_text}</h6>
               </div>
               {showModal &&
                  <Modal show={showModal} handleClose={() => setShowModal(false)}>
                     {(post.status === 'New') ?
                        <Fragment>
                           <Button btnClick={deletePost} title="Delete" />
                           <Button to="/sendNewSalesBroadcast" navData={post} title="Edit" />
                           <Button btnClick={submitForApproval} title="Submit for Approval" />
                           <Button btnClick={() => duplicate_recall_Post("duplicate")} title="Duplicate Post" />
                        </Fragment>
                        :
                        <Fragment>
                           <Button btnClick={() => duplicate_recall_Post("duplicate")} title="Duplicate Post" />
                           {!(post.status === 'Approved' || post.status === 'Rejected') ? <Button btnClick={() => duplicate_recall_Post("recall")} title="Recall Post" /> : null}
                        </Fragment>
                     }
                  </Modal>
               }
            </div>
         </div>
      </Fragment>
   )
}

export default Post