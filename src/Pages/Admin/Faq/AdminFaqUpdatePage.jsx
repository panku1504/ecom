import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Await, Link, useNavigate, useParams } from 'react-router-dom'

import Hero from '../../../Components/Hero'
import AdminSidebar from '../../../Components/AdminSidebar'

import FormValidator from '../../../Validators/FormValidator'


import { getFaq, updateFaq } from "../../../Redux/ActionCreators/FaqActionCreators"


export default function AdminFaqUpdatePage() {
  let { id } = useParams()
  let [data, setData] = useState({
    question: "",
    answer: "",
    status: true,
  })

  let [errorMessage, setErrorMessage] = useState({
    question: "",
    answer: ""
  })

  let [show, setShow] = useState(false)

  let FaqStateData = useSelector(state => state.FaqStateData)
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
      let item = FaqStateData.find(x => x.id !== id && x.question.toLocaleLowerCase() === data.question.toLocaleLowerCase())
      if (item) {
        setShow(true)
        setErrorMessage({ ...errorMessage, 'question': 'Faq With This Quesiton Already Exist' })
      }
      else {
        dispatch(updateFaq({ ...data }))


        navigate("/admin/faq")
      }

    }

  }

  useEffect(() => {
    (() => {
      dispatch(getFaq())
      if (FaqStateData.length) {

        let item = FaqStateData.find(x => x.id === id)
        if (item)
          setData({ ...data, ...item })

        else
          navigate("/admin/faq")

      }
    })()
  }, [FaqStateData.length])
  return (
    <>
      <Hero title="admin" />

      <div className="container-fluid my-2">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h4 className='bg-dark text-center text-light p-2 '> Update Faq
              <Link to="/admin/faq"><i className='bi bi-arrow-left text-light float-end fs-3'></i></Link>
            </h4>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-12 mb-3">
                  <label>Question*</label>
                  <input type="text" name="question" value={data.question} onChange={getInputData} placeholder='Faq Question' className={`form-control ${show && errorMessage.question ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.question ? <p className='text-danger text-capitalize'>{errorMessage.question}</p> : null}
                </div>

                <div className="col-12 mb-3">
                  <label>Answer*</label>
                  <textarea rows={3} name="answer" value={data.answer} onChange={getInputData} placeholder='Faq Answer' className={`form-control ${show && errorMessage.answer ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.answer ? <p className='text-danger text-capitalize'>{errorMessage.answer}</p> : null}
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
