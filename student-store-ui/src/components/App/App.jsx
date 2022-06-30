import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import ProductDetail from "../ProductDetail/ProductDetail"
import NotFound from "../NotFound/NotFound"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios';
import "./App.css"

export default function App() {
  var basicUser = {
    name: "",
    email: ""
  }
  const productsApiUrl = "https://codepath-store-api.herokuapp.com/store"

  const [products, setProducts] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [shoppingCart, setShoppingCart] = useState([])
  const [checkoutForm, setCheckoutForm] = useState(basicUser)
  const [total, setTotal] = useState(0)
  const [checkoutMessage, setCheckoutMessage] = useState("")
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")


  useEffect(async () => {
    console.log("in use effect")
    async function fetchData() {
      try {
        console.log("in fetch data")
        setIsFetching(true)
        var { data } = await axios(productsApiUrl)
        console.log("axois data", data.products)
        var allProducts = data.products.filter(product => {
          if (category != "all" && product.category != category) {
            return false;
          }

          if (search.length > 0 && !allProducts[i].name.toLowerCase().includes(search)) {
            return false;
          }

          return true;
        });
        setProducts(allProducts)
      } catch (err) {
        setError(err)
      }
      setIsFetching(false)
    }
    fetchData()


    if(products.length == 0) {
      setError("no products found in response")
    }
  }, [search, category])

  const handleOnToggle = () => {
    if(isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  const handleAddItemToCart = (productId) => {
    // console.log(shoppingCart)
    // look if product already in shopping cart
    var itemIndex = shoppingCart.findIndex(item => item.itemID == productId);
    var newShoppingCart = []
    for (let i = 0; i < shoppingCart.length; i++) {
      newShoppingCart.push(shoppingCart[i])
    }
    // not in cart, add new product in cart
    if (itemIndex == -1) {
      console.log("not in cart")
      var newItem = {
        itemId: productId,
        quantity: 1
      }
      console.log(newItem)
      newShoppingCart.push(newItem)
      // setShoppingCart([...shoppingCart, newItem])
      console.log("shopping cart state", shoppingCart)
    // in cart, increase product quantity
    } else {
      const oldItem = newShoppingCart[itemIndex];
      newShoppingCart[itemIndex] = {
        ...oldItem,
        quantity: oldItem.quantity + 1,
      };
    }
    setShoppingCart(newShoppingCart)
    console.log(shoppingCart)
    // add product price to total price
    itemIndex = -1
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == productId) {
            itemIndex = i
        }
    }
    setTotal(total + products[itemIndex].price)
  }

  const handleRemoveItemFromCart = (productId) => {
    var itemIndex = -1
    // look if product already in shopping cart
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].itemId == productId) {
        itemIndex = i
      }
    }
    var newShoppingCart = []
    for (let i = 0; i < shoppingCart.length; i++) {
      newShoppingCart.push(shoppingCart[i])
    }
    // remove item if only exist
    if (itemIndex > -1) {
      newShoppingCart[itemIndex].quantity -= 1
      // remove item from shopping cart
      if (newShoppingCart[itemIndex].quantity == 0) {
        newShoppingCart.splice(itemIndex, 1)
      }
    }
    setShoppingCart(newShoppingCart)
    // subtract product price to total price
    itemIndex = -1
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == productId) {
            itemIndex = i
        }
    }
    setTotal(total + products[itemIndex].price)
  }
  // update checkoutForm object for specific input
  const handleOnCheckoutFormChange = (event) => {
    var key = event.target.name
    var val = event.target.value
    console.log("key", key)
    console.log("val", val)
    var newCheckoutForm = {
      name: checkoutForm.name,
      email: checkoutForm.email
    }
    newCheckoutForm[key] = val
    console.log(newCheckoutForm)
    setCheckoutForm(newCheckoutForm)
    console.log("new checkout form", checkoutForm)
  }

  const handleOnSubmitCheckoutForm = () => {
    console.log("in check out button onclick")
    console.log(checkoutForm)
    var newOrder = {
      user: checkoutForm,
      shoppingCart: shoppingCart
    }
    axios.post(productsApiUrl, newOrder).then(function (response) {
      console.log(response)
      setCheckoutMessage("Success!")
      setShoppingCart([])
      setCheckoutForm(basicUser)
    }).catch(function (error) {
      console.log(error)
      setCheckoutMessage(error)
    })
    // try {
    //   axios.post(productsApiUrl, newOrder)
    // } catch (err) {
    //   setCheckoutMessage(err)
    // }
    // if (checkoutMessage == "") {
    //   setCheckoutMessage("Success!")
    //   setShoppingCart([])
    //   setCheckoutForm({})
    // }
  }

  const handleOnSearchChange = (event) => {
    var newSearch = event.target.value
    setSearch(newSearch.toLowerCase())
  }

  const handleCategoryChange = (curCategory) => {
    console.log("clicked category", curCategory)
    setCategory(curCategory)
  }

  return (
    <div className="app">
      <BrowserRouter>
        <main>
          {/* YOUR CODE HERE! */}
          <Navbar />
          <Sidebar checkoutMessage={checkoutMessage} total={total} handleOnToggle={handleOnToggle} handleOnCheckoutFormChange={handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} checkoutForm={checkoutForm} products={products} shoppingCart={shoppingCart} isOpen={isOpen}/>
          <Routes>
            <Route path="/" element={<Home handleCategoryChange={handleCategoryChange} handleOnSearchChange={handleOnSearchChange} shoppingCart={shoppingCart} products={products} handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart}/>} />
            <Route path="/products/:productId" element={<ProductDetail products={products} shoppingCart={shoppingCart} handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart}/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}
