import React, { useEffect, useState } from 'react'
import FormValidator from '../../Validators/FormValidator'

export default function UpdateProfile(props) {
  let [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: ""
  })

  let [errorMessage, setErrorMessage] = useState({
    name: '',
    username: '',
    email: '',
    phone: ''
  })
  let [show, setShow] = useState(false)

  function getInputData(e) {
    let { name, value } = e.target
    setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
    setUser({ ...user, [name]: value })
  }

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      let item = response.find(x => x.id !== user.id && (x.username?.toLocaleLowerCase() === user.username?.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === user.email?.toLocaleLowerCase()))
      if (item) {
        setShow(true)
        setErrorMessage({
          ...errorMessage,
          'username': item.username?.toLocaleLowerCase() === user.username?.toLocaleLowerCase() ? "UserName Already in Used" : "",
          'email': item.email?.toLocaleLowerCase() === user.email?.toLocaleLowerCase() ? "Email Address Already in Used" : "",
        })
      }
      else {
        response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${user.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ ...user })
        })
        response = await response.json()
        props.setOption(1)
      }
    }
  }

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      setUser({ ...user, ...response })
    })()
  },[])
  return (
    <>
      <form onSubmit={postData}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Name*</label>
            <input type="text" name="name" value={user.name} onChange={getInputData} placeholder='Full Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
            {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
          </div>

          <div className="col-md-6 mb-3">
            <label>Phone*</label>
            <input type="text" name="phone" value={user.phone} onChange={getInputData} placeholder='Phone Number' className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-dark'}`} />
            {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
          </div>

          <div className="col-md-6 mb-3">
            <label>UserName*</label>
            <input type="text" name="username" value={user.username} onChange={getInputData} placeholder='Username' className={`form-control ${show && errorMessage.username ? 'border-danger' : 'border-dark'}`} />
            {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
          </div>

          <div className="col-md-6 mb-3">
            <label>Email*</label>
            <input type="email" name="email" value={user.email} onChange={getInputData} placeholder='Email Address' className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-dark'}`} />
            {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
          </div>

          <div className="col-12 mb-3">
            <button type="submit" className='btn btn-dark w-100'>Update</button>
          </div>

        </div>
      </form>
    </>
  )
}
