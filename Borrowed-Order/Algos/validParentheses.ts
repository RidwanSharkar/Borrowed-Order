// src/Algos/validParentheses.ts

export interface Step {
        char: string;
        action: 'push' | 'pop';
        stack: string[];
        isValid: boolean;
      }
      
      export function validParentheses(s: string): {
        result: boolean;
        steps: Step[];
      } {
        const dict: { [key: string]: string } = {
          ')': '(',
          '}': '{',
          ']': '[',
        };
        const stack: string[] = [];
        const steps: Step[] = [];
        let result = true;
      
        for (const char of s) {
          if (dict[char]) {
            if (!stack.length || stack.pop() !== dict[char]) {
              steps.push({
                char,
                action: 'pop',
                stack: [...stack],
                isValid: false,
              });
              result = false;
              break;
            } else {
              steps.push({
                char,
                action: 'pop',
                stack: [...stack],
                isValid: true,
              });
            }
          } else {
            stack.push(char);
            steps.push({
              char,
              action: 'push',
              stack: [...stack],
              isValid: true,
            });
          }
        }
      
        if (result && stack.length === 0) {
          result = true;
        } else if (result) {
          result = false;
        }
      
        return { result, steps };
      }
      