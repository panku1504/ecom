import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import Hero from '../Components/Hero'
import ProductSlider from '../Components/ProductSlider';
import Testimonials from "../Components/Testimonials"

import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { getCart, createCart } from "../Redux/ActionCreators/CartActionCreators"
import { getWishlist, createWishlist } from "../Redux/ActionCreators/WishlistActionCreators"
import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreators"
export default function ProductPage() {
    let options = {
        style: {
            '--swiper-pagination-color': '#fff',
        },

        speed: 600,
        parallax: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },

        loop: true,
        pagination: {
            clickable: true
        },
        modules: [Parallax, Pagination, Autoplay]
    }

    let { id } = useParams()
    let [data, setData] = useState({})
    let [relatedProducts, setRelatedProducts] = useState([])
    let [review, setReview] = useState({
        data: [],
        stats: [],
        total: 0,
        average: 0
    })

    let [selected, setSelected] = useState({
        quantity: 1,
        color: '',
        size: ""
    })

    let ProductStateData = useSelector((state) => state.ProductStateData)
    let CartStateData = useSelector((state) => state.CartStateData)
    let WishlistStateData = useSelector((state) => state.WishlistStateData)
    let TestimonialStateData = useSelector((state) => state.TestimonialStateData)

    let dispatch = useDispatch()
    let navigate = useNavigate()

    function addToCart() {
        let item = CartStateData.find(x => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            let item = {
                user: localStorage.getItem("userid"),
                product: data.id,
                name: data.name,
                brand: data.brand,
                stockQuantity: data.stockQuantity,
                pic: data.pic[0],
                price: data.finalPrice,
                total: data.finalPrice * selected.quantity,
                ...selected
            }
            dispatch(createCart(item))
        }
        navigate("/cart")
    }

    function addToWishlist() {
        let item = WishlistStateData.find(x => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            let item = {
                user: localStorage.getItem("userid"),
                product: data.id,
                name: data.name,
                brand: data.brand,
                stockQuantity: data.stockQuantity,
                pic: data.pic[0],
                color: data.color,
                size: data.size,
                price: data.finalPrice,

            }
            dispatch(createWishlist(item))
        }
        navigate("/profile?option=4")
    }

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => x.id === id)
                if (item) {
                    setData(item)
                    setSelected({ ...selected, 'color': item.color[0], 'size': item.size[0] })
                    setRelatedProducts(ProductStateData.filter(x => x.maincategory === item.maincategory))
                }
                else
                    navigate("/shop")
            }
        })()
    }, [ProductStateData.length, id])

    useEffect(() => {
        (() => dispatch(getCart()))()
    }, [CartStateData.length])

    useEffect(() => {
        (() => dispatch(getWishlist()))()
    }, [WishlistStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (TestimonialStateData.length) {
                let data = TestimonialStateData.filter(x => x.product === id)
                let sum = 0
                let stats = {}
                data.forEach(x => {
                    stats[x.star.toString()] = (stats[x.star.toString()] || 0) + 1
                    sum = sum + parseInt(x.star)
                });
                setReview({
                    data: data,
                    stats: stats,
                    total: data.length,
                    average: (sum / data.length).toFixed(1)
                })
            }
        })()
    }, [TestimonialStateData.length])

    return (
        <main className="main">
            <Hero title={data.name ? data.name : "Product"} />

            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-lg-6">
                        <Swiper {...options}>
                            {
                                data.pic?.map((item, index) => {
                                    return <SwiperSlide key={index}>
                                        <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}/${item}`} height={550} className='w-100' alt="" srcSet="" />
                                    </SwiperSlide>
                                })
                            }
                        </Swiper>
                    </div>
                    <div className="col-lg-6">
                        <h5 className='bg-dark text-light p-2 text-center'>{data.name}</h5>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Maincategory</th>
                                    <td>{data.maincategory}</td>
                                </tr>
                                <tr>
                                    <th>Subcategory</th>
                                    <td>{data.subcategory}</td>
                                </tr>
                                <tr>
                                    <th>Brand</th>
                                    <td>{data.brand}</td>
                                </tr>
                                <tr>
                                    <th>Price</th>
                                    <td><del className='text-danger'>&#8377; {data.basePrice}</del> &#8377;{data.finalPrice} <sup>{data.discount}% Off</sup></td>
                                </tr>
                                <tr>
                                    <th>Stock</th>
                                    <td>{data.stock ? `${data.stockQuantity} left in Stock` : 'Out Of Stock'}</td>
                                </tr>
                                <tr>
                                    <th>Color</th>
                                    <td>
                                        {
                                            data.color?.map((item, index) => {
                                                return <button key={index} className={`m-2 btn ${selected.color === item ? 'btn-dark' : 'btn-light'}`} onClick={() => setSelected({ ...selected, 'color': item })}>{item}</button>
                                            })
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>Size</th>
                                    <td>
                                        {
                                            data.size?.map((item, index) => {
                                                return <button key={index} className={`m-2 btn ${selected.size === item ? 'btn-dark' : 'btn-light'}`} onClick={() => setSelected({ ...selected, 'size': item })}>{item}</button>
                                            })
                                        }
                                    </td>
                                </tr>

                                <tr>
                                    {
                                        data.stock ?
                                            <td colSpan={2}>
                                                <div className="row">
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div className='btn-group w-100'>
                                                            <button className='btn btn-dark' onClick={() => selected.quantity > 1 ? setSelected({ ...selected, 'quantity': selected.quantity - 1 }) : null}><i className='bi bi-dash'></i></button>
                                                            <h4 className='w-50 text-center'>{selected.quantity}</h4>
                                                            <button className='btn btn-dark' onClick={() => selected.quantity < data.stockQuantity ? setSelected({ ...selected, 'quantity': selected.quantity + 1 }) : null}><i className='bi bi-plus'></i></button>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9 col-sm-6">
                                                        <div className="btn-group w-100">
                                                            <button className='btn btn-dark h-100 w-100' onClick={addToCart}><i className='bi bi-cart'></i> Add to Cart</button>
                                                            <button className='btn btn-secondary h-100 w-100' onClick={addToWishlist}><i className='bi bi-heart'></i> Add to Wishlist</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td> : <td colSpan={2}>
                                                <button className='btn btn-secondary h-100 w-100' onClick={addToWishlist}><i className='bi bi-heart'></i> Add to Wishlist</button>
                                            </td>
                                    }
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>
                                        <div dangerouslySetInnerHTML={{ __html: data.description }} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="container-fluid my-3">
                        <div className="row my-5">
                            <div className="col-lg-6">
                                <div className="row">
                                    <div className="card p-3 text-center col-5">
                                        <h6>Customers Reviews</h6>
                                        <h3>{review.average} <i className='bi bi-star-fill text-warning'></i></h3>
                                        <h5>Total Reviews :- {review.total}</h5>
                                    </div>
                                    <div className="card p-3 col-7">
                                        <div className='row'>
                                            <div className='col-4'>
                                                <h5>5 <i className='bi bi-star-fill text-warning'></i>({review.stats[5] || 0})</h5>
                                            </div>
                                            <div className="col-8">
                                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={review.stats[5] / review.total * 100} aria-valuemin="0" aria-valuemax="100">
                                                    <div className="progress-bar" style={{ width: `${review.stats[5] / review.total * 100}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-4'>
                                                <h5>4 <i className='bi bi-star-fill text-warning'></i>({review.stats[4] || 0})</h5>
                                            </div>
                                            <div className="col-8">
                                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={review.stats[4] / review.total * 100} aria-valuemin="0" aria-valuemax="100">
                                                    <div className="progress-bar" style={{ width: `${review.stats[4] / review.total * 100}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-4'>
                                                <h5>3 <i className='bi bi-star-fill text-warning'></i>({review.stats[3] || 0})</h5>
                                            </div>
                                            <div className="col-8">
                                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={review.stats[3] / review.total * 100} aria-valuemin="0" aria-valuemax="100">
                                                    <div className="progress-bar" style={{ width: `${review.stats[3] / review.total * 100}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-4'>
                                                <h5>2 <i className='bi bi-star-fill text-warning'></i>({review.stats[2] || 0})</h5>
                                            </div>
                                            <div className="col-8">
                                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={review.stats[2] / review.total * 100} aria-valuemin="0" aria-valuemax="100">
                                                    <div className="progress-bar" style={{ width: `${review.stats[2] / review.total * 100}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-4'>
                                                <h5>1 <i className='bi bi-star-fill text-warning'></i>({review.stats[1] || 0})</h5>
                                            </div>
                                            <div className="col-8">
                                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={review.stats[1] / review.total * 100} aria-valuemin="0" aria-valuemax="100">
                                                    <div className="progress-bar" style={{ width: `${review.stats[1] / review.total * 100}%` }}> </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div className="col-lg-6">
                            <Testimonials title="Product" pid={id} />
                        </div>
                        </div>
                    </div>
                </div>
                <ProductSlider title="Related Products" data={relatedProducts} />
            </div>
        </main>
    )
}
