
import { useParams } from 'react-router'
import ProductCards from '../shop/ProductCards'
import { useEffect, useState } from 'react'
import products from '../../data/products.json'
const CategoryPage = () => {
    const {categoryName} = useParams()
    //console.log(useParams())
    const [filteredProduct,setFilteredProduct]= useState([])
    //console.log(products)
    useEffect(()=>{
        const filtered = products.filter((product)=> product.category === categoryName.toLowerCase())
        setFilteredProduct(filtered)
    },[])
   // console.log(filteredProduct)
  return (
    <>
      <section className="section__container  bg-[#f4e5ec]">
       <h2 className="section__header capitalize">{categoryName}</h2>
       <p className="section__subheader">Browser a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!</p>
    </section>
     {/* Products card */}
     <div className='section__container'>
     <ProductCards products={filteredProduct}/>
     </div>
    
    </>
  
  )
}

export default CategoryPage