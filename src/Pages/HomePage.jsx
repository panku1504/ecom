import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import BrandSlider from '../Components/BrandSlider'
import MaincategorySlider from '../Components/MaincategorySlider'
import SubcategorySlider from '../Components/SubcategorySlider'
import About from '../Components/About'
import Stats from '../Components/Stats'
import Features from '../Components/Features'
import Product from '../Components/Product'
import Testimonials from '../Components/Testimonials'
import Faq from '../Components/Faq'
import ProductSlider from '../Components/ProductSlider'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
export default function HomePage() {
  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)
  let dispatch = useDispatch()

  let options = {
    style: {
      '--swiper-pagination-color': '#fff',
    },

    speed: 600,
    parallax: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    loop: true,
    pagination: {
      clickable: true
    },
    modules: [Parallax, Pagination, Autoplay]
  }

  useEffect(() => {
    (() => dispatch(getMaincategory()))()
  }, [MaincategoryStateData.length])

  useEffect(() => {
    (() => dispatch(getProduct()))()
  }, [ProductStateData.length])

  return (
    <>
      <main className="main">

        <Swiper {...options}>
          <SwiperSlide>
            <section id="hero" className="hero section">
              <img src="assets/img/banner/banner1.jpg" alt="" />

              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <h2>Premium Style Crafted For Every Man</h2>
                    <p>Elevate Your Style With Shoppers Men , Bold Looks,Built For Modern Men , Where Confidence Meets Everyday Style</p>
                    <div className="d-flex mt-4">
                      <Link to="/shop?mc=Male" className="btn-get-started">Shop Now</Link>
                    </div>

                  </div>
                </div>
              </div>

            </section>
          </SwiperSlide>

          <SwiperSlide>
            <section id="hero" className="hero section">
              <img src="assets/img/banner/banner2.jpg" alt="" />

              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <h2>Elegant Styles for Every Modern Woman</h2>
                    <p>Shop Trending Women's Fashion at Shoppers , Fresh Looks: Women's Style Essentials Here , Discover Top Picks for Fashionable Women , Women's Must-Haves: Shop Latest Trends</p>
                    <div className="d-flex mt-4">
                      <Link to="/shop?mc=Female" className="btn-get-started">Shop now</Link>
                    </div>

                  </div>
                </div>
              </div>

            </section>
          </SwiperSlide>

          <SwiperSlide>
            <section id="hero" className="hero section">
              <img src="assets/img/banner/banner4.jpg" alt="" />

              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <h2>Trendy Outfits for Every Little Star</h2>
                    <p>Adorable Looks for Fun-Loving Kids , Playful Styles: Shop Kid's Latest Trends , Kids’ Essentials: Colorful Choices Await Here , Shop Cool and Comfy Kids’ Fashion</p>
                    <div className="d-flex mt-4">
                      <Link to="/shop?mc=Kids" className="btn-get-started">Shop now</Link>
                    </div>

                  </div>
                </div>
              </div>

            </section>
          </SwiperSlide>


        </Swiper>
        <BrandSlider />
        <About />
        <Stats />
        <Features />
        <MaincategorySlider />
        <Product maincategory={MaincategoryStateData.filter(x => x.status)} product={ProductStateData.filter(x => x.status)} />
        <Testimonials />
        <SubcategorySlider />
        {
          MaincategoryStateData.filter(x=>x.status).map(item => {
            return <ProductSlider key={item.id} title={item.name} data={ProductStateData.filter(x => x.status && x.maincategory === item.name)} />
          })
        }
        <Faq />
      </main>
    </>
  )
}
