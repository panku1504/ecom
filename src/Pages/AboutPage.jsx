import React from 'react'
import About from '../Components/About'
import Hero from '../Components/Hero'
import Stats from '../Components/Stats'
import Features from '../Components/Features'

export default function AboutPage() {
    return (
        <main className="main">
            <Hero title="About Us" />
            <Stats />
            <About />
            <Features />
        </main>
    )
}
