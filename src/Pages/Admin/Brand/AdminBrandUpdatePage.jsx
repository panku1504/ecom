import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Await, Link, useNavigate, useParams } from 'react-router-dom'

import Hero from '../../../Components/Hero'
import AdminSidebar from '../../../Components/AdminSidebar'

import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'

import { getBrand, updateBrand } from "../../../Redux/ActionCreators/BrandActionCreators"


export default function AdminBrandUpdatePage() {
  let { id } = useParams()
  let [data, setData] = useState({
    name: "",
    pic: "",
    status: true,
  })

  let [errorMessage, setErrorMessage] = useState({
    name: "",
    pic: ""
  })

  let [show, setShow] = useState(false)

  let BrandStateData = useSelector(state => state.BrandStateData)
  let dispatch = useDispatch()

  let navigate = useNavigate()

  function getInputData(e) {
    let name = e.target.name
    let value = name === "pic" ? "brand/" + (e.target.files[0].name) : e.target.value
    // let value = name === "pic" ?  e.target.files[0] : e.target.value
    setErrorMessage({
      ...errorMessage,
      [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)
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
      let item = BrandStateData.find(x => x.id !== id && x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase())
      if (item) {
        setShow(true)
        setErrorMessage({ ...errorMessage, 'name': 'Brand With This Name Already Exist' })
      }
      else {
        dispatch(updateBrand({ ...data }))

        // let formData = new FormData()
        // formData.append("_id", data._id)
        // formData.append("name", data.name)
        // formData.append("pic", data.pic)
        // formData.append("status", data.status)
        // dispatch(updateBrand(formData))

        navigate("/admin/brand")
      }

    }

  }

  useEffect(() => {
    (() => {
      dispatch(getBrand())
      if (BrandStateData.length) {

        let item = BrandStateData.find(x => x.id === id)
        if (item)
          setData({ ...data, ...item })

        else
          navigate("/admin/brand")

      }
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
            <h4 className='bg-dark text-center text-light p-2 '> Update Brand
              <Link to="/admin/brand"><i className='bi bi-arrow-left text-light float-end fs-3'></i></Link>
            </h4>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-12 mb-3">
                  <label>Name*</label>
                  <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Brand Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Pic</label>
                  <input type="file" name="pic" onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-dark'}`} />
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
