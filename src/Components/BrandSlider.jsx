import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
import { Link } from 'react-router-dom';
export default function BrandSlider() {
    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()
    let options = {
        spaceBetween: 30,
        loop: true,
        pagination: false,
        breakpoints: {
            0: {
                slidesPerView: 1.5,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 50,
            },
            992: {
                slidesPerView: 3.5,
                spaceBetween: 50,
            },
            1200: {
                slidesPerView: 5,
                spaceBetween: 50,
            },
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        modules: [Autoplay]

    }

    useEffect(() => {
        (() => dispatch(getBrand()))()
    }, [BrandStateData.length])

    return (
        <section id="clients" className="clients section">
            <div className="container">
                <div className="swiper init-swiper">
                    <Swiper {...options}>
                        {
                            BrandStateData?.filter(x => x?.status)?.map((item) => {
                                return <SwiperSlide key={item.id}>
                                   <Link to={`/shop?br=${item.name}`}>
                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic}`} className="w-100" height={100} alt="" />
                                   </Link>
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
