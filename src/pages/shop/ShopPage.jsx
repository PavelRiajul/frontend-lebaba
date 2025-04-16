import React, { useState } from 'react'
import ProductCards from './ProductCards'
import { useFetchAllProdutsQuery } from '../../redux/features/products/productsApi'
import ShopFiltering from './ShopFiltering'
import Loading from '../../components/Loading'

//category filters
const filters = 
  {
    categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
    priceRanges: [
      {label: "Under $50", min: 0, max: 50},
      {label: "$50 - $100", min: 50, max: 100},
      {label: "$100 - $200", min: 100, max: 200},
      {label: "$200 and above", min: 200, max: Infinity},
    ]
  }
const ShopPage = () => {
  //current page
  const [currentPage, setCurrentPage] = useState(1)
  //category filter state
  const [filtersState, setFiltersState] = useState({
    category: 'all',
    color: 'all',
    priceRange: ''
  });
  //category filter state de-structure
  const {category, color, priceRange} = filtersState;
  const [minPrice, maxPrice] = priceRange.split('-').map(Number)

  //per page product show
  const [productsPerPage] = useState(8)

    // get all products call
    const {data:productsData={},error,isLoading} = useFetchAllProdutsQuery({
      category: category !== 'all' ? category : '',
      color: color !== 'all' ? color : '',
      minPrice: isNaN(minPrice) ? '' : minPrice,
      maxPrice: isNaN(maxPrice) ? '' : maxPrice,
      page: currentPage,
      limit: productsPerPage
  
    })
    //console.log(productsData?.data)

    //loading
    if(isLoading) return <Loading/>

    const {products,totalPages,totalProducts} =  productsData?.data || {}
    //console.log(products)

    //pagination
    const handlePageChange = (pageNumber) => {
      if(pageNumber > 0 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber)
      }
    }
    //clear filter
    const clearFilters = () => {
      setFiltersState({
        category: 'all',
        color: 'all',
        priceRange: ''
      })
    }

    //start products and ending products
    const startProduct = (currentPage -1)* productsPerPage +1
    const endProduct = startProduct + products.length - 1;

  return (
    <>
        <section className='section__container rounded bg-primary-light'>
        <h2 className='section__header'>Shop Page</h2>
        <p className='section__subheader'>Discover the Hottest Picks: Elevate Your Style with Our Curated Collection of Trending Women's Fashion Products.</p>
      </section>

      <section className='section__container'>
      <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
        {/* left side categories */}
        <ShopFiltering
          filters={filters}
          filtersState={filtersState}
          setFiltersState={setFiltersState}
          clearFilters={clearFilters}
        />
        {/* right side products grid */}
        <div>
          <h3 className='text-xl font-medium mb-4'>Showing {startProduct} to {endProduct} of {totalProducts} products</h3>
          <ProductCards products ={products}/>

          {/* pagination */}
          {
            products.length >0 && <div className='mt-6 flex justify-center space-x-2'>
            <button disabled= {currentPage === 1}  onClick={() => handlePageChange(currentPage - 1)} className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md'>Previous</button>
            {
              [...Array(totalPages)].map((_,index)=>(
                <button
                onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 '}`} key={index}>{index + 1}</button>
              ))
            }
            <button disabled= {currentPage === totalPages}  onClick={() => handlePageChange(currentPage + 1)} className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md'>Next</button>
            </div>
          }
          {/* pagination end */}
        </div>
      </div>
      </section>
    </>
  )
}

export default ShopPage