import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreators"
export default function Testimonials({ title , pid }) {
    let [reviews, setReviews] = useState([])
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()

    let options = {
        speed: 600,
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        breakpoints: title === "Product" ? {
            4000: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
        } : {
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
            },
        },
        pagination: {
            clickable: true
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        modules: [Pagination, Autoplay]
    };

    function getStar(star) {
        if (star == 5)
            return <><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i></>
        else if (star == 4)
            return <><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star text-warning'></i></>
        else if (star == 3)
            return <><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star text-warning'></i><i className='fs-4 bi bi-star text-warning'></i></>
        else if (star == 2)
            return <><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star text-warning'></i><i className='fs-4 bi bi-star text-warning'></i><i className='fs-4 bi bi-star text-warning'></i></>
        else
            return <><i className='fs-4 bi bi-star-fill text-warning'></i><i className='fs-4 bi bi-star text-warning'></i><i className='fs-4 bi bi-star text-warning'></i><i className='fs-4 bi bi-star text-warning'></i><i className='fs-4 bi bi-star text-warning'></i></>
    }

    useEffect(() => {
        dispatch(getTestimonial())
        if (TestimonialStateData.length) {
            if (title === "Product")
                setReviews(TestimonialStateData.filter(x=>x.product===pid))
            else
                setReviews(TestimonialStateData.filter(x => x.star >= 4))
        }
    }, [TestimonialStateData.length])
    return (
        <div id="testimonials" className="testimonials">
            <div className="container" >
                <div className="swiper init-swiper">
                    <div className="swiper-wrapper">
                        <Swiper {...options}>
                            {
                                reviews.map((x) => {
                                    return <SwiperSlide key={x.id}>
                                        <div className="testimonial-item">
                                            <h3>{x.name}</h3>
                                            <div className="stars">
                                                {getStar(x.star)}
                                            </div>
                                            <p>
                                                <i className="bi bi-quote quote-icon-left"></i>
                                                <div className='testimonial-message'>{x.message}</div>
                                                <i className="bi bi-quote quote-icon-right"></i>
                                            </p>
                                        </div>


                                    </SwiperSlide>
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </div>

        </div >
    )
}
