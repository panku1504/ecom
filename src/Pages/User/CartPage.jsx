import React from 'react'
import Hero from '../../Components/Hero'
import Cart from '../../Components/User/Cart'

export default function CartPage() {
    return (
        <>
            <Hero title="Manage Cart" />

            <div className="container-fluid my-3">

                <Cart title="Cart" selected={{}} />
            </div>

        </>
    )
}
