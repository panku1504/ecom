import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Await, Link, useNavigate } from 'react-router-dom'

import Hero from '../../../Components/Hero'
import AdminSidebar from '../../../Components/AdminSidebar'

import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'

import { createProduct } from "../../../Redux/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../../../Redux/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../../../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../../../Redux/ActionCreators/BrandActionCreators"

let rte
export default function AdminProductCreatePage() {
  let refdiv = useRef(null)

  let [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: [],
    size: [],
    basePrice: "",
    discount: "",
    finalPrice: "",
    stock: true,
    stockQuantity: "",
    pic: [],
    status: true,
  })

  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mandatory",
    color: "Please Select Atleast One Colour",
    size: "Please Select Atleast One Size",
    basePrice: "Base Price Field is Mandatory",
    discount: "Discount Field is Mandatory",
    stockQuantity: "Stock Quantity Field is Mandatory",
    pic: "Pic Field is Mandatory"
  })

  let colors = ["White", "Red", "Green", "Blue", "Gray", "Purple", "Pink", "Yellow", "Orange", "Cyan", "SkyBlue", "Black"]
  let size = ["XXXL", "XXL", "XL", "LG", "MD", "SM", "XS", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "Free Size"]

  let [show, setShow] = useState(false)

  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
  let BrandStateData = useSelector(state => state.BrandStateData)
  let dispatch = useDispatch()

  let navigate = useNavigate()

  function getInputData(e) {
    let name = e.target.name
    let value = name === "pic" ? Array.from(e.target.files).map(x => "product/" + x.name) : e.target.value
    // let value = name === "pic" ?  (e.target.files[0]) : e.target.value
    setErrorMessage({
      ...errorMessage,
      [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)
    })

    setData({
      ...data,
      [name]: name === "status" || name === "stock" ? (value === "1" ? true : false) : value
    })

  }

  function getInputCheckBox(field, value) {
    let temp = field === "color" ? data.color : data.size

    if (temp.includes(value))
      temp = temp.filter(x => x !== value)
    else
      temp.push(value)

    setData({ ...data, [field]: temp })
    setErrorMessage({ ...errorMessage, [field]: temp.length ? "" : `Please select atleast one ${field}` })
  }


  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let bp = parseInt(data.basePrice)
      let d = parseInt(data.discount)
      let fp = parseInt(bp - bp * d / 100)
      let sc = parseInt(data.stockQuantity)


      dispatch(createProduct({
        ...data,
        'maincategory': data.maincategory ? data.maincategory : MaincategoryStateData[0].name,
        'subcategory': data.subcategory ? data.subcategory : SubcategoryStateData[0].name,
        'brand': data.brand ? data.brand : BrandStateData[0].name,
        'basePrice': bp,
        'discount': d,
        'finalPrice': fp,
        'stcokQuantity': sc,
        'description': rte.getHTMLCode()
      }))
      // let formData = new FormData()
      // formData.append("name", data.name)
      // formData.append("maincategory", data.maincategory === String ? data.maincategory : data.maincategory._id)
      // formData.append("subcategory",  data.subcategory === String ? data.subcategory : data.subcategory._id)
      // formData.append("brand", data.brand ? data.brand : data.brand._id)
      // formData.append("basePrice", bp)
      // formData.append("discount", d)data.pic
      // formData.append("finalPrice", fp)
      // formData.append("stockQuantity", sc)
      // formData.append("description", rte.getHTMLCode())
      // Array.from(data.pic).forEach(x => {
      // formData.append("pic", x)
      // })
      // formData.append("status", data.status)
      // dispatch(createProduct(formData))


      navigate("/admin/product")

    }

  }

  useEffect(() => {
    (() => {
      dispatch(getMaincategory())
    })()
  }, [MaincategoryStateData.length])
  useEffect(() => {
    (() => {
      dispatch(getSubcategory())
    })()
  }, [SubcategoryStateData.length])
  useEffect(() => {
    (() => {
      dispatch(getBrand())
    })()
  }, [BrandStateData.length])

  useEffect(() => {
    rte = new window.RichTextEditor(refdiv.current)
    rte.setHTMLCode("")

  }, [])

  return (
    <>
      <Hero title="admin" />

      <div className="container-fluid my-2">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h4 className='bg-dark text-center text-light p-2 '> Create Product
              <Link to="/admin/product"><i className='bi bi-arrow-left text-light float-end fs-3'></i></Link>
            </h4>
            <form onSubmit={postData}>
              <div className="row">
                <div className="col-12 mb-3">
                  <label>Name*</label>
                  <input type="text" name="name" onChange={getInputData} placeholder='Product Name' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.name ? <p className='text-danger text-capitalize'>{errorMessage.name}</p> : null}
                </div>

                <div className="col-md-3 mb-3">
                  <label>MainCategory*</label>
                  <select name="maincategory" onChange={getInputData} className='form-select border-dark'>
                    {MaincategoryStateData.filter(x => x.status).map(item => {
                      return <option key={item.id}>{item.name}</option>
                      // return <option key={item._id} value={item._id}>{item.name}</option>
                    })}
                  </select>
                </div>

                <div className="col-md-3 mb-3">
                  <label>SubCategory*</label>
                  <select name="subcategory" onChange={getInputData} className='form-select border-dark'>
                    {SubcategoryStateData.filter(x => x.status).map(item => {
                      return <option key={item.id}>{item.name}</option>
                      // return <option key={item._id} value={item._id}>{item.name}</option>
                    })}
                  </select>
                </div>

                <div className="col-md-3 mb-3">
                  <label>Brand*</label>
                  <select name="brand" onChange={getInputData} className='form-select border-dark'>
                    {BrandStateData.filter(x => x.status).map(item => {
                      return <option key={item.id}>{item.name}</option>
                      // return <option key={item._id} value={item._id}>{item.name}</option>
                    })}
                  </select>
                </div>

                <div className="col-md-3 mb-3">
                  <label>Stock*</label>
                  <select name="stock" onChange={getInputData} className='form-select border-dark'>
                    <option value="1">In Stock</option>
                    <option value="0">Out Of Stock</option>
                  </select>
                </div>

                <div className="col-12 mb-3">
                  <label>Color*</label>
                  <div className='row border-dark  border mx-1 rounded p-2'>
                    {colors.map((item, index) => {
                      return <div className="col-xl-2 col-lg-3 col-4" key={index}>
                        <input type="checkbox" onChange={() => getInputCheckBox('color', item)} className='form-check-input border-dark' checked={data.color.includes(item)} />
                        <label>&nbsp;&nbsp;{item}</label>
                      </div>
                    })}
                  </div>
                  {show && errorMessage.color ? <p className='text-danger text-capitalize'>{errorMessage.color}</p> : null}
                </div>

                <div className="col-12 mb-3">
                  <label>Size*</label>
                  <div className='row border-dark  border mx-1 rounded p-2'>
                    {size.map((item, index) => {
                      return <div className="col-xl-2 col-lg-3 col-4" key={index}>
                        <input type="checkbox" onChange={() => getInputCheckBox('size', item)} className='form-check-input border-dark' checked={data.size.includes(item)} />
                        <label>&nbsp;&nbsp;{item}</label>
                      </div>
                    })}
                  </div>
                  {show && errorMessage.size ? <p className='text-danger text-capitalize'>{errorMessage.size}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Base Price*</label>
                  <input type="number" name="basePrice" onChange={getInputData} placeholder='Product Base Price' className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.basePrice ? <p className='text-danger text-capitalize'>{errorMessage.basePrice}</p> : null}
                </div>

                <div className="col-md-6 mb-3">
                  <label>Discount*</label>
                  <input type="number" name="discount" onChange={getInputData} placeholder='Product Discount' className={`form-control ${show && errorMessage.discount ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.discount ? <p className='text-danger text-capitalize'>{errorMessage.discount}</p> : null}
                </div>

                <div className="col-12 mb-3">
                  <label>Description</label>
                  <div className='border-dark' ref={refdiv}></div>
                </div>

                <div className="col-md-4 mb-3">
                  <label>Stock Quantity*</label>
                  <input type="number" name="stockQuantity" onChange={getInputData} placeholder='Product Stock Quantity' className={`form-control ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-dark'}`} />
                  {show && errorMessage.stockQuantity ? <p className='text-danger text-capitalize'>{errorMessage.stockQuantity}</p> : null}
                </div>

                <div className="col-md-4 mb-3">
                  <label>Pic*</label>
                  <input type="file" name="pic" multiple onChange={getInputData} className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-dark'}`} />
                  {
                    show && errorMessage.pic ? typeof (errorMessage.pic) === "string" ?
                      <p className='text-danger text-capitalize'>{errorMessage.pic}</p> :
                      errorMessage.pic.map((error, index) => <p key={index} className='text-danger text-capitalize'>{error}</p>)
                      : null
                  }
                </div>

                <div className="col-md-4 mb-3">
                  <label>Status</label>
                  <select name="status" onChange={getInputData} className='form-select border-dark'>
                    <option value="1">Active</option>
                    <option value="0">In-active</option>
                  </select>
                </div>


                <div className="col-12 mb-3">
                  <button type="submit" className='btn btn-dark w-100'>Create</button>
                </div>



              </div>

            </form>

          </div>
        </div>

      </div>

    </>
  )
}
