export const getPaginationNumbers = (
  current: number,
  total: number,
  max = 4,
) => {
  const start = Math.max(1, current - Math.floor(max / 2));
  const end = Math.min(total, start + max - 1);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};