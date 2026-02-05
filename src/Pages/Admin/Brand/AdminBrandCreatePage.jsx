import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Await, Link, useNavigate } from 'react-router-dom'

import Hero from '../../../Components/Hero'
import AdminSidebar from '../../../Components/AdminSidebar'

import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'

import { getBrand, createBrand } from "../../../Redux/ActionCreators/BrandActionCreators"
export default function AdminBrandCreatePage() {
  let [data, setData] = useState({
    name: "",
    pic: "",
    status: true,
  })

  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mandatory",
    pic: "Pic Field is Mandatory"
  })

  let [show, setShow] = useState(false)

  let BrandStateData = useSelector(state => state.BrandStateData)
  let dispatch = useDispatch()

  let navigate = useNavigate()

  function getInputData(e) {
    let name = e.target.name
    let value = name === "pic" ? "brand/" + (e.target.files[0].name) : e.target.value
    // let value = name === "pic" ?  (e.target.files[0]) : e.target.value
    setErrorMessage({
      ...errorMessage,
      [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)
    })

    setData({
      ...data,
      [name]: name === "status" ? (value === "1" ? true : false) : value
    })

  }

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let item = BrandStateData.find(x => x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase())
      if (item) {
        setShow(true)
        setErrorMessage({ ...errorMessage, 'name': 'Brand With This Name Already Exist' })
      }
      else {
        dispatch(createBrand({ ...data }))

        // let formData = new FormData()
        // formData.append("name", data.name)
        // formData.append("pic", data.pic)
        // formData.append("status", data.status)
        // dispatch(createBrand(formData))


        navigate("/admin/brand")
      }

    }

  }

  useEffect(() => {
    (() => {
      dispatch(getBrand())
    })()
  }, [BrandStateData.length])
  return (
    <>
      <Hero title="admin" />

      <div className="container-fluid my-2">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h4 className='bg-dark text-center text-light p-2 '> Create Brand
              <Link to="/admin/brand"><i className='bi bi-arrow-left text-light float-end fs-3'></i></Link>
            </h4>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-12 mb-3">
                  <label>Name*</label>
                  <input type="text" name="name" onChange={getInputData} placeholder='Brand Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Pic*</label>
                  <input type="file" name="pic" onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.pic ? <p className='text-danger text-capitalize'>{errorMessage.pic}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Status</label>
                  <select name="status" onChange={getInputData} className='form-select border-dark'>
                    <option value="1">Active</option>
                    <option value="0">In-active</option>
                  </select>
                </div>


                <div className="col-12 mb-3">
                  <button type="submit" className='btn btn-dark w-100'>Create</button>
                </div>



              </div>

            </form>

          </div>
        </div>

      </div>

    </>
  )
}
