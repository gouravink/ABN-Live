import React, { useEffect, useState, Fragment } from "react";
import useRenderCount from "../../renderCountHook";
import DropDown from "../../components/DropDown/dropdown";
import Loader from "../../components/Loader/loader"
import FBDB from "../../firebaseConfig";
import './videoBroadcast.css'
import Button from "../../components/Button/button";
import VideoImg from "../../Assets/background-123.jpg"

const EnterData = () => {
    useRenderCount("ENTER DATA")

    const [customerTitles, setCustomerTitles] = useState([]);
    const [customerTitle, setCustomerTitle] = useState();
    const [customerLastName, setCustomerLastName] = useState([]);
    const [customerEmail, setCustomerEmail] = useState([]);
    const [approvers, setApprovers] = useState([]);
    const [approver, setApprover] = useState();
    const [showLoader, setShowLoader] = useState(false);
    ////////////////////////////////////////////////////////////////////
    useEffect(() => {
        setShowLoader(true)

        FBDB.ref("customerTitles").on("value", (snapshot) => {
            setShowLoader(false)
            const snapshotVal = snapshot.val();
            const cusTitles = [];
            for (let custitles in snapshotVal) {
                cusTitles.push({ id: custitles, body: snapshotVal[custitles] })
            }
            setCustomerTitles(cusTitles)
        })

        FBDB.ref("users").orderByChild('approver').equalTo(true).on("value", (snapshot) => {
            setShowLoader(false)
            const snapshotVal = snapshot.val();
            const approver = [];
            for (let approverList in snapshotVal) {
                approver.push({ id: approverList, body: snapshotVal[approverList] })
            }
            setApprovers(approver)
        })
    }, [])
    ////////////////////////////////////////////////////////////////////////
    return (
        <Fragment>
            {showLoader && <Loader />}
            <div className="select-vehicle enter-data-body videoBroadcast-body" id="select-vehicle-body videoBroadcast-body pad-btm">
                <div className="ddList">
                    <div className="h-100 justify-content-center align-items-center">
                        <div className="">
                            <DropDown ddclassName="box-7" list={customerTitles}
                                onChange={e => {
                                    setCustomerTitle(JSON.parse(e.target.value));
                                }}
                            />
                            <DropDown ddclassName="box-8" list={approvers}
                                onChange={e => {
                                    setApprover(JSON.parse(e.target.value));
                                }}
                            />
                        </div>
                    </div>
                    {approver &&
                        <div className="showImg">
                            <img src={VideoImg} alt="choose-img" />
                        </div>
                    }
                    {(customerTitles && approver) && <Button btnClick={() => alert("hii")} title="Next" />}}
            </div>
            </div>
        </Fragment>
    )
}

export default EnterData