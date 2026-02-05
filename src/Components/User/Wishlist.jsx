import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getWishlist, deleteWishlist } from "../../Redux/ActionCreators/WishlistActionCreators"
export default function Wishlist() {
  let [data, setData] = useState([])

  let WishlistStateData = useSelector(state => state.WishlistStateData)
  let dispatch = useDispatch()

  function deleterecord(id) {
    if (window.confirm("Are you sure to delete that record")) {
      dispatch(deleteWishlist({ id: id }))
      setData(data.filter(x => x.id !== id))
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getWishlist())
      if (WishlistStateData.length) {
        setData(WishlistStateData.filter(x => x.user === localStorage.getItem("userid")))
      }
    })()
  }, [WishlistStateData.length])
  return (
    <>
      {
        data.length ?
          <div className="table-respnsive">
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Pic</th>
                  <th>Brand</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Stock Quantity</th>
                  <th>Price</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item) => {
                    return <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>
                        <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic}`} target='_blank' rel='noreferrer'>
                          <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic}`} height={60} width={80} alt="" />
                        </Link>
                      </td>
                      <td>{item.brand}</td>
                      <td>{item.color?.join()}</td>
                      <td>{item.size?.join()}</td>
                      <td>{`${item.stockQuantity ? item.stockQuantity + "left in stock" : "out of stock"}`}</td>
                      <td>&#8377;{item.price}</td>
                      <td>{item.stockQuantity ? <Link className='btn btn-dark' to={`/product/${item.product}`}><i className='bi bi-cart'></i></Link> : null}</td>
                      <td><button className='btn btn-danger' onClick={() => deleterecord(item.id)}><i className='bi bi-trash3'></i></button></td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div> :
          <div className='card p-5 text-center'>
            <h3>No Items in Wishlist</h3>
            <Link to="/shop" className='btn btn-dark w-50 m-auto' >Shop Now</Link>
          </div>
      }
    </>
  )
}
