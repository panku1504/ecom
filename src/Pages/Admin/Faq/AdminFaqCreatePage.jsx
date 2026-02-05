import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Await, Link, useNavigate } from 'react-router-dom'

import Hero from '../../../Components/Hero'
import AdminSidebar from '../../../Components/AdminSidebar'

import FormValidator from '../../../Validators/FormValidator'

import { getFaq, createFaq } from "../../../Redux/ActionCreators/FaqActionCreators"
export default function AdminFaqCreatePage() {
  let [data, setData] = useState({
    question: "",
    answer: "",
    status: true,
  })

  let [errorMessage, setErrorMessage] = useState({
    question: "Question Field is Mandatory",
    answer: "Answer Field is Mandatory"
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

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let item = FaqStateData.find(x => x.question.toLocaleLowerCase() === data.question.toLocaleLowerCase())
      if (item) {
        setShow(true)
        setErrorMessage({ ...errorMessage, 'question': 'Faq With This Quesiton Already Exist' })
      }
      else {
        dispatch(createFaq({ ...data }))
        navigate("/admin/faq")
      }

    }

  }

  useEffect(() => {
    (() => {
      dispatch(getFaq())
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
            <h4 className='bg-dark text-center text-light p-2 '> Create Faq
              <Link to="/admin/faq"><i className='bi bi-arrow-left text-light float-end fs-3'></i></Link>
            </h4>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-12 mb-3">
                  <label>Question*</label>
                  <input type="text" name="question" onChange={getInputData} placeholder='Faq Question' className={`form-control ${show && errorMessage.question ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.question ? <p className='text-danger text-capitalize'>{errorMessage.question}</p> : null}
                </div>

                <div className="col-12 mb-3">
                  <label>Answer*</label>
                  <textarea rows={3} name="answer" onChange={getInputData} placeholder='Faq Answer' className={`form-control ${show && errorMessage.answer ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.answer ? <p className='text-danger text-capitalize'>{errorMessage.answer}</p> : null}
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
