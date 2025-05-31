import React, { useEffect } from 'react'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import './About.css';
import AboutContent from './About_content/AboutContent';
import AboutHeader from './About_header/AboutHeader';

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="about-container">
      <AboutHeader/>
      <AboutContent/>
    </div>
  );
}

export default About;
