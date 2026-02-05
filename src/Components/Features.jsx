import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import { getFeature } from "../Redux/ActionCreators/FeatureActionCreators"
export default function Services() {
    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()


    useEffect(() => {
        (() => dispatch(getFeature()))()
    }, [FeatureStateData.length])
    return (
        <section id="services" className="services section section-bg dark-background">


            <div className="container section-title" >
                <h2>Features</h2>
                <p>Shoppers offers fast delivery, secure payments, 24/7 support, easy returns, exclusive deals, and a wide range of quality products—ensuring a smooth, reliable, and enjoyable shopping experience.</p>
            </div>

            <div className="container">

                <div className="row gy-4">

                    {
                        FeatureStateData.map(item => {
                            return <div className="col-md-6" key={item.id} >
                                <div className="service-item d-flex position-relative h-100">
                                    <span className=" icon flex-shrink-0 fs-1" dangerouslySetInnerHTML={{ __html: item.icon }} />
                                    <div>
                                        <h4 className="title">{item.name}</h4>
                                        <p className="description">{item.shortDescription}</p>
                                    </div>
                                </div>
                            </div>
                        })
                    }

                </div>

            </div>

        </section>
    )
}
