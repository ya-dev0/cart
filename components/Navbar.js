"use client";

import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import { BasketContext } from './BasketContext';

export default function Navbar() {
  const { basket } = useContext(BasketContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const count = basket.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [basket]);

  return (
    <nav className="flex justify-between bg-gray-800 text-white p-6">
      <Link href="/">
        <h2 className="text-xl font-bold cursor-pointer">Clothing Store</h2>
      </Link>

      <Link href="/cart">
        <div className="relative bg-white text-gray-800 p-2 rounded cursor-pointer">
          <i className="bi bi-cart2 text-2xl"></i>
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-sm px-1 rounded">
            {cartCount}
          </div>
        </div>
      </Link>
    </nav>
  );
}
