import React from 'react'
import Banner from './Banner'
import Categories from './Categories'
import Trends from './Trends'
import TrendingProducts from './TrendingProducts'
import DealsSection from './DealsSection'
import Features from './Features'
import Blogs from './blogs/Blogs'

const Home = () => {
  return (
    <div>
        <Banner/>
        <Categories/>
        <Trends/>
        <TrendingProducts/>
        <DealsSection/>
        <Features/>
        <Blogs/>
    </div>
  )
}

export default Home