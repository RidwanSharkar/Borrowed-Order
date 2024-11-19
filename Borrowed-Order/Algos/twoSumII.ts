export interface Step {
  left: number;
  right: number;
  sum: number;
  status: string;
  array: number[];
}

interface TwoSumIIResult {
  indices: number[] | null;
  steps: Step[];
}

export function twoSumII(numbers: number[], target: number): TwoSumIIResult {
  let left = 0;
  let right = numbers.length - 1;
  const steps: Step[] = [];
  let result: number[] | null = null;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    let status = '';

    if (sum === target) {
      status = 'Found';
      result = [left + 1, right + 1];
      steps.push({ left, right, sum, status, array: [...numbers] });
      break;
    } else if (sum < target) {
      status = 'Move Left Pointer Right';
      steps.push({ left, right, sum, status, array: [...numbers] });
      left++;
    } else {
      status = 'Move Right Pointer Left';
      steps.push({ left, right, sum, status, array: [...numbers] });
      right--;
    }
  }

  if (!result) {
    steps.push({ left, right, sum: numbers[left] + numbers[right], status: 'No Solution', array: [...numbers] });
  }

  return { indices: result, steps };
} 