import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import $ from 'jquery'; // import jquery
import 'datatables.net-dt/css/dataTables.dataTables.min.css'; //import data table styles
import 'datatables.net';

import Hero from '../../../Components/Hero'
import AdminSidebar from '../../../Components/AdminSidebar'

import { getUser, deleteUser, updateUser } from "../../../Redux/ActionCreators/UserActionCreators"

export default function AdminUserPage() {
  let [data, setData] = useState([])
  let [flag, setFlag] = useState(false)
  let UserStateData = useSelector(state => state.UserStateData)

  let dispatch = useDispatch()

  function deleterecord(id) {
    if (window.confirm("Are you sure to delete that record")) {
      dispatch(deleteUser({ id: id }))
      setData(data.filter(x => x.id !== id))
    }
  }

  function updaterecord(id) {
    if (window.confirm("Are you sure to update status of that record")) {
      let item = data.find(x => x.id === id)
      let itemIndex = data.findIndex(x => x.id === id)
      item.status = !item.status
      dispatch(updateUser({ ...item }))
      data[itemIndex].status = item.status
      setFlag(!flag)
    }
  }

  useEffect(() => {
    let time = (() => {
      dispatch(getUser())
      if (UserStateData.length) {
        setData(UserStateData)
        let time = setTimeout(() => {
          $('#DataTable').DataTable()
        }, 500)
        return time
      }
    })()
    return () => clearTimeout(time)
  }, [UserStateData.length])

  return (
    <>
      <Hero title="admin" />

      <div className="container-fluid my-2">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h4 className='bg-dark text-center text-light p-2 '>User
              <Link to="/admin/user/create"><i className='bi bi-plus text-light float-end fs-3'></i></Link>
            </h4>
            <div className="table-responsive">
              <table id="DataTable" className='table table-bordered table-striped '>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
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
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.role}</td>
                      <td onClick={() => updaterecord(item.id)} style={{ cursor: "pointer" }} title="Click to Change Status">{item.status ? "Active" : "Inactive"}</td>
                      <td>{item.role === "buyer" ? null : <Link to={`/admin/user/update/${item.id}`} className='btn btn-dark'><i className='bi bi-pencil-square'></i></Link>}</td>
                      <td><button className='btn btn-danger' onClick={() => deleterecord(item.id)}><i className='bi bi-trash3'></i></button></td>
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
