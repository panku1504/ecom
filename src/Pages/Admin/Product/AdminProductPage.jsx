import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import $ from 'jquery'; // import jquery
import 'datatables.net-dt/css/datatables.datatables.min.css'; //import data table styles
import 'datatables.net';

import Hero from '../../../Components/Hero'
import AdminSidebar from '../../../Components/AdminSidebar'

import { getProduct, deleteProduct } from "../../../Redux/ActionCreators/ProductActionCreators"

export default function AdminProductPage() {
  let [data, setData] = useState([])

  let ProductStateData = useSelector(state => state.ProductStateData)

  let dispatch = useDispatch()

  function deleterecord(id) {
    if (window.confirm("Are you sure to delete that record")) {
      dispatch(deleteProduct({ id: id }))
      setData(data.filter(x => x.id !== id))
    }

  }

  useEffect(() => {
    dispatch(getProduct())

    if (ProductStateData.length) {
      setData(ProductStateData)
      const timeout = setTimeout(() => {
        $('#DataTable').DataTable()
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [ProductStateData.length])

  return (
    <>
      <Hero title="admin" />

      <div className="container-fluid my-2">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h4 className='bg-dark text-center text-light p-2 '>Product
              <Link to="/admin/product/create"><i className='bi bi-plus text-light float-end fs-3'></i></Link>
            </h4>
            <div className="table-responsive">
              <table id="DataTable" className='table table-bordered table-striped '>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Maincategory</th>
                    <th>Subcategory</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Base Price</th>
                    <th>Discount</th>
                    <th>Final Price</th>
                    <th>Stock</th>
                    <th>Stock Quantity</th>
                    <th>pic</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => {
                    return <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.maincategory}</td>
                      <td>{item.subcategory}</td>
                      <td>{item.brand}</td>
                      <td>{item.color.join()}</td>
                      <td>{item.size.join()}</td>
                      <td>&#8377;{item.basePrice}</td>
                      <td>{item.discount}%</td>
                      <td>&#8377;{item.finalPrice}</td>
                      <td>{item.stock ? "In Stock" : "Out Of Stock"}</td>
                      <td>{item.stockQuantity}</td>
                      <td>
                        <div style={{ width: 400 }}>

                          {item.pic?.map((p, index) => {
                            return <Link key={index} to={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${p}`} target='_blank' rel='noreferrer'>
                              <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${p}`} height={70} width={80} className='m-1' alt="" />
                            </Link>
                          })}
                        </div>

                      </td>

                      <td>{item.status ? "Active" : "Inactive"}</td>
                      <td><Link to={`/admin/product/update/${item.id}`} className='btn btn-dark'><i className='bi bi-pencil-square'></i></Link></td>
                      <td>{localStorage.getItem("role") === "Super Admin" ? <button className='btn btn-danger' onClick={() => deleterecord(item.id)}><i className='bi bi-trash3'></i></button> : null}</td>
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
