export const setItem = (key: string, value: string) => {
  return sessionStorage.setItem(key, value);
};

export const getItem = (key: string) => {
  return sessionStorage.getItem(key);
};
