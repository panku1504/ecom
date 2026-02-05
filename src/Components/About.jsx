import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"

export default function About() {
    let [settingData, setSettingData] = useState({})


    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                setSettingData({ ...SettingStateData[0] })
            }
        })()
    }, [SettingStateData.length])
    return (
        <section id="about" className="about section section-bg dark-background">

            <div className="container position-relative">

                <div className="row gy-5">

                    <div className="content col-xl-5 d-flex flex-column" >
                        <h3>Redifining Fashion For Every Generation</h3>
                        <p>
                            {settingData.siteName ? settingData.siteName :import.meta.env.VITE_APP_SITE_NAME} is your trusted online destination for stylish, affordable products for men, women, and kids. We are dedicated to making your shopping experience seamless and enjoyable.
                        </p>
                        {
                            window.location.pathname !== "/about" ?
                                <Link to="/about" className="about-btn align-self-center align-self-xl-start"><span>About us</span> <i className="bi bi-chevron-right"></i></Link> : null


                        }
                    </div>

                    <div className="col-xl-7" >
                        <div className="row gy-4">

                            <div className="col-md-6 icon-box position-relative">
                                <i className="bi bi-bullseye"></i>
                                <h4><a href="#!" className="stretched-link">Our Vision</a></h4>
                                <p>To be the most trusted online shopping destination, inspiring style and confidence in every customer.</p>
                            </div>

                            <div className="col-md-6 icon-box position-relative">
                                <i className="bi bi-shield-check"></i>
                                <h4><a href="#!" className="stretched-link">Our Promise</a></h4>
                                <p>Quality, affordability, and excellent service at every step—because your satisfaction is our top priority.</p>
                            </div>

                            <div className="col-md-6 icon-box position-relative">
                                <i className="bi bi-bag-heart"></i>
                                <h4><a href="#!" className="stretched-link">Our Collection</a></h4>
                                <p>Carefully curated fashion and essentials for men, women, and kids, updated constantly to keep you ahead of trends.</p>
                            </div>

                            <div className="col-md-6 icon-box position-relative">
                                <i className="bi bi-rocket-takeoff"></i>
                                <h4><a href="#!" className="stretched-link">Our Journey</a></h4>
                                <p>Founded with passion and dedication, we've grown by putting customers first and embracing innovation in every experience.</p>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </section>
    )
}
