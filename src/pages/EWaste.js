import React, { useState } from 'react';
import './store.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const products = [
  {
    id: 1,
    name: 'Wall Hanging Coconut Vase',
    price: 1700,
    image: '/prod1.jpg',
    description: 'Handcrafted from sustainable coconut shells, perfect for home decor'
  },
  {
    id: 2,
    name: 'Decor Bottles',
    price: 1100,
    image: '/prod2.jpg',
    description: 'Recycled glass bottles with natural fiber decorations'
  },
  {
    id: 3,
    name: 'Reusable Jute Bag',
    price: 500,
    image: '/prod3.jpg',
    description: 'Eco-friendly jute material with cotton handles'
  },
  {
    id: 4,
    name: 'Garbage Bags',
    price: 228,
    image: '/prod4.jpg',
    description: 'Biodegradable bags made from plant-based materials(30 bags)'
  },
  {
    id: 5,
    name: 'Safety Gloves',
    price: 176,
    image: '/prod5.jpg',
    description: 'Reusable rubber gloves for cleaning and gardening(3 pairs)'
  },
  {
    id: 6,
    name: 'Trash Picker',
    price: 400,
    image: '/prod6.png',
    description: 'Stainless steel grabber for waste collection'
  },
  {
    id: 7,
    name: 'Safety Vest',
    price: 50,
    image: '/prod7.jpeg',
    description: 'Recycled polyester high-visibility safety vest'
  },
  {
    id: 8,
    name: 'Jute Wall Decor',
    price: 1400,
    image: '/prod8.jpeg',
    description: 'Handwoven jute wall hanging with natural dyes'
  },
];

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        <div className="product-overlay">
          <p className="product-description">{product.description}</p>
        </div>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-price">Rs {product.price.toFixed(2)}</div>
        <button 
          className="buy-button"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const CartModal = ({ cartItems, onClose, onRemove }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-modal">
      <div className="cart-content">
        <h2>Shopping Cart</h2>
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-price">Rs {item.price.toFixed(2)}</span>
              </div>
              <button 
                className="remove-button"
                onClick={() => onRemove(index)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <h3>Total: Rs {totalPrice.toFixed(2)}</h3>
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const Stores = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  
  const handleAddToCart = (product) => {
    setCartItems(prevItems => [...prevItems, product]);
  };

  const handleRemoveItem = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="App">
      <div className="cart-icon" onClick={toggleCart}>
        <i className="fa fa-shopping-cart"></i>
        <span className="cart-count">{cartItems.length}</span>
      </div>
      
      {showCart && (
        <CartModal 
          cartItems={cartItems} 
          onClose={() => setShowCart(false)}
          onRemove={handleRemoveItem}
        />
      )}

      <h1>🌱 Eco-Friendly Products Store 🌎</h1>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Stores;
