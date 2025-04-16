import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/getbaseurl'


const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/products`,
        credentials: 'include' //amamder token pathaile jate problem na hoy
    }),
    tagTypes: ["Products"],
    endpoints: (builder) =>({
        // get all products
        fetchAllProduts:  builder.query({
            query:({category, color, minPrice, maxPrice, page=1, limit=10}) =>{
                const queryParams = new URLSearchParams({
                    category: category || '',
                    color: color || '',
                    minPrice: minPrice || 0,
                    maxPrice: maxPrice || '',
                    page: page.toString(),
                    limit: limit.toString()
                })
                 return `/?${queryParams}`
            },
            providesTags: ["Products"]
        }),
        //get single products
        fetchProductbyId: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{type:"Products", id }]
        }),
        //crate/add products
        AddProduct: builder.mutation({
            query: (newProduct) => ({
                url: "/create-product", 
                method: "POST",
                body: newProduct, 
                credentials: 'include'
            }),
            invalidatesTags: ["Products"]
        }),
        updateProduct: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/update-product/${id}`,
                method: "PATCH",
                body: rest,
            }),
            invalidatesTags: ["Products"]
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{type:"Products", id }]
        })
    })
})

export const {useFetchAllProdutsQuery,useFetchProductbyIdQuery,useAddProductMutation,useUpdateProductMutation,useDeleteProductMutation} = productsApi
export default productsApi