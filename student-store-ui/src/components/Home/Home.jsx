import * as React from "react"
import "./Home.css"

import Hero from "../Hero/Hero"
import ProductGrid from "../ProductGrid/ProductGrid"

export default function Home(props) {
  return (
    <div className="home">
      <Hero />
      <input type="text" className="search-bar" placeholder="Search..." name="search" value={props.search} onChange={props.handleOnSearchChange}/>
      <button className="category" onClick={() => props.handleCategoryChange("all")}>All Categories</button>
      <button className="category" onClick={() => props.handleCategoryChange("clothing")}>Clothing</button>
      <button className="category" onClick={() => props.handleCategoryChange("food")}>Food</button>
      <button className="category" onClick={() => props.handleCategoryChange("accessories")}>Accessories</button>
      <button className="category" onClick={() => props.handleCategoryChange("tech")}>Tech</button>
      <ProductGrid products={props.products} shoppingCart={props.shoppingCart} handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemFromCart={props.handleRemoveItemFromCart}/>
    </div>
  )
}