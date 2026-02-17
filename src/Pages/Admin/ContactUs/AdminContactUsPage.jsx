import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import $ from 'jquery'; // import jquery
import 'datatables.net-dt/css/dataTables.dataTables.min.css'; //import data table styles
import 'datatables.net';

import Hero from '../../../Components/Hero'
import AdminSidebar from '../../../Components/AdminSidebar'

import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreators/ContactUsActionCreators"

export default function AdminContactUsPage() {
  let [data, setData] = useState([])
  let[flag,setFlag] = useState(false)

  let ContactUsStateData = useSelector(state => state.ContactUsStateData)

  let dispatch = useDispatch()

  function deleterecord(id) {
    if (window.confirm("Are you sure to delete that record")) {
      dispatch(deleteContactUs({ id: id }))
      setData(data.filter(x => x.id !== id))
    }
  }

  function updaterecord(id) {
    if (window.confirm("Are you sure to update status of that record")) {
      let item = data.find(x => x.id === id)
      let itemIndex = data.findIndex(x => x.id === id)
      item.status = !item.status
      dispatch(updateContactUs({ ...item }))
      data[itemIndex].status = item.status
     setFlag(!flag)
    }
  }

  useEffect(() => {
    let time = (() => {
      dispatch(getContactUs())
      if (ContactUsStateData.length) {
        setData(ContactUsStateData)
        let time = setTimeout(() => {
          $('#DataTable').DataTable()
        }, 500)
        return time
      }
    })()
    return () => clearTimeout(time)
  }, [ContactUsStateData.length])

  return (
    <>
      <Hero title="admin" />

      <div className="container-fluid my-2">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h4 className='bg-dark text-center text-light p-2 '>ContactUs</h4>
            <div className="table-responsive">
              <table id="DataTable" className='table table-bordered table-striped '>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Date</th>
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
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.subject}</td>
                      <td>{new Date(item.date).toLocaleString()}</td>
                      <td onClick={()=>updaterecord(item.id)} style={{ cursor: "pointer" }} title="Click to Change Status">{item.status ? "Active" : "In-Active"}</td>
                      <td><Link to={`/admin/contactus/show/${item.id}`} className='btn btn-dark'><i className='bi bi-eye'></i></Link></td>
                      <td>{item.status?null:<button className='btn btn-danger' onClick={() => deleterecord(item.id)}><i className='bi bi-trash3'></i></button>}</td>
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
