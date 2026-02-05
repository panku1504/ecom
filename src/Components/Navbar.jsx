import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
export default function Navbar() {
  let [settingData, setSettingData] = useState({})
  let [showMenu, setShowMenu] = useState(false)
  let navigate = useNavigate()

  let SettingStateData = useSelector(state => state.SettingStateData)
  let dispatch = useDispatch()


  function logout() {
    localStorage.clear()
    navigate("/login")
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
    <>
      <header id="header" className={`header d-flex align-items-center sticky-top ${showMenu ? 'mobile-nav-active' : ''}`}>
        <div className="container-fluid container-xl position-relative d-flex align-items-center">

          <Link to="/" className="logo d-flex align-items-center me-auto">
            <h1 className="sitename">{settingData.siteName ? settingData.siteName : import.meta.env.VITE_APP_SITE_NAME}</h1>
            <span>.</span>
          </Link>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li><NavLink to="/" >Home<br /></NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/shop">Shop</NavLink></li>
              <li><NavLink to="/features">Features</NavLink></li>
              <li><NavLink to="/faq">Faq</NavLink></li>
              <li><NavLink to="/testimonials">Testimonials</NavLink></li>
              <li><NavLink to="/contactus">ContactUs</NavLink></li>
              {
                localStorage.getItem("login") ?
                  <li className="dropdown"><Link to="/profile"><span>{localStorage.getItem("name")}</span> <i className="bi bi-chevron-down toggle-dropdown"></i></Link>
                    <ul>
                      <li><Link to="/profile">Profile</Link></li>
                      {localStorage.getItem("role") !== "Buyer" ? <li><Link to="/admin">Admin DashBoard</Link></li> : null}
                      <li><Link to="/cart">Cart</Link></li>
                      <li><Link to="/checkout">Checkout</Link></li>
                      <li><button className='btn ms-2' onClick={logout}>Logout</button></li>
                    </ul>
                  </li> : null
              }
            </ul>
            <i className={`mobile-nav-toggle d-xl-none bi ${showMenu ? 'bi-x' : 'bi-list'}`} onClick={() => setShowMenu(!showMenu)}></i>
          </nav>

          {
            localStorage.getItem('login') ?
              null : <Link className="btn-getstarted" to="/login">login</Link>
          }

        </div>
      </header>

    </>
  )
}
