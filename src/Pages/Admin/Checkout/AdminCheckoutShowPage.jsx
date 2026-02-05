import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Hero from '../../../Components/Hero'
import AdminSidebar from '../../../Components/AdminSidebar'

import { getCheckout, updateCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreators"

export default function AdminCheckoutShowPage() {
  let { id } = useParams()
  let [data, setData] = useState([])
  let [flag, setFlag] = useState(false)

  let [orderStatus, setOrderStatus] = useState("")
  let [paymentStatus, setPaymentStatus] = useState("")

  let CheckoutStateData = useSelector(state => state.CheckoutStateData)

  let dispatch = useDispatch()
  let navigate = useNavigate()

  function updaterecord() {
    if (window.confirm("Are you sure to update status of that record")) {
      data.orderStatus = orderStatus
      data.paymentStatus = paymentStatus
      dispatch(updateCheckout({ ...data }))
      setFlag(!flag)
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getCheckout())
      if (CheckoutStateData.length) {
        let item = CheckoutStateData.find(x => x.id === id)
        if (item) {
          setData(item)
          setOrderStatus(item.orderStatus)
          setPaymentStatus(item.paymentStatus)
        }
        else
          navigate("/admin/Checkout")
      }
    })()
  }, [CheckoutStateData.length])

  return (
    <>
      <Hero title="admin" />

      <div className="container-fluid my-2">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h4 className='bg-dark text-center text-light p-2 '>Checkout Record</h4>
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <th>Id</th>
                  <td>{data.id}</td>
                </tr>
                <tr>
                  <th>Buyer</th>
                  <td>
                    {data?.deliveryAddress?.name},<br />
                    {data?.deliveryAddress?.email}, {data?.deliveryAddress?.phone},<br />
                    {data?.deliveryAddress?.address},<br />
                    {data?.deliveryAddress?.city},{data?.deliveryAddress?.state}({data?.deliveryAddress?.pin}) <br />
                  </td>
                </tr>
                <tr>
                  <th>Order Status</th>
                  <td>{data.orderStatus}

                    {data.orderStatus !== "Delivered" ?
                      <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} className='form-select border-dark mt-3'>
                        <option>Order is Placed</option>
                        <option>Order is Packed</option>
                        <option>Order is Ready to Ship</option>
                        <option>Order is In-transit</option>
                        <option>Order is Reached at Final Delivery Station</option>
                        <option>Order is Out for Delivery</option>
                        <option>Delivered</option>
                      </select> : null
                    }
                  </td>
                </tr>
                <tr>
                  <th>Payment Mode</th>
                  <td>{data.paymentMode}</td>
                </tr>
                <tr>
                  <th>Payment Status</th>
                  <td>{data.paymentStatus}
                    {data.paymentStatus !== "Payment Done" ?
                      <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className='form-select border-dark mt-3'>
                        <option>Pending</option>
                        <option>Payment Done</option>
                      </select> : null
                    }
                  </td>
                </tr>
                <tr>
                  <th>Sub-Total</th>
                  <td>&#8377;{data.subtotal}</td>
                </tr>
                <tr>
                  <th>Shippig Amount</th>
                  <td>&#8377;{data.shipping}</td>
                </tr>
                <tr>
                  <th>Total Amount</th>
                  <td>&#8377;{data.total}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{new Date(data.date).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>RPPID</th>
                  <td>{data.rppid ? data.rppid : "N/A"}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {
                      data.orderstatus !== "Delivered" || data.paymentStatus === "Pending" ?
                        <button onClick={updaterecord} className='btn btn-dark w-100'>Update Status</button> :
                        null
                    }
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="table-respnsive">
              <h5>Products in this Order</h5>
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
                  </tr>
                </thead>
                <tbody>
                  {
                    data?.products?.map((x) => {
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
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}
