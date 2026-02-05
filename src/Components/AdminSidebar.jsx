import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSidebar() {
  return (
    <>
      <div className="list-group">
        <Link to="/admin" className="list-group-item list-group-item-action bg-dark text-light" aria-current="true">
          <i className='bi bi-house fs-5'></i><span className='float-end mt-1'>Home</span>
        </Link>
        <Link to="/admin/maincategory" className="list-group-item list-group-item-action bg-dark text-light" aria-current="true">
          <i className='bi bi-bookmark-plus fs-5'></i><span className='float-end mt-1'>Maincategory</span>
        </Link>
        <Link to="/admin/subcategory" className="list-group-item list-group-item-action bg-dark text-light" aria-current="true">
          <i className='bi bi-bookmarks fs-5'></i><span className='float-end mt-1'>Subcategory</span>
        </Link>
        <Link to="/admin/brand" className="list-group-item list-group-item-action bg-dark text-light" aria-current="true">
          <i className='bi bi-tags fs-5'></i><span className='float-end mt-1'>Brand</span>
        </Link>
        <Link to="/admin/product" className="list-group-item list-group-item-action bg-dark text-light" aria-current="true">
          <i className='bi bi-bookmark-star fs-5'></i><span className='float-end mt-1'>Product</span>
        </Link>
        <Link to="/admin/feature" className="list-group-item list-group-item-action bg-dark text-light" aria-current="true">
          <i className='bi bi-check-circle fs-5'></i><span className='float-end mt-1'>Features</span>
        </Link>
        <Link to="/admin/faq" className="list-group-item list-group-item-action bg-dark text-light" aria-current="true">
          <i className='bi bi-question-circle fs-5'></i><span className='float-end mt-1'>Faq</span>
        </Link>
        <Link to="/admin/setting" className="list-group-item list-group-item-action bg-dark text-light" aria-current="true">
          <i className='bi bi-gear fs-5'></i><span className='float-end mt-1'>Settings</span>
        </Link>
        {
          localStorage.getItem("role") === "Super Admin" ?
            <Link to="/admin/user" className="list-group-item list-group-item-action bg-dark text-light" aria-current="true">
              <i className='bi bi-people fs-5'></i><span className='float-end mt-1'>User</span>
            </Link> : null
        }
        <Link to="/admin/newsletter" className="list-group-item list-group-item-action bg-dark text-light" aria-current="true">
          <i className='bi bi-envelope fs-5'></i><span className='float-end mt-1'>Newsletter</span>
        </Link>
        <Link to="/admin/checkout" className="list-group-item list-group-item-action bg-dark text-light" aria-current="true">
          <i className='bi bi-bag-check-fill fs-5'></i><span className='float-end mt-1'>Checkout</span>
        </Link>
        <Link to="/admin/contactus" className="list-group-item list-group-item-action bg-dark text-light" aria-current="true">
          <i className='bi bi-headset fs-5'></i><span className='float-end mt-1'>Contactus</span>
        </Link>
      </div></>
  )
}
