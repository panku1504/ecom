import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Hero from '../../Components/Hero'

import FormValidator from '../../Validators/FormValidator'

export default function SignupPage() {
    let [data, setData] = useState({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        cpassword: ''
    })
    let [errorMessage, setErrorMessage] = useState({
        name: 'Name Field is Mandatory',
        username: 'User Name Field is Mandatory',
        email: 'Email Address Field is Mandatory',
        phone: 'Phone Number Field is Mandatory',
        password: 'Password Field is Mandatory'
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
        setData({ ...data, [name]: value })
    }

    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else if(data.password!==data.cpassword){
            setShow(true)
            setErrorMessage({...errorMessage,'password':'Password and Confirm Password Does Not Matched '})
        }
        else {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            let item = response.find(x => x.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data.email?.toLocaleLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage({
                    ...errorMessage,
                    'username': item.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() ? "UserName Already in Used" : "",
                    'email': item.email?.toLocaleLowerCase() === data.email?.toLocaleLowerCase() ? "Email Address Already in Used" : "",
                })
            }
            else {
                response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ ...data, 'role': 'Buyer', status: true })
                })
                if (response)
                    navigate("/login")
                else
                    alert("Something Went Wrong")
            }
        }
    }
    return (
        <>
            <Hero title="Signup - Create Your Free Account" />


            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-8 m-auto">
                        <h5 className='bg-dark text-center p-2 text-light'>Create Free Account With Us</h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" onChange={getInputData} placeholder='Full Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Phone*</label>
                                    <input type="text" name="phone" onChange={getInputData} placeholder='Phone Number' className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-dark'}`} />
                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>UserName*</label>
                                    <input type="text" name="username" onChange={getInputData} placeholder='Username' className={`form-control ${show && errorMessage.username ? 'border-danger' : 'border-dark'}`} />
                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Email*</label>
                                    <input type="email" name="email" onChange={getInputData} placeholder='Email Address' className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-dark'}`} />
                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Password*</label>
                                    <input type="password" name="password" onChange={getInputData} placeholder='Password' className={`form-control ${show && errorMessage.password ? 'border-danger' : 'border-dark'}`} />
                                    {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Confirm Password*</label>
                                    <input type="password" name="cpassword" onChange={getInputData} placeholder='Confirm Password' className={`form-control ${show && errorMessage.password ? 'border-danger' : 'border-dark'}`} />
                                </div>

                                <div className="col-12 mb-3">
                                    <button type="submit" className='btn btn-dark w-100'>Signup</button>
                                </div>

                            </div>
                        </form>
                        <Link to="/login">Already Have an Account? Login</Link>
                    </div>
                </div>
            </div>

        </>
    )
}
