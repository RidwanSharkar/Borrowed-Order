export interface Step {
  index: number;
  word: string;
  key: string;
  groups: { [key: string]: string[] };
}

export function groupAnagramsSorting(strs: string[]): {
  grouped: string[][];
  steps: Step[];
} {
  const steps: Step[] = [];
  const anagramMap: { [key: string]: string[] } = {};

  for (let i = 0; i < strs.length; i++) {
    const word = strs[i];
    const key = word.split('').sort().join('');
    steps.push({ index: i, word, key, groups: {} });
    if (!anagramMap[key]) {
      anagramMap[key] = [];
    }
    anagramMap[key].push(word);
  }

  const grouped = Object.values(anagramMap);
  return { grouped, steps };
}

export function groupAnagramsHashMap(strs: string[]): {
  grouped: string[][];
  steps: Step[];
} {
  const steps: Step[] = [];
  const anagramMap: { [key: string]: string[] } = {};

  for (let i = 0; i < strs.length; i++) {
    const word = strs[i];
    const count = new Array(26).fill(0);
    for (const char of word) {
      count[char.charCodeAt(0) - 97]++;
    }
    const key = count.join(',');
    steps.push({ index: i, word, key, groups: {} });
    if (!anagramMap[key]) {
      anagramMap[key] = [];
    }
    anagramMap[key].push(word);
  }

  const grouped = Object.values(anagramMap);
  return { grouped, steps };
} 