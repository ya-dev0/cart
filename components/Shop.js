"use client";

import { shopItemsData } from './Data';
import ShopItem from './ShopItem';

export default function Shop() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center mb-12">
      {shopItemsData.map(item => (
        <ShopItem key={item.id} item={item} />
      ))}
    </div>
  );
}
