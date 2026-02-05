import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
import { getNewsletter, createNewsletter } from "../Redux/ActionCreators/NewsletterActionCreators"
import { useDispatch, useSelector } from 'react-redux'

export default function Footer() {
  let [settingData, setSettingData] = useState({})
  let [email, setEmail] = useState("")
  let [message, setMessage] = useState("")

  let SettingStateData = useSelector(state => state.SettingStateData)
  let NewsletterStateData = useSelector(state => state.NewsletterStateData)
  let dispatch = useDispatch()

  function postData(e) {
    e.preventDefault()
    let item = NewsletterStateData.find(x => x.email === email)
    if (item) {
      setMessage({
        type: "Error",
        msg: "This Email Address is Already Registered With Us"
      })
    }
    else {
      setMessage({
        type: "Success",
        msg: "Thanks To Subscribe Our Newsletter Service"
      })
      dispatch(createNewsletter({ email: email, status: true }))
      setEmail("")
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

  useEffect(() => {
    (() => {
      dispatch(getNewsletter())
    })()
  }, [NewsletterStateData.length])
  return (
    <>

      <footer id="footer" className="footer dark-background">

        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <Link to="/" className="d-block text-light fs-1 mb-2">
                <span className="sitename">{settingData.siteName ? settingData.siteName : import.meta.env.VITE_APP_SITE_NAME}</span>
              </Link>
              <div className="footer-contact">
                <Link to={`${settingData.map2 ? settingData.map2 : import.meta.env.VITE_APP_MAP2}`} className='text-light d-block' target='_blank' rel='noreferrer'><i className='bi bi-geo-alt fs-5 me-3'></i>{settingData.address ? settingData.address : import.meta.env.VITE_APP_ADDRESS}</Link>
                <Link to={`mailto:${settingData.email ? settingData.email : import.meta.env.VITE_APP_EMAIL}`} className='text-light d-block' target='_blank' rel='noreferrer'><i className='bi bi-envelope fs-5 me-3'></i>{settingData.email ? settingData.email : import.meta.env.VITE_APP_EMAIL}</Link>
                <Link to={`tel:${settingData.phone ? settingData.phone : import.meta.env.VITE_APP_PHONE}`} className='text-light d-block' target='_blank' rel='noreferrer'><i className='bi bi-phone fs-5 me-3'></i>{settingData.phone ? settingData.phone : import.meta.env.VITE_APP_PHONE}</Link>
                <Link to={`https://wa.me/${settingData.whatsapp ? settingData.whatsapp : import.meta.env.VITE_APP_WHATSAPP}`} className='text-light d-block' target='_blank' rel='noreferrer'><i className='bi bi-whatsapp fs-5 me-3'></i>{settingData.whatsapp ? settingData.whatsapp : import.meta.env.VITE_APP_WHATSAPP}</Link>

              </div>
              <div className="social-links d-flex mt-4">
                <Link to={settingData.facebook ? settingData.facebook : import.meta.env.FACEBOOK} target='_blank' rel='noreferrer'><i className="bi bi-facebook"></i></Link>
                <Link to={settingData.twitter ? settingData.twitter : import.meta.env.VITE_APP_TWITTER} target='_blank' rel='noreferrer'><i className="bi bi-twitter-x"></i></Link>
                <Link to={settingData.instagram ? settingData.instagram : import.meta.env.VITE_APP_INSTAGRAM} target='_blank' rel='noreferrer'><i className="bi bi-instagram"></i></Link>
                <Link to={settingData.linkedin ? settingData.linkedin : import.meta.env.VITE_APP_LINKEDIN} target='_blank' rel='noreferrer'><i className="bi bi-linkedin"></i></Link>
                <Link to={settingData.youtube ? settingData.youtube : import.meta.env.VITE_APP_YOUTUBE} target='_blank' rel='noreferrer'><i className="bi bi-youtube"></i></Link>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/About">About us</Link></li>
                <li><Link to="/Shop">Shop</Link></li>
                <li><Link to="/Features">Features</Link></li>
                <li><Link to="/Fervices">Services</Link></li>
                <li><Link to="/Faq">Faq</Link></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><Link to="/Testimonials">testimonials</Link></li>
                <li><Link to="/ContactUs">Contact Us</Link></li>
                <li><Link to="/privacypolicy">Privacy policy</Link></li>
                <li><Link to="/Terms&conditions">Terms & conditions</Link></li>
                <li><Link to="/refundpolicy">refund policy</Link></li>
                <li><Link to="/datapolicy">data policy</Link></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-12 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p>Subscribe to our newsletter and receive the latest news about our products and services!</p>
              <form className="php-email-form" onSubmit={postData}>
                <div className="newsletter-form">
                  <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter Email Address' required />
                  <input type="submit" value="Subscribe" /></div>
              </form>
              {message.type ? <p className={message.type === "Error" ? 'text-danger' : 'text-light'}>{message.msg}</p> : null}
            </div>

          </div>
        </div>

        <div className="container copyright text-center mt-4">
          <p>© <span>Copyright</span> <strong className="px-1 sitename">{settingData.siteName ? settingData.siteName : import.meta.env.VITE_APP_SITE_NAME}</strong> <span>All Rights Reserved</span></p>

        </div>

      </footer>

    </>
  )
}
