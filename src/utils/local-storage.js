// This data variable was added to prevent application callapse in case there are issues with localStorage
// that are known to happen, the data variable will be used as fallback in those cases
const _data = {};
const supported = typeof localStorage ? true : false;

export const sStorage = {
    getItem: (key) => {
        try {
            if (!supported) {
                return _data[key];
            }
            const value = localStorage.getItem(key);
            if (value) {
                return JSON.parse(value);
            }
            return null;
        } catch (e) {
            return null;
        }
    },
    setItem: (key, value) => {
        try {
            if (!supported) {
                _data[key] = value;
                return value;
            }
            localStorage.setItem(key, JSON.stringify(value));
            return value;
        } catch (e) {
            return null;
        }
    },
};
