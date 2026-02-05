import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Await, Link, useNavigate, useParams } from 'react-router-dom'

import Hero from '../../../Components/Hero'
import AdminSidebar from '../../../Components/AdminSidebar'

import FormValidator from '../../../Validators/FormValidator'


import { getFeature, updateFeature } from "../../../Redux/ActionCreators/FeatureActionCreators"


export default function AdminFeatureUpdatePage() {
  let { id } = useParams()
  let [data, setData] = useState({
    name: "",
    icon: "",
    shortDescription: "",
    status: true,
  })

  let [errorMessage, setErrorMessage] = useState({
    name: "",
    icon: "",
    shortDescription: ""
  })

  let [show, setShow] = useState(false)

  let FeatureStateData = useSelector(state => state.FeatureStateData)
  let dispatch = useDispatch()

  let navigate = useNavigate()

  function getInputData(e) {
    let { name, value } = e.target

    setErrorMessage({
      ...errorMessage,
      [name]: FormValidator(e)
    })

    setData({
      ...data,
      [name]: name === "status" ? (value === "1" ? true : false) : value
    })

  }

  function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let item = FeatureStateData.find(x => x.id !== id && x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase())
      if (item) {
        setShow(true)
        setErrorMessage({ ...errorMessage, 'name': 'Feature With This Name Already Exist' })
      }
      else {
        dispatch(updateFeature({ ...data }))


        navigate("/admin/feature")
      }

    }

  }

  useEffect(() => {
    (() => {
      dispatch(getFeature())
      if (FeatureStateData.length) {

        let item = FeatureStateData.find(x => x.id === id)
        if (item)
          setData({ ...data, ...item })

        else
          navigate("/admin/feature")

      }
    })()
  }, [FeatureStateData.length])
  return (
    <>
      <Hero title="admin" />

      <div className="container-fluid my-2">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h4 className='bg-dark text-center text-light p-2 '> Update Feature
              <Link to="/admin/feature"><i className='bi bi-arrow-left text-light float-end fs-3'></i></Link>
            </h4>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-12 mb-3">
                  <label>Name*</label>
                  <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Feature Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : null}
                </div>

                <div className="col-12 mb-3">
                  <label>Short Description*</label>
                  <textarea rows={3} name="shortDescription" value={data.shortDescription} onChange={getInputData} placeholder='Feature Name' className={`form-control ${show && errorMessage.shortDescription ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.shortDescription ? <p className='text-danger text-capitalize'>{errorMessage.shortDescription}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Icon*</label>
                  <input type="text" name="icon" value={data.icon} onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-dark'}`} placeholder="Icon tag of Bootstrap icons eg. <i class='bi bi-list'>/</i> " />
                  {show && errorMessage.pic ? <p className='text-danger text-capitalize'>{errorMessage.pic}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Status</label>
                  <select name="status" value={data.status ? "1" : "0"} onChange={getInputData} className='form-select border-dark'>
                    <option value="1">Active</option>
                    <option value="0">In-active</option>
                  </select>
                </div>


                <div className="col-12 mb-3">
                  <button type="submit" className='btn btn-dark w-100'>Update</button>
                </div>



              </div>

            </form>

          </div>
        </div>

      </div>

    </>
  )
}
