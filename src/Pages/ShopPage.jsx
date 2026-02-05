import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import Hero from '../Components/Hero'

import { getMaincategory } from "../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreators"
import { Link } from 'react-router-dom'

export default function ShopPage() {
    let [data, setdata] = useState([])
    let [mc, setMc] = useState([])
    let [sc, setSc] = useState([])
    let [br, setBr] = useState([])

    let [min, setMin] = useState(-1)
    let [max, setMax] = useState(-1)

    let [sortFilterOption, setSortFilterOption] = useState("1")
    let [search, setSearch] = useState("")
    let [selectedColors, setSelectedColors] = useState([])
    let [selectedSize, setSelectedSize] = useState([])

    let colors = ["White", "Red", "Green", "Blue", "Gray", "Purple", "Pink", "Yellow", "Orange", "Cyan", "SkyBlue", "Black"]
    let size = ["XXXL", "XXL", "XL", "LG", "MD", "SM", "XS", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "Free Size"]

    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)

    let dispatch = useDispatch()

    function getCheckboxInput(option, value) {
        let temp =
            option === "mc" ? [...mc] :
            option === "sc" ? [...sc] :
            [...br];

        if (temp.includes(value))
            temp = temp.filter(x => x !== value)
        else
            temp.push(value)

        if (option === "mc")
            setMc(temp)
        else if (option === "sc")
            setSc(temp)
        else
            setBr(temp)

        filterProducts(option === "mc" ? temp : mc, option === "sc" ? temp : sc, option === "br" ? temp : br, selectedColors, selectedSize)
    }

    function getCheckboxInput2(field, value) {
        let temp = field === "color" ? [...selectedColors] : [...selectedSize]

        if (temp.includes(value))
            temp = temp.filter(x => x !== value)
        else
            temp.push(value)

        if (field === "color")
            setSelectedColors(temp)
        else
            setSelectedSize(temp)

        filterProducts(mc, sc, br, field === "color" ? temp : selectedColors, field === "size" ? temp : selectedSize)
    }

    function isIncluded(arr1, arr2) {
        if (!arr2) return false
        let flag = false
        for (let item of arr1) {
            if (arr2.includes(item)) {
                flag = true
                break
            }
        }
        return flag
    }

    function filterProducts(mc, sc, br, color, size) {

        let data = ProductStateData.filter(x => x.status &&
            (mc.length === 0 || mc.includes(x.maincategory)) &&
            (sc.length === 0 || sc.includes(x.subcategory)) &&
            (br.length === 0 || br.includes(x.brand)) &&
            (color.length === 0 || isIncluded(color, x.color || [])) &&
            (size.length === 0 || isIncluded(size, x.size || []))
        )
        applySortFilter(data, sortFilterOption, min, max)
    }

    function postSearch(e) {
        e.preventDefault()
        let ch = search.toLocaleLowerCase()
        let data = ProductStateData.filter(x => x.status &&
            (
                x.name.toLocaleLowerCase().includes(ch) ||
                x.maincategory.toLocaleLowerCase() === ch ||
                x.subcategory.toLocaleLowerCase() === ch ||
                x.brand.toLocaleLowerCase() === ch ||
                x.color?.includes(ch) ||
                x.size?.includes(ch) ||
                x.description?.toLocaleLowerCase().includes(ch)
            )
        )
        applySortFilter(data, sortFilterOption, min, max)
    }

    function applySortFilter(data, option, min, max) {
        setSortFilterOption(option)
        let temp = [...data]

        if (min !== -1 && max !== -1)
            temp = temp.filter(x => x.finalPrice >= min && x.finalPrice <= max)

        if (option === "1")
            temp = temp.sort((x, y) => Number(y.id) - Number(x.id))
        else if (option === "2")
            temp = temp.sort((x, y) => x.finalPrice - y.finalPrice)
        else
            temp = temp.sort((x, y) => y.finalPrice - x.finalPrice)

        setdata(temp)
    }

    useEffect(() => {
        dispatch(getMaincategory())
    }, [MaincategoryStateData.length])

    useEffect(() => {
        dispatch(getSubcategory())
    }, [SubcategoryStateData.length])

    useEffect(() => {
        dispatch(getBrand())
    }, [BrandStateData.length])

    useEffect(() => {
        dispatch(getProduct())
        filterProducts(mc, sc, br, selectedColors, selectedSize)
    }, [ProductStateData.length])

    return (
        <main className="main">
            <Hero title="Shop" />

            <div className="container-fluid my-3">
                <div className="row">

                    <div className="col-lg-3">
                        <div className="list-group mb-3">
                            <div className="bg-dark  text-light p-2 text-center">
                                Maincategory
                            </div>

                            {
                                MaincategoryStateData.filter(x => x.status).map(item => {
                                    return <div key={item.id} className="list-group-item list-group-item-action">
                                        <input type="checkbox" className='me-2 form-check-input border-dark' checked={mc.includes(item.name)} onChange={() => getCheckboxInput('mc', item.name)} />
                                        <label>{item.name}</label></div>
                                })
                            }
                        </div>

                        <div className="list-group mb-3">
                            <div className="bg-dark  text-light p-2 text-center">
                                Subcategory
                            </div>

                            {
                                SubcategoryStateData.filter(x => x.status).map(item => {
                                    return <div key={item.id} className="list-group-item list-group-item-action">
                                        <input type="checkbox" className='me-2 form-check-input border-dark' checked={sc.includes(item.name)} onChange={() => getCheckboxInput('sc', item.name)} />
                                        <label>{item.name}</label></div>
                                })
                            }
                        </div>

                        <div className="list-group mb-3">
                            <div className="bg-dark  text-light p-2 text-center">
                                Brand
                            </div>

                            {
                                BrandStateData.filter(x => x.status).map(item => {
                                    return <div key={item.id} className="list-group-item list-group-item-action">
                                        <input type="checkbox" className='me-2 form-check-input border-dark' checked={br.includes(item.name)} onChange={() => getCheckboxInput('br', item.name)} />
                                        <label>{item.name}</label></div>
                                })
                            }
                        </div>

                        <div className="list-group mb-3">
                            <div className="bg-dark  text-light p-2 text-center">
                                Select Colors
                            </div>
                            <div className="row">
                                {
                                    colors.map((item, index) => {
                                        return <div className="col-6" key={index} >
                                            <div className="list-group-item list-group-item-action">
                                                <input type="checkbox" className='me-2 form-check-input border-dark' checked={selectedColors.includes(item)} onChange={() => getCheckboxInput2('color', item)} />
                                                <label>{item}</label>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>

                        <div className="list-group mb-3">
                            <div className="bg-dark  text-light p-2 text-center">
                                Select Size
                            </div>
                            <div className="row">
                                {
                                    size.map((item, index) => {
                                        return <div className="col-6" key={index} >
                                            <div className="list-group-item list-group-item-action">
                                                <input type="checkbox" className='me-2 form-check-input border-dark' checked={selectedSize.includes(item)} onChange={() => getCheckboxInput2('size', item)} />
                                                <label>{item}</label>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="bg-dark  text-light p-2 text-center">
                                Price Filter
                            </div>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                applySortFilter(data, sortFilterOption, min, max)
                            }}>
                                <div className="row my-3">
                                    <div className="col-md-6 mb-3">
                                        <input type="number" name="min" value={min === -1 ? "" : min} placeholder='Min Amount' className='form-control border-dark' onChange={(e) => setMin(e.target.value)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="number" name="max" value={max === -1 ? "" : max} placeholder='Max Amount' className='form-control border-dark' onChange={(e) => setMax(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className='btn btn-dark w-100'>Apply </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>

                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-9">
                                <form onSubmit={postSearch}>
                                    <div className='btn-group w-100' >
                                        <input type="search" name="search" onChange={(e) => setSearch(e.target.value)} className='form-control border-dark' placeholder='Search Products By Name, Category, Brand, Color, Size etc' />
                                        <button type="submit" className='btn btn-dark'>Search</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-3">
                                <select value={sortFilterOption} onChange={(e) => applySortFilter(data, e.target.value, min, max)} className='form-select border-dark'>
                                    <option value="1">Latest</option>
                                    <option value="2">Price : Low to High</option>
                                    <option value="3">Price : High to Low</option>
                                </select>
                            </div>
                        </div>

                        <section id="portfolio" className="portfolio section" >
                            <div className="isotope-layout" >
                                <div className="row gy-4 isotope-container" >
                                    {
                                        data.map(item => {
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
                        </section>
                    </div>

                </div>
            </div>
        </main>
    )
}
