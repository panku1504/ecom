import React, { useEffect, useState } from 'react'
import FormValidator from '../../Validators/FormValidator'
import { ToastContainer, Zoom, toast } from 'react-toastify';

const dataOptions = {
  name: "",
  email: "",
  phone: "",
  address: "",
  pin: "",
  city: "",
  state: ""
}
const errorOptions = {
  name: "Name Field is Mandatory",
  email: "Email Field is Mandatory ",
  phone: "Phone Number Field is Mandatory",
  address: "Address Field is Mandatory",
  pin: "Pincode Field is Mandatory",
  city: "City Field is Mandatory",
  state: " State Field is Mandatory "
}
export default function ManageAddress() {
  let [option, setOption] = useState("Create")
  let [data, setData] = useState(dataOptions)
  let [errorMessage, setErrorMessage] = useState(errorOptions)

  let [show, setShow] = useState(false)

  let [showModal, setShowModal] = useState(false)

  let [address, setAddress] = useState([])

  function getInputData(e) {
    let { name, value } = e.target
    setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
    setData({ ...data, [name]: value })
  }

  function updateRecord(id) {
    setOption("Update")
    let item = address.find(x => x.id === id)
    setData({ ...data, ...item })
    setShowModal(true)
    setErrorMessage(dataOptions)
  }
  function createRecord() {
    setOption("Create")
    setData(dataOptions)
    setShowModal(true)
    setErrorMessage(errorMessage)
  }

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let url = option === "Create" ? `${import.meta.env.VITE_APP_BACKEND_SERVER}/address` : `${import.meta.env.VITE_APP_BACKEND_SERVER}/address/${data.id}`
      let response = await fetch(url, {
        method: option === "Create" ? "POST" : "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...data, user: localStorage.getItem("userid") })
      })
      response = await response.json()
      if (option === "Create")
        setAddress([...address, response])
      else {
        let index = address.findIndex(x => x.id === data.id)
        address[index] = { ...data }
      }
      setShowModal(false)
      toast.success(`Address Has Been ${option} !!!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });
      setData(dataOptions)

    }
  }

  async function deleterecord(id) {
    if (window.confirm("Are you sure to delete that record")) {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/address/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      setAddress(address.filter(x => x.id !== id))
    }
  }


  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/address`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      setAddress(response.filter(x => x.user === localStorage.getItem("userid")))

    })()
  }, [])
  return (
    <>
      <div className=''>
        <button className='float-end btn btn-dark' onClick={createRecord}>Add New Address</button>
      </div>
      <div className='mt-5'>
        {
          address.map(item => {
            return <div key={item.id}>
              <div className="card p-3 m-3">
                <div className="row">
                  <div className="col-9">
                    <h6>{item.name}</h6>
                    <h6>{item.email} , {item.phone}</h6>
                    <h6>{item.address}</h6>
                    <h6>{item.pin} , {item.city} , {item.state}</h6>
                  </div>
                  <div className="col-3">
                    <div className="btn-group">
                      <button className='btn btn-dark' onClick={() => updateRecord(item.id)}><i className='bi bi-pencil-square'></i></button>
                      <button className='btn btn-danger' onClick={() => deleterecord(item.id)}><i className='bi bi-trash3'></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          })
        }
      </div>




      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{option} Address</h1>
              <button type="button" className="btn-close" onClick={() => { setShowModal(false) }}></button>
            </div>
            <form onSubmit={(postData)}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12 mb-3">
                    <label>Name*</label>
                    <input type="text" name="name" onChange={getInputData} value={data.name} placeholder='Full Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Email*</label>
                    <input type="email" name="email" onChange={getInputData} value={data.email} placeholder='Email Address' className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Phone Number*</label>
                    <input type="text" name="phone" onChange={getInputData} value={data.phone} placeholder='Phone Number' className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                  </div>
                  <div className="col-12 mb-3">
                    <label>Address*</label>
                    <textarea name="address" onChange={getInputData} value={data.address} placeholder='Full Address' rows={3} className={`form-control ${show && errorMessage.address ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.address ? <p className='text-danger'>{errorMessage.address}</p> : null}
                  </div>
                  <div className="col-lg-4 col-md-6 mb-3">
                    <label>Pincode*</label>
                    <input type="number" name="pin" onChange={getInputData} value={data.pin} placeholder='Enter Pincode' className={`form-control ${show && errorMessage.pin ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.pin ? <p className='text-danger'>{errorMessage.pin}</p> : null}
                  </div>
                  <div className="col-lg-4 col-md-6 mb-3">
                    <label>City*</label>
                    <input type="text" name="city" onChange={getInputData} value={data.city} placeholder='Enter City' className={`form-control ${show && errorMessage.city ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.city ? <p className='text-danger'>{errorMessage.city}</p> : null}
                  </div>
                  <div className="col-lg-4 col-md-6 mb-3">
                    <label>State*</label>
                    <input type="text" name="state" onChange={getInputData} value={data.state} placeholder='Enter State' className={`form-control ${show && errorMessage.state ? 'border-danger' : 'border-dark'}`} />
                    {show && errorMessage.state ? <p className='text-danger'>{errorMessage.state}</p> : null}
                  </div>

                </div>
              </div>
              <div className="modal-footer">

                <button type="submit" className="btn btn-dark w-100">{option}</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
    </>
  )
}
