import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import $ from 'jquery'; // import jquery
import "datatables.net-dt/css/dataTables.dataTables.min.css"; //import data table styles
import 'datatables.net';

import Hero from '../../../Components/Hero'
import AdminSidebar from '../../../Components/AdminSidebar'

import { getFeature, deleteFeature } from "../../../Redux/ActionCreators/FeatureActionCreators"

export default function AdminFeaturePage() {
  let [data, setData] = useState([])

  let FeatureStateData = useSelector(state => state.FeatureStateData)

  let dispatch = useDispatch()

  function deleterecord(id) {
    if (window.confirm("Are you sure to delete that record")) {
      dispatch(deleteFeature({ id: id }))
      setData(data.filter(x => x.id !== id))
    }

  }

  useEffect(() => {
    let time = (() => {
      dispatch(getFeature())
      if (FeatureStateData.length) {
        setData(FeatureStateData)
        let time = setTimeout(() => {
          $('#DataTable').DataTable()
        }, 500)
        return time
      }
    })()
    return () => clearTimeout(time)
  }, [FeatureStateData.length])

  return (
    <>
      <Hero title="admin" />

      <div className="container-fluid my-2">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h4 className='bg-dark text-center text-light p-2 '>Feature
              <Link to="/admin/feature/create"><i className='bi bi-plus text-light float-end fs-3'></i></Link>
            </h4>
            <div className="table-responsive">
              <table id="DataTable" className='table table-bordered table-striped '>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Icon</th>
                    <th>Short Description</th>
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
                      <td><span className='fs-1 text-dark' dangerouslySetInnerHTML={{ __html: item.icon }}></span></td>
                      <td>{item.shortDescription}</td>
                      <td>{item.status ? "Active" : "Inactive"}</td>
                      <td><Link to={`/admin/feature/update/${item.id}`} className='btn btn-dark'><i className='bi bi-pencil-square'></i></Link></td>
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
