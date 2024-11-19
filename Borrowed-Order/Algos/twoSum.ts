export interface Step {
  index: number;
  value: number;
  complement: number;
  found: boolean;
}

export function twoSum(nums: number[], target: number): {
  indices: [number, number] | null;
  steps: Step[];
} {
  const steps: Step[] = [];
  const numToIndex: Map<number, number> = new Map();

  for (let i = 0; i < nums.length; i++) {
    const value = nums[i];
    const complement = target - value;
    const found = numToIndex.has(complement);
    steps.push({
      index: i,
      value,
      complement,
      found,
    });
    if (found) {
      return {
        indices: [numToIndex.get(complement)!, i],
        steps,
      };
    }
    numToIndex.set(value, i);
  }

  return { indices: null, steps };
} 