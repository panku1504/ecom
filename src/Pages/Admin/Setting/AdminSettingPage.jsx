import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Hero from '../../../Components/Hero'
import AdminSidebar from '../../../Components/AdminSidebar'

import { createSetting, getSetting, updateSetting } from "../../../Redux/ActionCreators/SettingActionCreators"

export default function AdminSettingPage() {
  let [data, setData] = useState({
    map1: "",
    map2: "",
    address: "",
    siteName: "",
    email: "",
    phone: "",
    whatsapp: "",
    facebook: "",
    youtube: "",
    twitter: "",
    linkdin: "",
    instagram: "",
    customer: 0,
    products: 0,
    brands: 0,
    refund: 0

  })

  let SettingStateData = useSelector(state => state.SettingStateData)

  let dispatch = useDispatch()
  function getInputData(e) {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  function postData(e) {
    e.preventDefault()
    if (SettingStateData.length === 0)
      dispatch(createSetting({ ...data }))
    else
      dispatch(updateSetting({ ...data }))

    alert("Setting Record Has Been Created/Updated")
  }

  useEffect(() => {
    (() => {
      dispatch(getSetting())
      if (SettingStateData.length) {
        setData({ ...data, ...SettingStateData[0] })
      }
    })()

  }, [SettingStateData.length])

  return (
    <>
      <Hero title="admin" />

      <div className="container-fluid my-2">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h4 className='bg-dark text-center text-light p-2 '>Setting</h4>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-12 mb-3">
                  <label>Google Map1</label>
                  <input type="url" name="map1" value={data.map1} onChange={getInputData} className='form-control border-dark' placeholder='Google Map1' />
                </div>
                <div className="col-12 mb-3">
                  <label>Google Map2</label>
                  <input type="url" name="map2" value={data.map2} onChange={getInputData} className='form-control border-dark' placeholder='Google Map2' />
                </div>
                <div className="col-12 mb-3">
                  <label>Address</label>
                  <input type="text" name="address" value={data.address} onChange={getInputData} className='form-control border-dark' placeholder='Address' />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Site Name</label>
                  <input type="text" name="siteName" value={data.siteName} onChange={getInputData} className='form-control border-dark' placeholder='Site Name' />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Email Address</label>
                  <input type="email" name="email" value={data.email} onChange={getInputData} className='form-control border-dark' placeholder='Email Address' />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Phone Number</label>
                  <input type="text" name="phone" value={data.phone} onChange={getInputData} className='form-control border-dark' placeholder='Phone Number' />
                </div>
                <div className="col-md-6 mb-3">
                  <label>WhatsApp Number</label>
                  <input type="text" name="whatsapp" value={data.whatsapp} onChange={getInputData} className='form-control border-dark' placeholder='WhatsApp Number' />
                </div>
                <div className="col-12 mb-3">
                  <label>FaceBook Profile URL</label>
                  <input type="url" name="facebook" value={data.facebook} onChange={getInputData} className='form-control border-dark' placeholder='FaceBook Profile URL' />
                </div>
                <div className="col-12 mb-3">
                  <label>Youtube Profile URL</label>
                  <input type="url" name="youtube" value={data.youtube} onChange={getInputData} className='form-control border-dark' placeholder='Youtube Profile URL' />
                </div>
                <div className="col-12 mb-3">
                  <label>Twitter Profile URL</label>
                  <input type="url" name="twitter" value={data.twitter} onChange={getInputData} className='form-control border-dark' placeholder='Twitter Profile URL' />
                </div>
                <div className="col-12 mb-3">
                  <label>Linkedin Profile URL</label>
                  <input type="url" name="linkedin" value={data.linkdin} onChange={getInputData} className='form-control border-dark' placeholder='Linkedin Profile URL' />
                </div>
                <div className="col-12 mb-3">
                  <label>Instagram Profile URL</label>
                  <input type="url" name="instagram" value={data.instagram} onChange={getInputData} className='form-control border-dark' placeholder='Instagram Profile URL' />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Happy Customers</label>
                  <input type="text" name="customer" value={data.customer} onChange={getInputData} className='form-control border-dark' placeholder='customer' />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Product Count</label>
                  <input type="text" name="products" value={data.products} onChange={getInputData} className='form-control border-dark' placeholder='total products' />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Brands Count</label>
                  <input type="text" name="brands" value={data.brands} onChange={getInputData} className='form-control border-dark' placeholder='Total Brands' />
                </div>
                <div className="col-md-6 mb-3">
                  <label>Refund In Days</label>
                  <input type="text" name="refund" value={data.refund} onChange={getInputData} className='form-control border-dark' placeholder='Refund days' />
                </div>

                <div className="col-12">
                  <button type="submit"  className='btn btn-dark w-100'>submit</button>
                </div>




              </div>
            </form>

          </div>
        </div>

      </div>

    </>
  )
}
