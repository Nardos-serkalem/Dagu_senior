import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import FeaturedPackages from '../components/FeaturedPackages';
import Gallery from '../components/Gallery';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Landing = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <FeaturedPackages />
        <Gallery />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Landing;