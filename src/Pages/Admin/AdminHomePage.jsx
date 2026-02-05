import React, { useEffect, useState } from 'react'
import Hero from '../../Components/Hero'
import AdminSidebar from '../../Components/AdminSidebar'

export default function AdminHomePage() {
  let [data, setData] = useState({})

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      setData({ ...response })
    })()
  }, [])
  return (
    <>
      <Hero title="admin" />

      <div className="container-fluid my-2">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h4 className='bg-dark text-center text-light p-2 '>Admin</h4>
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <th>Name </th>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <th>Username </th>
                  <td>{data.username}</td>
                </tr>
                <tr>
                  <th>Email </th>
                  <td>{data.email}</td>
                </tr>
                <tr>
                  <th>Phone </th>
                  <td>{data.phone}</td>
                </tr>
                <tr>
                  <th>Role </th>
                  <td>{data.role}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </>
  )
}
