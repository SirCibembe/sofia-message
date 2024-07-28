const isBrowser = typeof window !== 'undefined';

const safeLocalStorage = {
  getItem: (key: string) => isBrowser ? localStorage.getItem(key) : null,
  setItem: (key: string, value: any) => {
    if (isBrowser) {
      localStorage.setItem(key, value);
    }
  },
  // other localStorage methods
};

export default safeLocalStorage;
