import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import CountUp from 'react-countup';


import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
export default function Stats() {
    let [data, setData] = useState({})
    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                setData({ ...SettingStateData[0] })
            }
        })()
    }, [SettingStateData.length])
    return (
        <section id="stats" className="stats section">

            <div className="container"   >

                <div className="row gy-4">

                    <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                        <i className="bi bi-emoji-smile fs-1"></i>
                        <div className="stats-item">
                            <span><CountUp end={data.customer} duration={3} className='d-inline' /> +</span>
                            <h3 className='fs-4'>Happy Customers</h3>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                        <i className="bi bi-card-list fs-1"></i>
                        <div className="stats-item">
                            <span><CountUp end={data.products} duration={3} className='d-inline' /> +</span>
                            <h3 className='fs-4'>Products</h3>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                        <i className="bi bi-shield-check fs-1"></i>
                        <div className="stats-item">
                            <span><CountUp end={data.brands} duration={3} className='d-inline' /> +</span>
                            <h3 className='fs-4'>Brands</h3>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                        <i className="bi bi-arrow-counterclockwise fs-1"></i>
                        <div className="stats-item">
                            <span><CountUp end={data.refund} duration={3} className='d-inline' /> Days</span>
                            <h3 className='fs-4'>Refund Policy</h3>
                        </div>
                    </div>




                </div>

            </div >

        </section >
    )
}
