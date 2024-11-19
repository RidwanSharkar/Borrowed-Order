export interface Step {
  index: number;
  value: number;
  found: boolean;
}

export function containsDuplicate(nums: number[]): {
  hasDuplicate: boolean;
  steps: Step[];
} {
  const steps: Step[] = [];
  const seen = new Set<number>();
  let hasDuplicate = false;

  for (let i = 0; i < nums.length; i++) {
    const value = nums[i];
    const found = seen.has(value);
    steps.push({ index: i, value, found });
    if (found) {
      hasDuplicate = true;
      break;
    }
    seen.add(value);
  }

  return { hasDuplicate, steps };
} 