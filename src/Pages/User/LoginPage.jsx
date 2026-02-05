import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Hero from '../../Components/Hero'

export default function LoginPage() {
  let [showPassword, setShowPassword] = useState(false)
  let [data, setData] = useState({
    username: '',
    password: ''
  })
  let [errorMessage, setErrorMessage] = useState("")
  let navigate = useNavigate()

  function getInputData(e) {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  async function postData(e) {
    e.preventDefault()

    let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
    response = await response.json()
    let item = response.find(x => x.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data.username?.toLocaleLowerCase())
    if (item && item.password === data.password) {
      if(item.status===false){
        setErrorMessage("Your Account Has Been Blocked Temporarily Becasue of Some Unauthorized Activity, Please Contact us to UnBlock Your Account")
      }
      else{
        localStorage.setItem("login", true)
        localStorage.setItem("userid", item.id)
        localStorage.setItem("name", item.name)
        localStorage.setItem("role", item.role)
        if (item.role === "Buyer")
          navigate("/profile")
        else
          navigate("/admin")
      }
    }
    else
      setErrorMessage("Invalid UserName or Password")
  }
  return (
    <>
      <Hero title="Login - To Your Account" />


      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-7 col-md-9 col-sm-11 m-auto">
            <h5 className='bg-dark text-center p-2 text-light'>Login - To Your Account</h5>
            <form onSubmit={postData}>
              <div className="row">

                <div className="mb-3">
                  <label>UserName*</label>
                  <input type="text" name="username" onChange={getInputData} placeholder='Username' className={`form-control ${errorMessage ? 'border-danger' : 'border-dark'}`} />
                  {errorMessage ? <p className='text-danger'>{errorMessage}</p> : null}
                </div>

                <div className="mb-3">
                  <label>Password*</label>
                  <div className="btn-group w-100">
                    <input type={showPassword ? "text" : "password"} name="password" onChange={getInputData} placeholder='Password' className={`rounded-0 rounded-start form-control ${errorMessage ? 'border-danger' : 'border-dark'}`} />
                    <button onClick={() => setShowPassword(!showPassword)} type='button' className={`btn btn-dark ${errorMessage ? 'border-danger' : 'border-dark'}`}><i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i></button>
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <button type="submit" className='btn btn-dark w-100'>Login</button>
                </div>

              </div>
            </form>
            <div className='d-flex justify-content-between'>
              <Link to="#">Forget Password</Link>
              <Link to="/signup">Doesn't Have an Account? Signup</Link>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
