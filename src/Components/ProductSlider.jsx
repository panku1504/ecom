import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

export default function ProductSlider({ title, data }) {
    let options = {
        speed: 600,
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        style: {
            '--swiper-pagination-color': '#fff',
        },

        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 10,
            },

        },

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },

        modules: [Autoplay]
    };
    return (
        <section id="team" className="team section section-bg dark-background ">


            <div className="container section-title" >
                <h2>{title === "Related Products" ? title : `Our latest Products For ${title}`}</h2>
            </div>

            <div className="container">

                <div className=" gy-4">
                    <Swiper {...options}>
                        {data.map(item => {
                            return <SwiperSlide key={item.id}>
                                <div className=" d-flex align-items-stretch" >
                                    <div className="team-member">
                                        <div className="">
                                            <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic[0]}`} style={{ height: 300, width: 350 }} alt="" />
                                        </div>
                                        <div className="member-info">
                                            <h4 style={{ height: 50 }} className='text-center'>{item.name}</h4>
                                            <span className='text-center fs-5' ><del>&#8377;{item.basePrice}</del> &#8377;{item.finalPrice} <sup> {item.discount}% Off</sup></span>
                                            <Link to={`/product/${item.id}`} className='btn btn-danger text-light w-100 mt-3'>Add To Cart</Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                        })}
                    </Swiper>

                </div>

            </div>

        </section>
    )
}
