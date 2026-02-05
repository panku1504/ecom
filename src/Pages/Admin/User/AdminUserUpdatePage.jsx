import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Await, Link, useNavigate, useParams } from 'react-router-dom'

import Hero from '../../../Components/Hero'
import AdminSidebar from '../../../Components/AdminSidebar'

import FormValidator from '../../../Validators/FormValidator'

import { getUser, updateUser } from "../../../Redux/ActionCreators/UserActionCreators"


export default function AdminUserUpdatePage() {
  let { id } = useParams()
  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    role: "",
    status: true,
  })

  let [errorMessage, setErrorMessage] = useState({
    name: "",
    username: "",
    email: "",
    phone: ""
  })

  let [show, setShow] = useState(false)

  let UserStateData = useSelector(state => state.UserStateData)
  let dispatch = useDispatch()

  let navigate = useNavigate()

  function getInputData(e) {
    let { name, value } = e.target

    setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
    setData({ ...data, [name]: name === "status" ? (value === "1" ? true : false) : value })
  }

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let item = UserStateData.find(x => x.id !== id && (x.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data.email?.toLocaleLowerCase()))
      if (item) {
        setShow(true)
        setErrorMessage({
          ...errorMessage,
          'username': item.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() ? "UserName Already in Used" : "",
          'email': item.email?.toLocaleLowerCase() === data.email?.toLocaleLowerCase() ? "Email Address Already in Used" : "",
        })
      }
      else {
        dispatch(updateUser({ ...data }))
        navigate("/admin/user")
      }
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getUser())
      if (UserStateData.length) {
        let item = UserStateData.find(x => x.id === id)
        if (item)
          setData({ ...data, ...item })
        else
          navigate("/admin/user")
      }
    })()
  }, [UserStateData.length,])
  return (
    <>
      <Hero title="admin" />

      <div className="container-fluid my-2">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h4 className='bg-dark text-center text-light p-2 '> Update User
              <Link to="/admin/user"><i className='bi bi-arrow-left text-light float-end fs-3'></i></Link>
            </h4>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Name*</label>
                  <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Full Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Phone*</label>
                  <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='phone number' className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.phone ? <p className='text-danger text-capitalize'>{errorMessage.phone}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>User Name*</label>
                  <input type="text" name="username" value={data.username} onChange={getInputData} placeholder='User Name' className={`form-control ${show && errorMessage.username ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.username ? <p className='text-danger text-capitalize'>{errorMessage.username}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Email Address*</label>
                  <input type="text" name="email" value={data.email} onChange={getInputData} placeholder='Email Address' className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.email ? <p className='text-danger text-capitalize'>{errorMessage.email}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Role</label>
                  <select name="role" value={data.role} onChange={getInputData} className='form-select border-dark'>
                    <option>Admin</option>
                    <option>Super Admin</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Status</label>
                  <select name="status" onChange={getInputData} className='form-select border-dark'>
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
