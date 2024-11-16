// src/Algos/buySellStock.ts

export interface Step {
  day: number;
  price: number;
  minPrice: number;
  maxProfit: number;
  description: string;
}

export function maxProfit(prices: number[]): {
  maxProfit: number;
  steps: Step[];
} {
  let minPrice = Infinity;
  let maxProfit = 0;
  const steps: Step[] = [];

  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];
    let action = '';

    if (price < minPrice) {
      minPrice = price;
      action = 'New minimum price found';
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
      action = 'New maximum profit found';
    } else {
      action = 'No change';
    }

    steps.push({
      day: i,
      price,
      minPrice,
      maxProfit,
      description: action,
    });
  }

  return { maxProfit, steps };
}