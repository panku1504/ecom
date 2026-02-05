import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Hero from '../Components/Hero'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
import { createContactUs } from "../Redux/ActionCreators/ContactUsActionCreators"
import FormValidator from '../Validators/FormValidator'

export default function ContactUsPage() {
    let dataOptions = {
        name: '',
        email: "",
        phone: "",
        subject: '',
        message: ""
    }
    let errorMessageOptions = {
        name: "Name Field Is Mandatory",
        email: "Email Address Field Is Mandatory",
        phone: "Phone NumerField Is Mandatory",
        subject: "Subject Field Is Mandatory",
        message: "Message Field Is Mandatory"
    }
    let [data, setData] = useState(dataOptions)
    let [errorMessage, setErrorMessage] = useState(errorMessageOptions)
    let [show, setShow] = useState(false)
    let [message, setMessage] = useState("")

    let [settingData, setSettingData] = useState({})

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()


    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error) {
            setShow(true)
        }
        else {
            dispatch(createContactUs({ ...data, status: true, date: new Date() }))
            setData(dataOptions)
            setShow(false)
            setErrorMessage(errorMessageOptions)
            setMessage("Thanks For Contacting us, Our Team Will Contact You Soon!!")
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                setSettingData({ ...SettingStateData[0] })
            }
        })()
    }, [SettingStateData.length])
    return (
        <main className="main">
            <Hero title="ContactUs" />


            <section id="contact" className="contact section">


                <div className="container section-title">
                    <h2>Contact US</h2>
                    <p>"Connect with {settingData.siteName ? settingData.siteName : import.meta.env.VITE_APP_SITE_NAME}: Your Questions, Feedback, and Support - We're Here to Help You!"</p>
                </div>

                <div className="container" >

                    <div className="row gy-4">
                        <div className="col-lg-6 ">
                            <div className="row gy-4">

                                <div className="col-lg-12">
                                    <div className="info-item d-flex flex-column justify-content-center align-items-center" >
                                        <i className="bi bi-geo-alt"></i>
                                        <h3>Address</h3>
                                        <Link className='text-dark' to={settingData.map2 ? settingData.map2 : import.meta.env.VITE_APP_MAP2} target='_blank' rel='noreferrer'>{settingData.address ? settingData.address : import.meta.env.VITE_APP_ADDRESS}</Link>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="info-item d-flex flex-column justify-content-center align-items-center" >
                                        <i className="bi bi-telephone"></i>
                                        <h3>Call Us</h3>
                                        <Link className='text-dark' to={`tel:${settingData.phone ? settingData.phone : import.meta.env.VITE_APP_PHONE}`} target='_blank' rel='noreferrer'>{settingData.phone ? settingData.phone : import.meta.env.VITE_APP_PHONE}</Link>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="info-item d-flex flex-column justify-content-center align-items-center" >
                                        <i className="bi bi-envelope"></i>
                                        <h3>Email Us</h3>
                                        <Link className='text-dark' to={`mailto:${settingData.email ? settingData.email : import.meta.env.VITE_APP_EMAIL}`} target='_blank' rel='noreferrer'>{settingData.email ? settingData.email : import.meta.env.VITE_APP_EMAIL}</Link>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="info-item d-flex flex-column justify-content-center align-items-center" >
                                        <i className="bi bi-whatsapp"></i>
                                        <h3>Whatsapp </h3>
                                        <Link className='text-dark' to={`https://wa.me/${settingData.whatsapp ? settingData.whatsapp : import.meta.env.VITE_APP_WHATSAPP}`} target='_blank' rel='noreferrer'>{settingData.whatsapp ? settingData.whatsapp : import.meta.env.VITE_APP_WHATSAPP}</Link>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="info-item d-flex flex-column justify-content-center align-items-center" >
                                        <i className="bi bi-globe"></i>
                                        <h3>Social Medias </h3>
                                        <div className="social-links d-flex mt-4">
                                            <Link to={settingData.facebook ? settingData.facebook : import.meta.env.VITE_APP_FACEBOOK} target='_blank' rel='noreferrer'><i className="bi bi-facebook"></i></Link>
                                            <Link to={settingData.twitter ? settingData.twitter : import.meta.env.VITE_APP_TWITTER} target='_blank' rel='noreferrer'><i className="bi bi-twitter-x"></i></Link>
                                            <Link to={settingData.instagram ? settingData.instagram : import.meta.env.VITE_APP_INSTAGRAM} target='_blank' rel='noreferrer'><i className="bi bi-instagram"></i></Link>
                                            <Link to={settingData.linkedin ? settingData.linkedin : import.meta.env.VITE_APP_LINKEDIN} target='_blank' rel='noreferrer'><i className="bi bi-linkedin"></i></Link>
                                            <Link to={settingData.youtube ? settingData.youtube : import.meta.env.VITE_APP_YOUTUBE} target='_blank' rel='noreferrer'><i className="bi bi-youtube"></i></Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-lg-6">
                            {message ? <p className='text-center text-success'>{message}</p> : null}
                            <form onSubmit={postData} className="php-email-form" >
                                <div className="row gy-4">

                                    <div className="col-md-12">
                                        <label htmlFor="name">Name*</label>
                                        <input type="text" name="name" onChange={getInputData} value={data.name} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} placeholder="Your Full Name" />
                                        {show && errorMessage.name ? <p className='text-danger '>{errorMessage.name}</p> : null}
                                    </div>

                                    <div className="col-md-6 ">
                                        <label htmlFor="email">Email*</label>
                                        <input type="email" onChange={getInputData} value={data.email} className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-dark'}`} name="email" placeholder="Your Email Address" />
                                        {show && errorMessage.email ? <p className='text-danger '>{errorMessage.email}</p> : null}
                                    </div>

                                    <div className="col-md-6 ">
                                        <label htmlFor="phone">Phone Number*</label>
                                        <input type="text" onChange={getInputData} value={data.phone} className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-dark'}`} name="phone" placeholder="Your Phone Number" />
                                        {show && errorMessage.phone ? <p className='text-danger '>{errorMessage.phone}</p> : null}
                                    </div>

                                    <div className="col-md-12">
                                        <label htmlFor="subject">Subject*</label>
                                        <input type="text" onChange={getInputData} value={data.subject} className={`form-control ${show && errorMessage.subject ? 'border-danger' : 'border-dark'}`} name="subject" placeholder="Subject" />
                                        {show && errorMessage.subject ? <p className='text-danger '>{errorMessage.subject}</p> : null}
                                    </div>

                                    <div className="col-md-12">
                                        <label htmlFor="message">Message*</label>
                                        <textarea onChange={getInputData} value={data.message} className={`form-control ${show && errorMessage.message ? 'border-danger' : 'border-dark'}`} name="message" rows="4" placeholder="Message" ></textarea>
                                        {show && errorMessage.message ? <p className='text-danger '>{errorMessage.message}</p> : null}
                                    </div>

                                    <div className="col-md-12 text-center">
                                        <button type="submit">Send Message</button>
                                    </div>

                                </div>
                            </form>
                        </div>

                    </div>

                </div>

            </section>
        </main>
    )
}
