import * as React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ProductView from "../ProductView/ProductView"
import NotFound from "../NotFound/NotFound"
import axios from 'axios';
import "./ProductDetail.css"
import { getItemFromProducts, getItemFromShoppingCart } from "../../utils"

export default function ProductDetail(props) {
  const [product, setProduct] = useState({})
  const [isFetching, setIsFetching] = useState(false)
  const { productId } = useParams()
  const productsApiUrl = "https://codepath-store-api.herokuapp.com/store"

  const productItem = getItemFromProducts(props.products, productId);
  const cartItem = getItemFromShoppingCart(props.shoppingCart, productId);

  useEffect(() => {
    // handle invalid (productItem == null) here?
    // if it's invalid, should we skip the fetching?
    setIsFetching(true)
    async function fetchData() {
      const { data } = await axios(`${productsApiUrl}/${productId}`)
      setProduct(data.product)
      setIsFetching(false)
    }
    fetchData()
  })

  return (
    <div className="product-detail">
      {isFetching
        ? <h1 className="loading">Loading...</h1>
        : productItem != null
          ? <ProductView quantity={cartItem.quantity} productId={productId} product={product} handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemFromCart={props.handleRemoveItemFromCart}/>
          : <NotFound />
      }
    </div>
    )
  }
