// salva o carrinho no localstore do navegador
const saveToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// retorna o carrinho do localstore ou retorna um carrinho vazio caso um não exista
const getFromLocalStorage = () => {
  const emptyCart = {
    items: [],
    totalPrice: [],
  };
  const cart = JSON.parse(localStorage.getItem('cart'));
  return cart || emptyCart;
};

export const fetch = async () => getFromLocalStorage();

export const addToCart = async (productId, productPrice, quantity) => {
  const cart = await fetch();
  const product = cart.items.findIndex(item => item.productId === productId);

  if (product > -1) {
    throw 'Produto já está no carrinho';
  }

  const newItem = {
    productId,
    productPrice,
    quantity,
  };
  const newCart = {
    ...cart,
    items: [...cart.items, newItem],
    totalPrice: [...cart.totalPrice, parseFloat(productPrice)],
  };

  saveToLocalStorage(newCart);

  return newCart;
};

export const removeFromCart = async (productId, productPrice) => {
  const cart = await fetch();
  const newCart = {
    ...cart,
    items: [...cart.items.filter(item => item.productId !== productId)],
    totalPrice: [...cart.totalPrice.filter(item => item !== parseFloat(productPrice))],
  };

  saveToLocalStorage(newCart);

  return newCart;
};
