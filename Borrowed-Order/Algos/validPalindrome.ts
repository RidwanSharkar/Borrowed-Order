// src/Algos/validPalindrome.ts

export interface Step {
        left: number;
        right: number;
        chars: string[];
        isEqual: boolean;
      }
      
      export function validPalindrome(s: string): {
        result: boolean;
        steps: Step[];
      } {
        // Convert to lowercase and remove non-alphanumeric characters
        s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
        const chars = s.split('');
        let left = 0;
        let right = chars.length - 1;
        const steps: Step[] = [];
      
        let result = true;
      
        while (left <= right) {
          const isEqual = chars[left] === chars[right];
          steps.push({
            left,
            right,
            chars: [...chars],
            isEqual,
          });
          if (!isEqual) {
            result = false;
            break;
          }
          left++;
          right--;
        }
      
        return { result, steps };
      }
      