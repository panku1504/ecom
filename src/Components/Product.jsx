import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Product({ maincategory, product }) {
  let [selectedCategory, setSelectedCategory] = useState("")
  return (
    <section id="portfolio" className="portfolio section">


      <div className="container section-title">
        <h2>Our Latest Products</h2>
        <p>Discover our latest products featuring fresh styles, trending designs, and high-quality essentials. Updated regularly to bring you the newest arrivals and best picks across every category.</p>
      </div>

      <div className="container">

        <div className="isotope-layout" >

          <ul className="portfolio-filters isotope-filters" >
            <li className="filter-active" onClick={() => setSelectedCategory("")}>All</li>
            {
              maincategory.map(item => {
                return <li key={item.id} onClick={() => setSelectedCategory(item.name)}>{item.name}</li>
              })
            }

          </ul>

          <div className="row gy-4 isotope-container" >

            {
              product.filter(x => selectedCategory==="" || selectedCategory===x.maincategory).slice(0, 24).map(item => {
                return <div key={item.id} className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app">
                  <div className="portfolio-content h-100">
                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic[0]}`} style={{ height: 300 }} className="w-100" alt="" />
                    <div className="portfolio-info">
                      <h4>{item.brand}</h4>
                      <h3 className='text-light fs-5 position-absolute w-100 text-center ' style={{ bottom: 70, left: 0 }}>{item.name}</h3>
                      <p style={{ bottom: 30, left: 0 }}><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup>{item.discount}% off</sup></p>
                      <Link to={`/product/${item.id}`} className='btn btn-danger text-light fs-5 position-absolute w-100 text-center d-block ' style={{ bottom: 0, left: 0 }}>Add To Cart</Link>
                    </div>
                  </div>
                </div>
              })
            }



          </div>

        </div>

      </div>

    </section>
  )
}
