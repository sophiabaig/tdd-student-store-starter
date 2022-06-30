import * as React from "react"
import { getItemFromProducts } from "../../utils"
import "./ShoppingCart.css"

export default function ShoppingCart(props) {
  var shoppedItems = props.shoppingCart
  if (shoppedItems.length == 0) {
    return <p className="notification">No items added to cart yet. Start shopping now!</p>
  }

  return (
    <div className="shopping-cart">
    {
      shoppedItems.map((shoppedItem) => (
        <div key={shoppedItem.itemId}>
            <p className="card-product-name">{getItemFromProducts(props.products, shoppedItem.itemId).name}</p>
            <p className="card-product-quantity">{shoppedItem.quantity}</p>
        </div>
      ))
    }
    <p className="total-price">{props.total}</p>
    </div>
  )
}
