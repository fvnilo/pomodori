export default {
  twoDigits(value) {
    if (value.toString().length <= 1) {
      return `0${value}`;
    }

    return value.toString();
  },
};
