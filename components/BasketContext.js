"use client";

import { createContext, useState, useEffect } from 'react';

export const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState([]);


  useEffect(() => {
    const data = localStorage.getItem('basket');
    if (data) {
      setBasket(JSON.parse(data));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  );
}
