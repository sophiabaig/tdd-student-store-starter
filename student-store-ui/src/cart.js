export function addItemToCart(shoppingCart, products, total, productId) {
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

    console.log(shoppingCart)
    // add product price to total price
    itemIndex = -1
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == productId) {
            itemIndex = i
        }
    }

    // you could also recalculate the total here instead of passing it in
    // if you wanted to (since the new total doesn't actually depend on
    // the old total, just the contents of the shopping cart)
    return {
        newShoppingCart,
        newTotal: total + products[itemIndex].price,
    }
  }
