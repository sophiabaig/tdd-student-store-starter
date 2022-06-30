import * as React from "react"
import { Link } from "react-router-dom"
import "./ProductCard.css"

export default function ProductCard(props) {
  // console.log("shopping cart in product card", props.shoppingCart)
  // console.log(props.quantity)
  
  return (
    <div className="product-card">
      
      {props.showDescription 
        ? <p className="product-description">{props.product.description}</p>
        : null
      }
      <div className="media">
        <Link to={`/products/${props.product.id}`}>
          <img src={props.product.image} alt={props.product.name} />
        </Link>
      </div>
      <p className="product-name">{props.product.name}</p>
      <p className="product-price">${props.product.price}</p>
      <button className="add" onClick={() => props.handleAddItemToCart(props.productId)}>Add</button>
      <button className="remove" onClick={() => props.handleRemoveItemFromCart(props.productId)}>Remove</button>
      <p className="product-quantity">{props.quantity}</p>
    </div>
  )
}