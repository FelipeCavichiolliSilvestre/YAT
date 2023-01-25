export function arrayContainsAllOfSubArray(
  arr: number[],
  sub: number[],
): boolean {
  arr.sort();
  sub.sort();

  let i = 0;
  let j = 0;
  while (arr.length > i && sub.length > j) {
    const arrayElement = arr[i];
    const subArrayElement = sub[j];

    if (arrayElement < subArrayElement) i++;
    else if (subArrayElement < arrayElement) return false;
    else {
      i++;
      j++;
    }
  }

  return j !== sub.length - 1;
}
