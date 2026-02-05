import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ToastContainer, Zoom, toast } from 'react-toastify';

import { getCheckout } from "../../Redux/ActionCreators/CheckoutActionCreators"
import { getTestimonial, createTestimonial, updateTestimonial, deleteTestimonial } from "../../Redux/ActionCreators/TestimonialActionCreators"
import { useDispatch, useSelector } from 'react-redux'


export default function Orders() {
  let [orders, setOrders] = useState([])
  let reviewDataOptions = {
    message: "",
    star: 5,
    name: localStorage.getItem("name"),
    user: localStorage.getItem("userid")
  }

  let [reviews, setReviews] = useState([])
  let [option, setOption] = useState("Create")
  let [showModal, setShowModal] = useState(false)
  let [reviewData, setReviewData] = useState(reviewDataOptions)

  let CheckoutStateData = useSelector(state => state.CheckoutStateData)
  let TestimonialStateData = useSelector(state => state.TestimonialStateData)

  let dispatch = useDispatch()

  function writeReview(id) {
    setReviewData({ ...reviewDataOptions, product: id })
    setShowModal(true)
    setOption("Create")
  }

  function updateReview(id) {
    let item = reviews.find(x => x.product === id)
    setReviewData({ ...item })
    setOption("Update")
    setShowModal(true)
  }

  function getInputData(e) {
    let { name, value } = e.target
    setReviewData({ ...reviewData, [name]: value })
  }

  function postData(e) {
    e.preventDefault()
    if (option === "Create") {
      dispatch(createTestimonial({ ...reviewData, star: parseInt(reviewData.star) }))
    }
    else {
      dispatch(updateTestimonial({ ...reviewData, star: parseInt(reviewData.star) }))
    }
    getAPIData()
    setReviewData(reviewDataOptions)
    setShowModal(false)
    toast.success(`Review Has been Submitted !!!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  }

  function checkReview(id) {
    let item = reviews.find(x => x.product === id)
    return item ? true : false
  }

  function deleterecord(id) {
    if (window.confirm("Are you sure to delete that record")) {
      let item = reviews.find(x => x.product === id)
      dispatch(deleteTestimonial({ id: item.id }))
      setReviews(reviews.filter(x => x.id !== item.id))
    }
  }

  function getAPIData() {
    dispatch(getTestimonial())
    setReviews(TestimonialStateData.filter(x => x.user === localStorage.getItem("userid")))
  }

  useEffect(() => {
    (() => {
      dispatch(getCheckout())
      setOrders(CheckoutStateData.filter(x => x.user === localStorage.getItem("userid")))
    })()
  }, [CheckoutStateData.length])

  useEffect(() => {
    getAPIData()
  }, [TestimonialStateData.length])
  return (
    <>
      {
        orders.map(item => {
          return <div className="card p-3 mb-3" key={item.id}>
            <div className="row">
              <div className="col-md-4">
                <div className="table-responsive">
                  <table className='table table-bordered'>
                    <tbody>
                      <tr>
                        <th>ID</th>
                        <td>{item.id}</td>
                      </tr>
                      <tr>
                        <th>Order Status</th>
                        <td>{item.orderStatus}</td>
                      </tr>
                      <tr>
                        <th>Payment Mode</th>
                        <td>{item.paymentMode}</td>
                      </tr>
                      <tr>
                        <th>Payment Status</th>
                        <td>{item.paymentStatus}</td>
                      </tr>
                      <tr>
                        <th>Sub-total</th>
                        <td>&#8377;{item.subtotal}</td>
                      </tr>
                      <tr>
                        <th>Shipping Amount</th>
                        <td>&#8377;{item.shipping}</td>
                      </tr>
                      <tr>
                        <th>Total Amount</th>
                        <td>&#8377;{item.total}</td>
                      </tr>
                      <tr>
                        <th>Date</th>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-8">
                <div className="table-responsive">
                  <table className='table table-bordered'>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Pic</th>
                        <th>Brand</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        item?.products?.map((x) => {
                          return <tr key={x.id}>
                            <td>{x.name}</td>
                            <td>
                              <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${x.pic}`} target='_blank' rel='noreferrer'>
                                <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${x.pic}`} height={60} width={80} alt="" />
                              </Link>
                            </td>
                            <td>{x.brand}</td>
                            <td>{x.color}</td>
                            <td>{x.size}</td>
                            <td>&#8377;{x.price}</td>
                            <td>{x.quantity}</td>
                            <td>&#8377;{x.total}</td>
                            <td><Link to={`/product/${x.product}`} className='btn btn-dark btn-sm'>Buy Again</Link></td>
                            <td>
                              {item.orderStatus === "Delivered" ? checkReview(x.product) ?
                                <>
                                  <button className='btn btn-dark btn-sm' onClick={() => updateReview(x.product)}>Update Review</button>
                                  <button className='btn btn-danger btn-sm' onClick={() => deleterecord(x.product)}>Delete Review</button>
                                </> :
                                <button className='btn btn-dark btn-sm' onClick={() => writeReview(x.product)}>Write Review</button> : null}
                            </td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        })
      }

      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{option} Review</h1>
              <button type="button" className="btn-close" onClick={() => { setShowModal(false) }}></button>
            </div>
            <form onSubmit={(postData)}>
              <div className="row mx-2">
                <div className="col-12 mb-3">
                  <label>Message*</label>
                  <textarea name="message" onChange={getInputData} value={reviewData.message} rows={5} required placeholder='please write your reivew about this product' className='form-control border-dark'></textarea>
                </div>
                <div className='col-lg-6 mb-3'>
                  <label>Star</label>
                  <select name="star" onChange={getInputData} value={reviewData.star} className='form-select border-dark' >
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                  </select>
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
