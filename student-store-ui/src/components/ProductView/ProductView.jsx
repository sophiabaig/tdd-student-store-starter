import * as React from "react"
import ProductCard from "../ProductCard/ProductCard"
import "./ProductView.css"


export default function ProductView(props) {

  return (
    <div className="product-view">
      <h1 className="product-id">Product {props.productId}</h1>
      <ProductCard quantity={props.quantity} productId={props.productId} product={props.product} handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemFromCart={props.handleRemoveItemFromCart} showDescription={true}/>
    </div>
  )
}