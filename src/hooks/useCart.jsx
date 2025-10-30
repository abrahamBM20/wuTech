import { useState, useContext, createContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (producto) => {
    setCarrito(prev => [...prev, producto]);
  };

  const eliminarDelCarrito = (index) => {
    setCarrito(prev => prev.filter((_, i) => i !== index));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const finalizarCompra = () => {
    alert("¡Gracias por tu compra! 🛒");
    vaciarCarrito();
    setShowCart(false);
  };

  const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);

  return (
    <CartContext.Provider value={{
      carrito,
      addToCart,
      eliminarDelCarrito,
      vaciarCarrito,
      finalizarCompra,
      total,
      showCart,
      setShowCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};