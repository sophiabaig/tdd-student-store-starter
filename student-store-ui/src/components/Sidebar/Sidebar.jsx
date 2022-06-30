import * as React from "react"
import ShoppingCart from "../ShoppingCart/ShoppingCart"
import CheckoutForm from "../CheckoutForm/CheckoutForm"
import "./Sidebar.css"

export default function Sidebar(props) {
  var toggleProperties = "sidebar"
  if (props.isOpen) {
    toggleProperties = "sidebar open"
  }
  return (
    <section className={toggleProperties}> 
    {props.isOpen
      ? <>
          <button className="toggle-button" onClick={props.handleOnToggle}>Toggle</button>
          <ShoppingCart total={props.total} products={props.products} shoppingCart={props.shoppingCart} isOpen={props.isOpen}/>
          <CheckoutForm checkoutMessage={props.checkoutMessage} isOpen={props.isOpen} shoppingCart={props.shoppingCart} checkoutForm={props.checkoutForm} handleOnCheckoutFormChange={props.handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={props.handleOnSubmitCheckoutForm}/>
        </>
      : <button className="toggle-button" onClick={props.handleOnToggle}>Toggle</button>
    } 
    </section>
  )
}