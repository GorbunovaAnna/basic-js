const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  let transformedArr = [];
  let isDiscardNext = false;

  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  if (!arr.length) {
    return transformedArr;
  }

  arr.forEach((el, i) => {
    if (typeof el === "number") {
      if (isDiscardNext) {
        isDiscardNext = false;
      } else {
        transformedArr.push(el);
      }
    } else if (el === "--discard-prev") {
      transformedArr.pop();
    } else if (el === "--double-next") {
      transformedArr.push(arr[i + 1]);
    } else if (el === "--double-prev") {
      transformedArr.push(arr[i - 1]);
    } else if (el === "--discard-next") {
      isDiscardNext = true;
    }
  });

  return transformedArr;
}

module.exports = {
  transform,
};
