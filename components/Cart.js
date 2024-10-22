"use client";

import { useContext, useEffect, useState } from 'react';
import { BasketContext } from './BasketContext';
import { shopItemsData } from './Data';
import CartItem from './CartItem';
import Link from 'next/link';

export default function Cart() {
  const { basket, setBasket } = useContext(BasketContext);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [basket]);

  const calculateTotal = () => {
    const amount = basket.reduce((acc, basketItem) => {
      const itemData = shopItemsData.find(item => item.id === basketItem.id);
      return acc + (itemData.price * basketItem.quantity);
    }, 0);
    setTotalAmount(amount);
  };

  const clearCart = () => {
    setBasket([]);
  };

  if (basket.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold mb-4">Cart is Empty</h2>
        <Link href="/">
          <button className="bg-gray-800 text-white px-4 py-2 rounded">Back to Home</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="shopping-cart grid grid-cols-1 gap-4 justify-center">
        {basket.map(basketItem => {
          const itemData = shopItemsData.find(item => item.id === basketItem.id);
          return <CartItem key={basketItem.id} item={itemData} quantity={basketItem.quantity} />;
        })}
      </div>
      <div className="text-center mt-6">
        <h2 className="text-2xl font-bold mb-4">Total Bill: $ {totalAmount}</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded mr-4">Checkout</button>
        <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded">Clear Cart</button>
      </div>
    </div>
  );
}
