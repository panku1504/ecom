import React, { useEffect, useState } from 'react'
import Hero from '../../Components/Hero'
import { Link, useSearchParams } from 'react-router-dom'
import Profile from '../../Components/User/Profile'
import UpdateProfile from '../../Components/User/UpdateProfile'
import ManageAddress from '../../Components/User/ManageAddress'
import Wishlist from '../../Components/User/Wishlist'
import Orders from '../../Components/User/Orders'

export default function ProfilePage() {
  let [option, setOption] = useState(1)
  let [searchParams] = useSearchParams()
  let pages = ["Your Profile", "Update Profile", "Manage Address", "Wishlist Items", "Your Orders"]

  useEffect(() => {
    if (searchParams.get("option"))
      setOption(parseInt(searchParams.get("option")))
  }, [searchParams])
  return (
    <>
      <Hero title="Your Profile" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <ul className="list-group">
              <li className={`list-group-item ${option === 1 ? 'bg-dark text-light' : ''}`} onClick={() => setOption(1)} >Home</li>
              <li className={`list-group-item ${option === 2 ? 'bg-dark text-light' : ''}`} onClick={() => setOption(2)} >Update Profile</li>
              <li className={`list-group-item ${option === 3 ? 'bg-dark text-light' : ''}`} onClick={() => setOption(3)} >Manage Address</li>
              <li className={`list-group-item ${option === 4 ? 'bg-dark text-light' : ''}`} onClick={() => setOption(4)} >Wishlist</li>
              <li className={`list-group-item ${option === 5 ? 'bg-dark text-light' : ''}`} onClick={() => setOption(5)} >Orders</li>
              <li className="list-group-item">
                <Link to="/cart" className='text-dark'>cart</Link>
              </li>
              <li className="list-group-item t">
                <Link to="/checkout" className='text-dark'>CheckOut</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-9">
            <h5 className='bg-dark text-center text-light p-2'>{pages[option - 1]}</h5>
            {option === 1 ? <Profile /> : null}
            {option === 2 ? <UpdateProfile setOption={setOption} /> : null}
            {option === 3 ? <ManageAddress /> : null}
            {option === 4 ? <Wishlist /> : null}
            {option === 5 ? <Orders /> : null}
          </div>
        </div>
      </div>
    </>
  )
}
