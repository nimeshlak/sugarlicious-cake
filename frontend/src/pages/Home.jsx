import React from 'react'
import NewlyBakedCakes from '../components/NewlyBakedCakes'
import BestSelling from '../components/BestSelling'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div>
      <Hero />
      <NewlyBakedCakes />
      <BestSelling />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  )
}

export default Home