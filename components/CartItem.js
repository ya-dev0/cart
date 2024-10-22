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
    } else {
      newBasket.push({ id, quantity: 1 });
    }

    setBasket(newBasket);
  };

  const decrement = () => {
    let newBasket = [...basket];
    const basketIndex = newBasket.findIndex(basketItem => basketItem.id === id);

    if (basketIndex >= 0) {
      if (newBasket[basketIndex].quantity > 1) {
        newBasket[basketIndex].quantity -= 1;
      } else {
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

      <div className="details p-4 flex flex-col justify-between">
        <div className="title-price-x flex justify-between items-center">
          <h4 className="title-price flex items-center gap-2">
            <p className="text-lg font-bold">{name}</p>
            <p className="cart-item-price bg-gray-800 text-white px-2 py-1 rounded">${price}</p>
          </h4>
          <i onClick={removeItem} className="bi bi-x-lg text-red-500 cursor-pointer"></i>
        </div>

        <div className="cart-buttons flex items-center">
          <div className="buttons flex items-center gap-2 text-lg">
            <i onClick={decrement} className="bi bi-dash-lg text-red-500 cursor-pointer"></i>
            <div id={id} className="quantity">{quantity}</div>
            <i onClick={increment} className="bi bi-plus-lg text-green-500 cursor-pointer"></i>
          </div>
        </div>

        <h3 className="text-xl font-bold">$ {quantity * price}</h3>
      </div>
    </div>
  );
}
