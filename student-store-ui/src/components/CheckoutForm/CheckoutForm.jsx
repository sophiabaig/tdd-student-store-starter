import * as React from "react"
import "./CheckoutForm.css"

export default function CheckoutForm(props) {
  
  return (
    <div className="checkout-form">
        <input className="checkout-form-input" type="email" placeholder="student@codepath.org" name="email" value={props.checkoutForm.email} onChange={props.handleOnCheckoutFormChange}/>
        <input type="text" className="checkout-form-input" placeholder="Student Name" name="name" value={props.checkoutForm.name} onChange={props.handleOnCheckoutFormChange}/>
        <button className="checkout-button" onClick={props.handleOnSubmitCheckoutForm}>Checkout</button>
        {props.checkoutMessage == "Success!"
            ? <p className="success">{props.checkoutMessage}</p>
            : <p className="error">{props.checkoutMessage}</p>
        }
    </div>
  )
}