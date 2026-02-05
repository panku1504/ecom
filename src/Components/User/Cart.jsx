import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';

import { getCart, deleteCart, updateCart } from "../../Redux/ActionCreators/CartActionCreators"
import { createCheckout } from "../../Redux/ActionCreators/CheckoutActionCreators"
import { getProduct, updateProduct } from "../../Redux/ActionCreators/ProductActionCreators"
import { getWishlist, createWishlist } from "../../Redux/ActionCreators/WishlistActionCreators"

export default function Cart({ title, selected }) {
    let [flag, setFlag] = useState(true)
    let [data, setData] = useState([])
    let [subtotal, setSubTotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)

    let CartStateData = useSelector(state => state.CartStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let WishlistStateData = useSelector((state) => state.WishlistStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate()

    function placeOrder() {
        let item = {
            user: localStorage.getItem("userid"),
            deliveryAddress: selected.deliveryAddress,
            paymentMode: selected.paymentMode,
            orderStatus: "Order is Placed",
            paymentStatus: "Pending",
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            date: new Date(),
            products: data
        }
        dispatch(createCheckout(item))
        data.forEach(x => {
            let product = ProductStateData.find(p => p.id === x.product)
            product.stockQuantity = product.stockQuantity - x.quantity
            product.stock = product.stockQuantity === 0 ? false : true
            dispatch(updateProduct(product))
            dispatch(deleteCart({ id: x.id }))
        })
        navigate("/confirmation")
    }

    function deleterecord(id) {
        if (window.confirm("Are you sure to delete that record")) {
            dispatch(deleteCart({ id: id }))
            setData(data.filter(x => x.id !== id))
        }
    }

    function updateRecord(option, id) {
        let item = data.find(x => x.id === id)
        if (option === "Dec" && item.quantity === 1)
            return
        else if (option === "Dec") {
            item['quantity'] = item['quantity'] - 1
            item['total'] = item['total'] - item['price']
        }
        else if (option === "Inc" && item.quantity < item.stockQuantity) {
            item['quantity'] = item['quantity'] + 1
            item['total'] = item['total'] + item['price']
        }
        dispatch(updateCart(item))
        let index = data.findIndex(x => x.id === id)
        data[index] = { ...item }
        calculate(data)
    }

    function calculate(data) {
        let sum = 0
        data.forEach((x) => sum = sum + x.total)
        if (sum < 1000) {
            setShipping(150)
            setTotal(sum + 150)
        }
        else {
            setShipping(0)
            setTotal(sum)
        }
        setSubTotal(sum)
    }

    function addToWishlist(id) {
        let cartItem = data.find(x => x.id === id)
        let item = WishlistStateData.find(x => x.user === localStorage.getItem("userid") && x.product === cartItem.product)
        if (!item) {
            let product = ProductStateData.find(x => x.id === cartItem.product)
            let item = {
                user: localStorage.getItem("userid"),
                product: product.id,
                name: product.name,
                brand: product.brand,
                stockQuantity: product.stockQuantity,
                pic: product.pic[0],
                color: product.color,
                size: product.size,
                price: product.finalPrice,

            }
            dispatch(createWishlist(item))

        }
        dispatch(deleteCart({ id: id }))
        let updatedRecord = data.filter(x => x.id !== id)
        setData(updatedRecord)
        calculate(updatedRecord)
        checkCartItemsStockQuantity(updateRecord)
        toast(`Item Has Been Moved To the Wishlist`)
    }

    function check(id) {
        let product = ProductStateData.find(x => x.id === id)
        if (product?.stock === false) {
            setFlag(false)
            return false
        }
        else
            return product?.stockQuantity
    }

    function checkCartItemsStockQuantity(data) {
        setFlag(true)
        data.forEach((x, index) => {
            if (data[index].stockQuantity)
                data[index].stockQuantity = check(x.product)
        })
        setData(data)
        calculate(data)
    }

    useEffect(() => {
        let time = setTimeout(() => {
            (() => {
                dispatch(getCart())
                if (CartStateData.length) {
                    let data = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
                    checkCartItemsStockQuantity(data)
                }
            })()
        }, 1);
        return () => clearTimeout(time)
    }, [CartStateData.length])

    useEffect(() => {
        (() => dispatch(getProduct()))()
    }, [ProductStateData.length])

    useEffect(() => {
        (() => dispatch(getWishlist()))()
    }, [WishlistStateData.length])
    return (
        <>
            {
                data.length ?
                    <>
                        <ToastContainer />

                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        {title === "Checkout" ? null : <th>Pic</th>}
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        {title === "Checkout" ? null : <th>Stock Quantity</th>}
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        {title === "Checkout" ? null : <th></th>}
                                        {title === "Checkout" ? null : <th></th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item) => {
                                            return <tr key={item.id}>
                                                <td className={item.stockQuantity ? '' : 'text-danger'}>{item.name}</td>
                                                {title === "Checkout" ? null : <td>
                                                    <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic}`} target='_blank' rel='noreferrer'>
                                                        <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic}`} height={60} width={80} alt="" />
                                                    </Link>
                                                </td>}
                                                <td>{item.brand}</td>
                                                <td>{item.color}</td>
                                                <td>{item.size}</td>
                                                {title === "Checkout" ? null : <td>{`${item.stockQuantity ? item.stockQuantity + "left in stock" : "out of stock"}`}</td>}
                                                <td>&#8377;{item.price}</td>
                                                <td>
                                                    <div className="btn-group">
                                                        {title === "Checkout" ? null : <button className='btn btn-dark' onClick={() => updateRecord('Dec', item.id)}><i className='bi bi-dash'></i></button>}
                                                        <h4 className='mx-3'>{item.quantity}</h4>
                                                        {title === "Checkout" ? null : <button className='btn btn-dark' onClick={() => updateRecord('Inc', item.id)}><i className='bi bi-plus'></i></button>}
                                                    </div>
                                                </td>
                                                <td>&#8377;{item.total}</td>
                                                {title === "Checkout" ? null : <td><button className='btn btn-danger' onClick={() => deleterecord(item.id)}><i className='bi bi-trash3'></i></button></td>}
                                                {title === "Checkout" ? null : <td><button className='btn btn-dark' onClick={() => addToWishlist(item.id)}>Move To Wishlist</button></td>}
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="row">
                            <div className="col-md-6"></div>
                            <div className={`${title === "Checkout" ? 'col-12' : 'col-md-6'}`}>
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th>SubTotal</th>
                                            <td>&#8377;{subtotal}</td>
                                        </tr>
                                        <tr>
                                            <th>Shipping</th>
                                            <td>&#8377;{shipping}</td>
                                        </tr>
                                        <tr>
                                            <th>Total</th>
                                            <td>&#8377;{total}</td>
                                        </tr>
                                        <tr>
                                            {
                                                flag ?
                                                    <td colSpan={2}>
                                                        {title === "Checkout" ?
                                                            <button onClick={placeOrder} className='btn btn-dark w-100'>Place order</button>
                                                            : <Link to="/Checkout" className='btn btn-dark w-100'>Proceed To Checkout</Link>}
                                                    </td> :
                                                    <td colSpan={2}>
                                                        <div className="card p-3 text-danger">
                                                            One Or More Products From Your Cart Are Out Of Stock, Please Remove Them or Move Them To Wishlist To Place Order
                                                        </div>
                                                    </td>
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </> :
                    <div className='card p-5 text-center'>
                        <h3>No Items in Cart</h3>
                        <Link to="/shop" className='btn btn-dark w-50 m-auto' >Shop Now</Link>
                    </div>
            }
        </>
    )
}
