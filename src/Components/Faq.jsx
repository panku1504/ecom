import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import { getFaq } from "../Redux/ActionCreators/FaqActionCreators"
export default function Faq() {
    let [selected, setSelected] = useState(0)
    let FaqStateData = useSelector(state => state.FaqStateData)
    let dispatch = useDispatch()
    useEffect(() => {
        (() => dispatch(getFaq()))()
    }, [FaqStateData.length])
    return (
        <section id="faq" className="faq section">


            <div className="container section-title" >
                <h2>Frequently Asked Questions</h2>
                <p>Find quick answers to common questions about orders, payments, returns, and more. Our FAQ section helps you get instant solutions and enjoy a smoother, hassle-free shopping experience.</p>
            </div>

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-10" >

                        <div className="faq-container">

                            {
                                FaqStateData.map((item, index) => {
                                    return <div className={`faq-item ${index === selected ? 'faq-active' : ''} `} key={item.id} onClick={() => selected === index ? setSelected(-1) : setSelected(index)}>
                                        <h3>{item.question}</h3>
                                        <div className="faq-content">
                                            <p>{item.answer}</p>
                                        </div>
                                        <i className="faq-toggle bi bi-chevron-right"></i>
                                    </div>
                                })
                            }



                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}
