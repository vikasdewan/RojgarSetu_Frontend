import AvailableWorkers from '@/components/home/AvailableWorkers'
import ContactForm from '@/components/home/ContactForm'
import Footer from '@/components/home/Footer'
import HeroSection from '@/components/home/HeroSection'
import HowItWorks from '@/components/home/HowItWorks'
import Navbar from '@/components/home/Navbar'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import React from 'react'

function Home() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <HowItWorks/>
    <WhyChooseUs/>
    <AvailableWorkers/>
    <ContactForm/>
    <Footer/>
    </>

  )
}

export default Home
