import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import $ from 'jquery'; // import jquery
import 'datatables.net-dt/css/datatables.datatables.min.css'; //import data table styles
import 'datatables.net';

import Hero from '../../../Components/Hero'
import AdminSidebar from '../../../Components/AdminSidebar'

import { getCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreators"

export default function AdminCheckoutPage() {
  let [data, setData] = useState([])

  let CheckoutStateData = useSelector(state => state.CheckoutStateData)

  let dispatch = useDispatch()

  useEffect(() => {
    let time = (() => {
      dispatch(getCheckout())
      if (CheckoutStateData.length) {
        setData(CheckoutStateData)
        let time = setTimeout(() => {
          $('#DataTable').DataTable()
        }, 500)
        return time
      }
    })()
    return () => clearTimeout(time)
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
            <h4 className='bg-dark text-center text-light p-2 '>Checkout</h4>
            <div className="table-responsive">
              <table id="DataTable" className='table table-bordered table-striped '>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Buyer</th>
                    <th>Order Status</th>
                    <th>Payment Mode</th>
                    <th>Payment Status</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => {
                    return <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item?.deliveryAddress?.name}, {item?.deliveryAddress?.city}</td>
                      <td>{item.orderStatus}</td>
                      <td>{item.paymentMode}</td>
                      <td>{item.paymentStatus}</td>
                      <td>&#8377;{item.total}</td>
                      <td>{new Date(item.date).toLocaleString()}</td>
                      <td><Link to={`/admin/checkout/show/${item.id}`} className='btn btn-dark'><i className='bi bi-eye'></i></Link></td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}
