"use client";

import { useContext } from 'react';
import { BasketContext } from './BasketContext';

export default function CartItem({ item, quantity }) {
  const { id, name, img, price } = item;
  const { basket, setBasket } = useContext(BasketContext);

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

  const removeItem = () => {
    const newBasket = basket.filter(basketItem => basketItem.id !== id);
    setBasket(newBasket);
  };

  return (
    <div className="cart-item border-2 border-gray-800 rounded flex">
      <img width="100" src={img} alt={name} />

      <div className="details p-4 flex flex-col justify-between w-full">
        <div className="title-price-x flex justify-between items-center">
          <h4 className="title-price flex items-center gap-2">
            <p className="text-lg font-bold">{name}</p>
            <p className="cart-item-price bg-gray-800 text-white px-2 py-1 rounded">${price}</p>
          </h4>
          <i onClick={removeItem} className="bi bi-x-lg text-red-500 cursor-pointer"></i>
        </div>

        <div className="cart-buttons flex items-center justify-between mt-4">
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
          <h3 className="text-xl font-bold">$ {quantity * price}</h3>
        </div>
      </div>
    </div>
  );
}
