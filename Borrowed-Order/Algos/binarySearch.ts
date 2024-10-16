// src/Algos/binarySearch.ts

export interface Step {
        left: number;
        right: number;
        mid: number;
        nums: number[];
        target: number;
        found: boolean;
      }
      
      export function binarySearch(nums: number[], target: number): {
        index: number;
        steps: Step[];
      } {
        let left = 0;
        let right = nums.length - 1;
        const steps: Step[] = [];
        let index = -1;
      
        while (left <= right) {
          const mid = left + Math.floor((right - left) / 2);
          steps.push({
            left,
            right,
            mid,
            nums,
            target,
            found: nums[mid] === target,
          });
          if (nums[mid] === target) {
            index = mid;
            break;
          } else if (nums[mid] < target) {
            left = mid + 1;
          } else {
            right = mid - 1;
          }
        }
      
        return { index, steps };
      }
      