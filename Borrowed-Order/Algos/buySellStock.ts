// src/Algos/buySellStock.ts

export interface Step {
        day: number;
        price: number;
        minPrice: number;
        maxProfit: number;
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
          if (price < minPrice) {
            minPrice = price;
          } else if (price - minPrice > maxProfit) {
            maxProfit = price - minPrice;
          }
          steps.push({
            day: i,
            price,
            minPrice,
            maxProfit,
          });
        }
      
        return { maxProfit, steps };
      }
      