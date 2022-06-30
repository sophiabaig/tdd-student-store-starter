import * as React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ProductView from "../ProductView/ProductView"
import NotFound from "../NotFound/NotFound"
import axios from 'axios';
import "./ProductDetail.css"

export default function ProductDetail(props) {
  const [product, setProduct] = useState({})
  const [isFetching, setIsFetching] = useState(false)
  const { productId } = useParams()
  const productsApiUrl = "https://codepath-store-api.herokuapp.com/store"
  
  var isValid = false
  for (let i = 0; i < props.products.length; i++) {
    if(props.products[i].id == productId) {
      isValid = true
    }
  }

  var quantity = null
  for (let i = 0; i < props.shoppingCart.length; i++) {
    if(props.shoppingCart[i].itemId == productId) {
      quantity = props.shoppingCart[i].quantity
    }
  }
  
  useEffect(() => {
    setIsFetching(true)
    async function fetchData() {
      const { data } = await axios(`${productsApiUrl}/${productId}`)
      setProduct(data.product)
    }
    fetchData()
    setIsFetching(false)
  })

  return (
    <div className="product-detail">
      {isFetching
        ? <h1 className="loading">Loading...</h1>
        : isValid 
          ? <ProductView quantity={quantity} productId={productId} product={product} handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemFromCart={props.handleRemoveItemFromCart}/>
          : <NotFound />
      }
    </div>
    )
  }