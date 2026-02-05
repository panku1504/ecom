import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import ShopPage from './Pages/ShopPage'
import ProductPage from './Pages/ProductPage'
import FeaturesPage from './Pages/FeaturesPage'
import TestimonialPage from './Pages/TestimonialPage'
import FaqPage from './Pages/FaqPage'
import ContactUsPage from './Pages/ContactUsPage'
import ErrorPage from './Pages/ErrorPage'
import AdminHomePage from './Pages/Admin/AdminHomePage'


import AdminMainCategoryPage from './Pages/Admin/Maincategory/AdminMainCategoryPage'
import AdminMainCategoryCreatePage from './Pages/Admin/Maincategory/AdminMainCategoryCreatePage'
import AdminMainCategoryUpdatePage from './Pages/Admin/Maincategory/AdminMainCategoryUpdatePage'

import AdminSubCategoryPage from './Pages/Admin/Subcategory/AdminSubCategoryPage'
import AdminSubCategoryCreatePage from './Pages/Admin/Subcategory/AdminSubCategoryCreatePage'
import AdminSubCategoryUpdatePage from './Pages/Admin/Subcategory/AdminSubCategoryUpdatePage'

import AdminBrandPage from './Pages/Admin/Brand/AdminBrandPage'
import AdminBrandCreatePage from './Pages/Admin/Brand/AdminBrandCreatePage'
import AdminBrandUpdatePage from './Pages/Admin/Brand/AdminBrandUpdatePage'

import AdminFeaturePage from './Pages/Admin/feature/AdminFeaturePage.jsx'
import AdminFeatureCreatePage from './Pages/Admin/feature/AdminFeatureCreatePage'
import AdminFeatureUpdatePage from './Pages/Admin/feature/AdminFeatureUpdatePage'

import AdminFaqPage from './Pages/Admin/Faq/AdminFaqPage'
import AdminFaqCreatePage from './Pages/Admin/Faq/AdminFaqCreatePage'
import AdminFaqUpdatePage from './Pages/Admin/Faq/AdminFaqUpdatePage'

import AdminSettingPage from './Pages/Admin/Setting/AdminSettingPage'

import AdminProductPage from './Pages/Admin/Product/AdminProductPage'
import AdminProductCreatePage from './Pages/Admin/Product/AdminProductCreatePage'
import AdminProductUpdatePage from './Pages/Admin/Product/AdminProductUpdatePage'
import LoginPage from './Pages/User/LoginPage'
import SignupPage from './Pages/User/SignupPage'
import ProfilePage from './Pages/User/ProfilePage'
import CartPage from './Pages/User/CartPage'
import CheckoutPage from './Pages/User/CheckoutPage'
import OrderConfirmation from './Pages/User/OrderConfirmation'
import AdminNewsletterPage from './Pages/Admin/Newsletter/AdminNewsletterPage'
import AdminContactUsPage from './Pages/Admin/ContactUs/AdminContactUsPage'
import AdminContactUsShowPage from './Pages/Admin/ContactUs/AdminContactUsShowPage'
import AdminCheckoutPage from './Pages/Admin/Checkout/AdminCheckoutPage'
import AdminCheckoutShowPage from './Pages/Admin/Checkout/AdminCheckoutShowPage'
import AdminUserPage from './Pages/Admin/User/AdminUserPage'
import AdminUserCreatePage from './Pages/Admin/User/AdminUserCreatePage'
import AdminUserUpdatePage from './Pages/Admin/User/AdminUserUpdatePage'



export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='' element={<HomePage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/Shop' element={<ShopPage />} />
                <Route path='/Product/:id' element={<ProductPage />} />
                <Route path='/Features' element={<FeaturesPage />} />
                <Route path='/Testimonials' element={<TestimonialPage />} />
                <Route path='/Faq' element={<FaqPage />} />
                <Route path='/ContactUs' element={<ContactUsPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />


                {/* User Routes */}
                {
                    localStorage.getItem("login") ?
                        <>
                            <Route path='/profile' element={<ProfilePage />} />
                            <Route path='/cart' element={<CartPage />} />
                            <Route path='/checkout' element={<CheckoutPage />} />
                            <Route path='/confirmation' element={<OrderConfirmation />} />
                        </> : null
                }


                {/* admin Routes */}
                {
                    localStorage.getItem("login") && localStorage.getItem("role") !== "buyer" ?
                        <>
                            <Route path='/admin' element={<AdminHomePage />} />

                            <Route path='/admin/maincategory' element={<AdminMainCategoryPage />} />
                            <Route path='/admin/maincategory/create' element={<AdminMainCategoryCreatePage />} />
                            <Route path='/admin/maincategory/update/:id' element={<AdminMainCategoryUpdatePage />} />

                            <Route path='/admin/subcategory' element={<AdminSubCategoryPage />} />
                            <Route path='/admin/subcategory/create' element={<AdminSubCategoryCreatePage />} />
                            <Route path='/admin/subcategory/update/:id' element={<AdminSubCategoryUpdatePage />} />

                            <Route path='/admin/brand' element={<AdminBrandPage />} />
                            <Route path='/admin/brand/create' element={<AdminBrandCreatePage />} />
                            <Route path='/admin/brand/update/:id' element={<AdminBrandUpdatePage />} />

                            <Route path='/admin/feature' element={<AdminFeaturePage />} />
                            <Route path='/admin/feature/create' element={<AdminFeatureCreatePage />} />
                            <Route path='/admin/feature/update/:id' element={<AdminFeatureUpdatePage />} />

                            <Route path='/admin/faq' element={<AdminFaqPage />} />
                            <Route path='/admin/faq/create' element={<AdminFaqCreatePage />} />
                            <Route path='/admin/faq/update/:id' element={<AdminFaqUpdatePage />} />

                            <Route path='/admin/setting' element={<AdminSettingPage />} />

                            <Route path='/admin/product' element={<AdminProductPage />} />
                            <Route path='/admin/product/create' element={<AdminProductCreatePage />} />
                            <Route path='/admin/product/update/:id' element={<AdminProductUpdatePage />} />

                            <Route path='/admin/newsletter' element={<AdminNewsletterPage />} />

                            <Route path='/admin/contactus' element={<AdminContactUsPage />} />
                            <Route path='/admin/contactus/show/:id' element={<AdminContactUsShowPage />} />

                            <Route path='/admin/checkout' element={<AdminCheckoutPage />} />
                            <Route path='/admin/checkout/show/:id' element={<AdminCheckoutShowPage />} />

                            <Route path='/admin/user' element={<AdminUserPage />} />
                            <Route path='/admin/user/create' element={<AdminUserCreatePage />} />
                            <Route path='/admin/user/update/:id' element={<AdminUserUpdatePage />} />

                        </> : null
                }

                <Route path='/*' element={<ErrorPage />} />

            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
