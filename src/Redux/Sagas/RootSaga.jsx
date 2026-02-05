import { all } from "redux-saga/effects";
import MaincategorySaga from "./MaincategorySagas";
import SubcategorySaga from "./SubcategorySagas";
import BrandSaga from "./BrandSagas";
import ProductSaga from "./ProductSagas";
import FeatureSaga from "./FeatureSagas";
import FaqSaga from "./FaqSagas";
import SettingSaga from "./SettingSagas";
import CartSaga from "./CartSagas";
import WishlistSaga from "./WishlistSagas";
import CheckoutSaga from "./CheckoutSagas";
import NewsletterSaga from "./NewsletterSagas";
import ContactUsSaga from "./ContactUsSagas";
import TestimonialSaga from "./TestimonialSagas";
import UserSaga from "./UserSagas";


export default function* RootSaga() {
    yield all([
        MaincategorySaga(),
        SubcategorySaga(),
        BrandSaga(),
        ProductSaga(),
        FeatureSaga(),
        FaqSaga(),
        SettingSaga(),
        CartSaga(),
        WishlistSaga(),
        CheckoutSaga(),
        NewsletterSaga(),
        ContactUsSaga(),
        TestimonialSaga(),
        UserSaga(),
    ])
}