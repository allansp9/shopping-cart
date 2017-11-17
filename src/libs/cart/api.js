const saveToLocalStorage = cart => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getFromLocalStorage = () => {
  const emptyCart = { items: [] };
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart || emptyCart;
};

export const fetch = async () => getFromLocalStorage();

export const addToCart = async (productId, quantity = 1) => {
  const cart = await fetch();
  const exists =
    cart.items.findIndex(item => item.productId === productId) > -1;

  if (exists) {
    throw { message: "Este produto já está no carrinho!" };
  }
  const newItem = { productId, quantity };
  const newCart = {
    ...cart,
    items: [...cart.items, newItem]
  };

  saveToLocalStorage(newCart);

  return newCart;
};

addToCart("5a0edddefd0cb01c641d92bf", 5);

console.log("cart", getFromLocalStorage());
