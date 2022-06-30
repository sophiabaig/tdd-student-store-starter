export function getItemFromProducts(products, itemId) {
    return products.find(item => item.id == itemId);
}

export function getItemFromShoppingCart(cart, itemId) {
    return cart.find(item.itemId == itemId);
}
