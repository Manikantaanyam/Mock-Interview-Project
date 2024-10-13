export const setItem = (key: string, value: string) => {
  return sessionStorage.setItem(key, value);
};

export const getItem = (key: string): string | null => {
  return sessionStorage.getItem(key);
};
