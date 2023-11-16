import { capitalise } from '@/utils/string-manipulation';

// Custom Validators
export const hasNoneWhitespaceChars = {
  validator(data) {
    const isValid = (str) => (str.trim().length > 0 ? true : false);

    // handle array of strings
    if (Array.isArray(data)) return data.every(isValid);

    // handle string
    return isValid(data);
  },
  message({ path }) {
    return `${capitalise(path)} cannot only contain spaces`;
  },
};

export const isAlphabetical = {
  // NOTE: also allows space separated words
  validator(data) {
    const isValid = (str) => /^[A-Za-z\s-]+$/.test(str);

    // handle array of strings
    if (Array.isArray(data)) return data.every(isValid);

    // handle string
    return isValid(data);
  },
  message({ path }) {
    return `${capitalise(path)} can only contain letters A-Z, spaces or -`;
  },
};

export const isInteger = {
  validator: Number.isInteger, // Use the Number.isInteger function to validate integers
  message({ path }) {
    return `${capitalise(path)} must be a whole number`;
  },
};

export const arrayStringsHaveValidLength = {
  validator(data) {
    const minLength = 2;
    const maxLength = 30;
    // >2 <30
    const isValid = (str) => {
      if (str.length < minLength) throw new Error('Min length of 2 characters');
      if (str.length > maxLength) {
        throw new Error('Max length of 30 characters');
      }

      return true;
    };

    return data.every(isValid);
  },
  message({ reason }) {
    return reason.message;
  },
};
