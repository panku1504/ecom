import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery'; // import jquery
import 'datatables.net-dt/css/datatables.datatables.min.css'; //import data table styles
import 'datatables.net';

import Hero from '../../../Components/Hero'
import AdminSidebar from '../../../Components/AdminSidebar'

import { getNewsletter, deleteNewsletter, updateNewsletter } from "../../../Redux/ActionCreators/NewsletterActionCreators"

export default function AdminNewsletterPage() {
  let [data, setData] = useState([])
  let [flag, setFlag] = useState(false)

  let NewsletterStateData = useSelector(state => state.NewsletterStateData)

  let dispatch = useDispatch()

  function deleterecord(id) {
    if (window.confirm("Are you sure to delete that record")) {
      dispatch(deleteNewsletter({ id: id }))
      setData(data.filter(x => x.id !== id))
    }
  }

  function updaterecord(id) {
    if (window.confirm("Are you sure to update status of that record")) {
      let item = data.find(x => x.id === id)
      let itemIndex = data.findIndex(x => x.id === id)
      item.status = !item.status
      dispatch(updateNewsletter({ ...item }))
      data[itemIndex].status = item.status
      setFlag(!flag)
    }
  }

  useEffect(() => {
    let time = (() => {
      dispatch(getNewsletter())
      if (NewsletterStateData.length) {
        setData(NewsletterStateData)
        let time = setTimeout(() => {
          $('#DataTable').DataTable()
        }, 500)
        return time
      }
    })()
    return () => clearTimeout(time)
  }, [NewsletterStateData.length])

  return (
    <>
      <Hero title="admin" />

      <div className="container-fluid my-2">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h4 className='bg-dark text-center text-light p-2 '>Newsletter</h4>
            <div className="table-responsive">
              <table id="DataTable" className='table table-bordered table-striped '>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => {
                    return <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td onClick={() => updaterecord(item.id)} style={{ cursor: "pointer" }} title="Click to Change Status">{item.status ? "Active" : "In-Active"}</td>
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
