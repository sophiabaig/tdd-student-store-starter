import * as React from "react"
import Logo from "../Logo/Logo"
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <Logo />
      <p>Home</p>
      <p>About Us</p>
      <p>Contact Us</p>
      <p>Buy Now</p>
    </nav>
  )
}