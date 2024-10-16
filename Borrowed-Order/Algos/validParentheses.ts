// src/Algos/validParentheses.ts

export interface Step {
        char: string;
        action: string;
        stack: string[];
        index: number;
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
      
        for (let i = 0; i < s.length; i++) {
          const char = s[i];
          if (dict[char]) {
            const top = stack.pop();
            const isValid = top === dict[char];
            steps.push({
              char,
              action: 'pop',
              stack: [...stack],
              index: i,
              isValid,
            });
            if (!isValid) {
              result = false;
              break;
            }
          } else {
            stack.push(char);
            steps.push({
              char,
              action: 'push',
              stack: [...stack],
              index: i,
              isValid: true,
            });
          }
        }
      
        if (stack.length > 0) result = false;
      
        return { result, steps };
      }
      