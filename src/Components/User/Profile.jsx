import React, { useEffect, useState } from 'react'

export default function Profile() {
    let [user, setUser] = useState({})

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            setUser(response)
        })()
    },[])
    return (
        <>
            <table className='table'>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <th>User Name</th>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <th>Phone Number</th>
                        <td>{user.phone}</td>
                    </tr>
                    <tr>
                        <th>Email Address</th>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <th>Role</th>
                        <td>{user.role}</td>
                    </tr>
                </tbody>

            </table>
        </>
    )
}
