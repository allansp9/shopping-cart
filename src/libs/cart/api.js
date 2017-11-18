// salva o carrinho no localstore do navegador
const saveToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// retorna o carrinho do localstore ou retorna um carrinho vazio caso um não exista
const getFromLocalStorage = () => {
  const emptyCart = {
    items: [],
  };
  const cart = JSON.parse(localStorage.getItem('cart'));
  return cart || emptyCart;
};

export const fetch = async () => getFromLocalStorage();

export const addToCart = async (productId, quantity = 1) => {
  const cart = await fetch();
  const exists = cart.items.findIndex(item => item.productId === productId) > -1;

  if (exists) {
    throw {
      message: 'Este produto já está no carrinho!',
    };
  }
  const newItem = {
    productId,
    quantity,
  };
  const newCart = {
    ...cart,
    items: [...cart.items, newItem],
  };

  saveToLocalStorage(newCart);

  return newCart;
};

export const removeFromCart = async (productId) => {
  const cart = await fetch();
  const newCart = {
    ...cart,
    items: [...cart.items.filter(item => item.productId !== productId)],
  };

  saveToLocalStorage(newCart);

  return newCart;
};
