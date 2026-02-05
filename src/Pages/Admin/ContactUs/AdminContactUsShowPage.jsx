import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Hero from '../../../Components/Hero'
import AdminSidebar from '../../../Components/AdminSidebar'

import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreators/ContactUsActionCreators"
import { useNavigate, useParams } from 'react-router-dom';

export default function AdminContactUsShowPage() {
  let { id } = useParams()
  let [data, setData] = useState([])

  let [flag, setFlag] = useState(false)
  let ContactUsStateData = useSelector(state => state.ContactUsStateData)

  let dispatch = useDispatch()
  let navigate = useNavigate()

  function deleterecord(id) {
    if (window.confirm("Are you sure to delete that record")) {
      dispatch(deleteContactUs({ id: id }))
     navigate("/admin/contactus")
    }
  }

  function updaterecord() {
    if (window.confirm("Are you sure to update status of that record")) {
      data.status = !data.status
      dispatch(updateContactUs({ ...data }))
      setFlag(!flag)
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getContactUs())
      if (ContactUsStateData.length) {
        let item = ContactUsStateData.find(x => x.id === id)
        if (item)
          setData(item)
        else
          navigate("/admin/contactus")
      }
    })()
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
            <h4 className='bg-dark text-center text-light p-2 '>ContactUs Query</h4>
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <th>Id</th>
                  <td>{data.id}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{data.email}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{data.phone}</td>
                </tr>
                <tr>
                  <th>Subject</th>
                  <td>{data.subject}</td>
                </tr>
                <tr>
                  <th>Message</th>
                  <td>{data.message}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{new Date(data.date).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{data.status ? "Active" : "In-Active"}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    {
                      data.status ?
                        <button onClick={updaterecord} className='btn btn-dark w-100'>Update Status</button> :
                        <button onClick={deleterecord} className='btn btn-danger w-100'>Delete</button>
                    }
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>

    </>
  )
}
