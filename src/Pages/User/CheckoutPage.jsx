import React, { useEffect, useState } from 'react'
import Hero from '../../Components/Hero'
import Cart from '../../Components/User/Cart'
import { Link } from 'react-router-dom'

export default function CheckoutPage() {
    let [address, setAddress] = useState([])
    let [selected, setSelected] = useState({
        deliveryAddress: {},
        paymentMode: "COD"
    })

    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/address`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            let data = response.filter(x => x.user === localStorage.getItem("userid"))
            setAddress(data)
            setSelected({ ...selected, 'deliveryAddress': data[0] })
        })()
    }, [])
    return (
        <>
            <Hero title="Place Your Order" />
            <div className="container-fluid my-3">
                {
                    address.length ?
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="mb-3">
                                    <h5 className='bg-dark text-center text-light p-2'>Select Delivery Address</h5>
                                    {address.map(item => {
                                        return <div className='card p-3 mb-3' onClick={() => setSelected({ ...selected, 'deliveryAddress': item })}>
                                            <div className="row position-relative">
                                                <h6>{item.name}</h6>
                                                <h6>{item.email} , {item.phone}</h6>
                                                <h6>{item.address}</h6>
                                                <h6>{item.pin} , {item.city}, {item.state}</h6>
                                                {selected.deliveryAddress?.id === item.id ? <i className='bi bi-check fs-3 position-absolute' style={{ top: "25px", left: "92%" }}></i> : null}
                                            </div>
                                        </div>
                                        
                                    })}
                                </div>
                                <div className="mb-3">
                                    <h5 className='bg-dark text-center text-light p-2'>Select Payment Mode</h5>
                                    <div className="card p-3" onClick={() => setSelected({ ...selected, 'paymentMode': 'COD' })}>
                                        <h6> COD (Cash On Delivery)</h6>
                                        {selected.paymentMode === "COD" ? <i className='bi bi-check fs-3 position-absolute' style={{ top: "5px", left: "92%" }}></i> : null}
                                    </div>
                                    <div className="card p-3" onClick={() => setSelected({ ...selected, 'paymentMode': 'Net Banking' })}>
                                        <h6> Net Banking/Card/UPI/EMI, etc</h6>
                                        {selected.paymentMode === "Net Banking" ? <i className='bi bi-check fs-3 position-absolute' style={{ top: "5px", left: "92%" }}></i> : null}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <h5 className='bg-dark text-center text-light p-2'>Your Cart Items</h5>
                                <Cart title="Checkout" selected={selected} />
                            </div>
                        </div> :
                        <div className='card p-5 text-center'>
                            <h3>No Address Found Please Provide Delivery Address To Place Order</h3>
                            <Link to="/profile?option=3" className='btn btn-dark w-50 m-auto' >Profile</Link>
                        </div>
                }
            </div>

        </>
    )
}
