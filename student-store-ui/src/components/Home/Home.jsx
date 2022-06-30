import * as React from "react"
import "./Home.css"

import Hero from "../Hero/Hero"
import ProductGrid from "../ProductGrid/ProductGrid"

const categories = [
  {id: "all", name: "All Categories"},
  {id: "clothing", name: "Clothing"},
  {id: "food", name: "Food"},
  {id: "accessories", name: "Accessories"},
  {id: "tech", name: "Tech"},
];

export default function Home(props) {
  return (
    <div className="home">
      <Hero />
      <input type="text" className="search-bar" placeholder="Search..." name="search" value={props.search} onChange={props.handleOnSearchChange}/>
      {categories.map(category => <button className="category" onClick={() => props.handleCategoryChange(category.id)}>{category.name}</button>)};
      <ProductGrid products={props.products} shoppingCart={props.shoppingCart} handleAddItemToCart={props.handleAddItemToCart} handleRemoveItemFromCart={props.handleRemoveItemFromCart}/>
    </div>
  )
}
