import Hero from '../Components/Hero'
import Testimonials from '../Components/Testimonials'

export default function TestimonialPage() {
    return (
        <main className="main">
            <Hero title="Testimonial" />

            <div className="container section-title mt-5">
                <h2>Testimonials</h2>
                <p>Read genuine reviews from our happy customers who trust Shoppers for quality products, fast delivery, and excellent service. Their experiences inspire confidence and help you shop with assurance.</p>
            </div>
            <Testimonials />

        </main>
    )
}
