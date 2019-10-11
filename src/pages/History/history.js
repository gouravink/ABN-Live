import React, { useEffect, useState, useContext, Fragment, useRef } from 'react'
import './history.css'
import ListView from "../../components/ListView/listView"
import useRenderCount from "../../renderCountHook"
import Loader from "../../components/Loader/loader"
import apiRequest from "../../api";
import ToastContext from "../../Context/toastContext";

const History = (props) => {
   useRenderCount("HISTORY")
   const [historyItem, setHistoryItem] = useState([]);
   const [showLoader, setShowLoader] = useState(false);
   const { setMessage } = useContext(ToastContext);
   const postRef = useRef(0);
   ///////////////////////////////////////////////////////////////
   useEffect(() => {
      setShowLoader(true)
      const historyDetails = async () => {
         const response = await apiRequest('posts', undefined, undefined, setMessage);
         setShowLoader(false)
         if (response) {
            setHistoryItem(response)
         }
      };
      historyDetails()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   ///////////////////////////////////////////////////////////////
   return (
      <Fragment>
         {showLoader && <Loader />}
         <div id="container" className="container listview-body-wrapper history-body pad-btm">
            <div className="row">
               {historyItem.map((e) => {
                  const currentDate = new Date(e.post.created_at).getDate();
                  if (postRef.current !== currentDate) {
                     postRef.current = currentDate;
                     return (
                        <Fragment key={e.post.id}>
                           <div className="col-12 text-center mt-2 mb-2 his-date pl-0 pr-0">
                              <p>{new Date(e.post.created_at).toDateString()}</p>
                           </div>
                           <ListView to="/post" data={e.post} />
                        </Fragment>
                     )
                  }
                  return (
                     <ListView to="/post" data={e.post} key={e.post.id} />
                  )
               })}
            </div>
         </div>
      </Fragment>
   )
}

export default History