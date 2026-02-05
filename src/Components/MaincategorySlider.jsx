import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { Link } from 'react-router-dom';
export default function MaincategorySlider() {
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let dispatch = useDispatch()
    let options = {
        spaceBetween: 30,
        loop: true,
        pagination: false,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 50,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 50,
            }
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        modules: [Autoplay]

    }

    useEffect(() => {
        (() => dispatch(getMaincategory()))()
    }, [MaincategoryStateData.length])

    return (
        <section id="clients" className="clients section">

            <div className="container">
                <h1 className='text-center p-2 bg-light'>Our Maincategories</h1>
                <div className="swiper init-swiper">
                    <Swiper {...options}>
                        {
                            MaincategoryStateData?.filter(x => x?.status)?.map((item) => {
                                return <SwiperSlide key={item.id}>
                                    <Link to={`/shop?mc=${item.name}`}>
                                        <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item.pic}`} className="w-100" height={300} alt="" />
                                    </Link>
                                    <h3 className='text-center p-2'>
                                        <Link to={`/shop?mc=${item.name}`}>{item.name} Products</Link>
                                    </h3>
                                </SwiperSlide>
                            })
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
