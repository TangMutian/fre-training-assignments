function testEqual(a, b) {
  if (typeof a === "object" && typeof b === "object") {
    a = JSON.stringify(a);
    b = JSON.stringify(b);
  }
  if (a !== b) {
    console.error(`Test failed: ${a} is not equal to ${b}`);
    throw new Error(`Test failed: ${a} is not equal to ${b}`);
  }
}

// 1
// reverse a number in digit
function reverseNumber(num) {
  let rev = 0;
  while (num > 0) {
    rev = rev * 10 + (num % 10);
    num = Math.floor(num / 10);
  }
  return rev;
}

testEqual(reverseNumber(32243), 34223);

// 2
// check if a string is palindrome
function isPalindrome(str) {
  let i = 0;
  let j = str.length - 1;
  while (i < j) {
    if (str[i] !== str[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
}

testEqual(isPalindrome("abc"), false);
testEqual(isPalindrome("aba"), true);

// 3
// generate all substrings of a string
function substrings(str) {
  const result = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      result.push(str.substring(i, j));
    }
  }
  return result;
}

testEqual(substrings("dog"), ["d", "do", "dog", "o", "og", "g"]);

// 4
// sort string by alphabet
function sortString(str) {
  return str.split("").sort().join("");
}

testEqual(sortString("webmaster"), "abeemrstw");

// 5
// make first letter of each word uppercase
function capitalize(str) {
  return str
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

testEqual(capitalize("the quick brown fox"), "The Quick Brown Fox");

// 6
// find the longest word in a string
function longestWord(str) {
  let longest = "";
  str.split(" ").forEach(word => {
    if (word.length > longest.length) {
      longest = word;
    }
  });
  return longest;
}

testEqual(longestWord("Web Development Tutorial"), "Development");

// 7
// count vowels in a string
function countVowels(str) {
  const vowels = "aeiou";
  let count = 0;
  for (let char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

testEqual(countVowels("The quick brown fox"), 5);

// 8
// check if number is prime
function isPrime(num) {
  if (num === 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0 && i !== num) {
      return false;
    }
  }
  return true;
}

testEqual(isPrime(37), true);
testEqual(isPrime(4), false);

// 9
// get the type of an argument
function getType(arg) {
  return typeof arg;
}

testEqual(getType(12), "number");

// 10
// generate identity matrix of size n
function identityMatrix(n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push([]);
    for (let j = 0; j < n; j++) {
      result[i].push(i === j ? 1 : 0);
    }
  }
  return result;
}

testEqual(identityMatrix(3), [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
]);

// 11
// find second lowest and greatest number in an array
function secondLowestGreatest(arr) {
  let lowest = Infinity;
  let secondLowest = Infinity;
  let greatest = -Infinity;
  let secondGreatest = -Infinity;
  for (let num of arr) {
    if (num < lowest) {
      secondLowest = lowest;
      lowest = num;
    } else if (num < secondLowest) {
      secondLowest = num;
    }
    if (num > greatest) {
      secondGreatest = greatest;
      greatest = num;
    } else if (num > secondGreatest) {
      secondGreatest = num;
    }
  }
  return [secondLowest, secondGreatest];
}

testEqual(secondLowestGreatest([1, 2, 3, 4, 5]), [2, 4]);

// 12
// check if a number is "perfect"
function isPerfect(num) {
  let sum = 0;
  for (let i = 1; i <= Math.floor(num / 2); i++) {
    if (num % i === 0) {
      sum += i;
    }
  }
  return sum === num;
}

testEqual(isPerfect(6), true);
testEqual(isPerfect(28), true);

// 13
// find factors of a number
function factors(num) {
  const result = [];
  for (let i = 1; i <= Math.floor(num / 2); i++) {
    if (num % i === 0) {
      result.push(i);
    }
  }
  result.push(num);
  return result;
}

testEqual(factors(15), [1, 3, 5, 15]);

// 14
// find one coin conbinations to make a given amount
function coinCombinations(amount, coins) {
  const result = [];
  let i = 0;
  while (amount > 0) {
    if (amount >= coins[i]) {
      amount -= coins[i];
      result.push(coins[i]);
    } else {
      i++;
    }
  }
  return result;
}

testEqual(coinCombinations(46, [25, 10, 5, 2, 1]), [25, 10, 10, 1]);

// 15
// check if a number is exponent of another number
function isExponent(num, base) {
  let result = 1;
  while (result < num) {
    result *= base;
  }
  return result === num;
}

testEqual(isExponent(16, 2), true);

// 16
// find every unique character in a string
function uniqueChars(str) {
  const occurrences = {};
  let result = "";
  for (let char of str) {
    if (occurrences[char]) {
      continue;
    }
    occurrences[char] = true;
    result += char;
  }

  return result;
}

testEqual(
  uniqueChars("thequickbrownfoxjumpsoverthelazydog"),
  "thequickbrownfxjmpsvlazydg"
);

// 17
// count the number of occurrences of each letter in a string
function countOccurrences(str) {
  const occurrences = {};
  for (let char of str) {
    occurrences[char] = occurrences[char] + 1 || 1;
  }
  return occurrences;
}

testEqual(countOccurrences("011222233333"), { 0: 1, 1: 2, 2: 4, 3: 5 });

// 18
// binary search
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let mid;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      left = mid + 1;
    }
    if (arr[mid] > target) {
      right = mid - 1;
    }
  }
  return -1;
}

testEqual(binarySearch([1, 2, 3, 4, 5], 4), 3);

// 19
// all elements greater than a given number
function greaterThan(arr, num) {
  const result = [];
  for (let el of arr) {
    if (el > num) {
      result.push(el);
    }
  }
  return result;
}

testEqual(greaterThan([1, 2, 3, 4, 5], 3), [4, 5]);

// 20
// generate random string of a given length
function randomString(length) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

// 21
// find all subset of a given length
function subsets(arr, length) {
  const result = [];
  function helper(current, remaining) {
    if (current.length === length) {
      result.push(current);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      helper([...current, remaining[i]], remaining.slice(i + 1));
    }
  }
  helper([], arr);
  return result;
}

testEqual(subsets([1, 2, 3], 2), [
  [1, 2],
  [1, 3],
  [2, 3],
]);

// 22
// count the occurrences of a character in a string
function countOccurrencesOfChar(str, char) {
  let count = 0;
  for (let c of str) {
    if (c === char) {
      count++;
    }
  }
  return count;
}

testEqual(countOccurrencesOfChar("microsoft.com", "o"), 3);

// 23
// find first non-repeating character in a string
function firstNonRepeatingChar(str) {
  const occurrences = {};
  for (let char of str) {
    occurrences[char] = occurrences[char] + 1 || 1;
  }
  for (let char of str) {
    if (occurrences[char] === 1) {
      return char;
    }
  }
  return null;
}

testEqual(firstNonRepeatingChar("abacddbec"), "e");

// 24
// bubble sort
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] < arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

testEqual(
  bubbleSort([12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]),
  [3223, 546, 455, 345, 234, 213, 122, 98, 84, 64, 23, 12, 9, 4, 1]
);

// 25
// longest string in list
function longestString(arr) {
  let longest = "";
  for (let str of arr) {
    if (str.length > longest.length) {
      longest = str;
    }
  }
  return longest;
}

testEqual(
  longestString(["Australia", "Germany", "United States of America"]),
  "United States of America"
);

// 26
// longest substring without repeating characters
function longestSubstringWithoutRepeatingChars(str) {
  let longest = "";
  let starting = 0;
  let current = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (current.includes(char)) {
      if (current.length > longest.length) {
        longest = current;
      }
      starting = i - current.length + 1;
      current = str.slice(starting, i + 1);
    } else {
      current += char;
    }
  }
  return longest;
}

testEqual(longestSubstringWithoutRepeatingChars("abcabcbb"), "abc");

// 27
// find longest palindrome in a string
function longestPalindrome(str) {
  let longest = "";
  for (let i = 0; i < str.length; i++) {
    // odd length
    let left = i;
    let right = i;
    while (left >= 0 && right < str.length && str[left] === str[right]) {
      left--;
      right++;
    }
    if (right - left - 1 > longest.length) {
      longest = str.slice(left + 1, right);
    }
    // even length
    left = i;
    right = i + 1;
    while (left >= 0 && right < str.length && str[left] === str[right]) {
      left--;
      right++;
    }
    if (right - left - 1 > longest.length) {
      longest = str.slice(left + 1, right);
    }
  }
  return longest;
}

testEqual(longestPalindrome("abracadabra"), "aca");

// 28
// call
function call(fn, ...args) {
  return fn(...args);
}

// 29
// get name of a function
function getFunctionName(fn) {
  return fn.name;
}

testEqual(
  getFunctionName(function myFunc() {}),
  "myFunc"
);
