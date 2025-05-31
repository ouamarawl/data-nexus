import React from 'react'
import './AboutContent.css'
function AboutContent() {
  return (
    <div className="about-content">
        <section className="about-section" data-aos="fade-up">
          <h2>Our Mission</h2>
          <p>
            At Nexus Shop, we strive to provide our customers with top-quality products 
            in various categories, including electronics, fashion, and home essentials. 
            We believe in offering high-quality products at affordable prices with 
            exceptional customer service.
          </p>
        </section>
        <section className="about-section" data-aos="fade-up" data-aos-delay="200">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Wide range of products</li>
            <li>Fast and reliable delivery</li>
            <li>Secure payment methods</li>
            <li>Excellent customer service</li>
          </ul>
        </section>
      </div>
  )
}

export default AboutContent