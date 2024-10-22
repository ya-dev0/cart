"use client";

import { useContext } from 'react';
import { BasketContext } from './BasketContext';

export default function ShopItem({ item }) {
  const { id, name, desc, img, price } = item;
  const { basket, setBasket } = useContext(BasketContext);

  const basketItem = basket.find(basketItem => basketItem.id === id);
  const quantity = basketItem ? basketItem.quantity : 0;

  const addToCart = () => {
    const newBasket = [...basket];
    const basketIndex = newBasket.findIndex(basketItem => basketItem.id === id);

    if (basketIndex >= 0) {
      newBasket[basketIndex].quantity += 1;
    } else {
      newBasket.push({ id, quantity: 1 });
    }

    setBasket(newBasket);
  };

  const increment = () => {
    const newBasket = [...basket];
    const basketIndex = newBasket.findIndex(basketItem => basketItem.id === id);

    if (basketIndex >= 0) {
      newBasket[basketIndex].quantity += 1;
      setBasket(newBasket);
    }
  };

  const decrement = () => {
    let newBasket = [...basket];
    const basketIndex = newBasket.findIndex(basketItem => basketItem.id === id);

    if (basketIndex >= 0) {
      if (newBasket[basketIndex].quantity > 1) {
        newBasket[basketIndex].quantity -= 1;
      } else {
        // Remove item from basket if quantity is zero
        newBasket = newBasket.filter(basketItem => basketItem.id !== id);
      }
      setBasket(newBasket);
    }
  };

  return (
    <div className="border-2 border-gray-800 rounded">
      <img className="w-full rounded-t" src={img} alt={name} />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold">{name}</h3>
        <p>{desc}</p>
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-xl font-bold">${price}</h2>
          {quantity === 0 ? (
            <button
              onClick={addToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={decrement}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                -
              </button>
              <div id={id} className="text-lg font-bold">{quantity}</div>
              <button
                onClick={increment}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
