import * as React from "react"
import "./ShoppingCart.css"

export default function ShoppingCart(props) {
  var shoppedItems = props.shoppingCart
  if (shoppedItems.length == 0) {
    return <p className="notification">No items added to cart yet. Start shopping now!</p>
  }
  const findName = (itemId) => {
    var itemIndex = -1
    for (let i = 0; i < props.products.length; i++) {
        if (props.products[i].id == itemId) {
            itemIndex = i
        }
    }
    return props.products[itemIndex].name
  }
  return (
    <div className="shopping-cart">
    {
      shoppedItems.map((shoppedItem) => (
        <div key={shoppedItem.itemId}>
            <p className="card-product-name">{findName(shoppedItem.itemId)}</p>
            <p className="card-product-quantity">{shoppedItem.quantity}</p>
        </div>
      ))
    }
    <p className="total-price">{props.total}</p>
    </div>
  )
}