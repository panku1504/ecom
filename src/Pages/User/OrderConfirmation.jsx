import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderConfirmation() {
  return (
    <div className="container my-5">
      <div className="card p-5 text-center">
        <h1>Thank You</h1>
        <h2>Your Order Has Been Placed</h2>
        <h3>To Track Your Order, Please Visit Profile Page</h3>
        <div className="btn-group w-75 m-auto">
          <Link className='btn btn-dark' to="/shop">Shop More!</Link>
          <Link className='btn btn-success' to="/profile?option=5">Orders</Link>
        </div>
      </div>
    </div>
  )
}
