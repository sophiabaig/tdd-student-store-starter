import * as React from "react"
import { getItemFromShoppingCart } from "../../utils"
import ProductCard from "../ProductCard/ProductCard"
import "./ProductGrid.css"

export default function ProductGrid(props) {
  console.log('props.shoppingCart', props.shoppingCart)
  var products = props.products

  return (
    <div className="product-grid">{
      products.map((product) => (
        <ProductCard key={product.id} quantity={getItemFromShoppingCart(product.id).quantity} product={product} productId={product.id} shoppingCart={props.shoppingCart} handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemFromCart={props.handleRemoveItemFromCart} showDescription={false}/>
      ))
    }
    </div>
  )
}
