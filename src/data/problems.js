// CYBERPUNK JS DOJO - 100 Practice Problems

export const problems = [];

// Helper to create problem objects
function createProblem(id, title, difficulty, description, starterCode, tests, expectedMinutes = 5) {
    return {
        id,
        title,
        difficulty,
        description,
        starterCode,
        tests,
        expectedMinutes // Expected time in minutes (will add buffer for errors)
    };
}

// Problems 1-20: Basic Functions & Variables
problems.push(createProblem(1, "Sum Two Numbers", "easy", 
    "Write a function called 'sum' that takes two numbers as parameters and returns their sum.\n\nExample:\n  Input: sum(2, 3)\n  Output: 5\n\n  Input: sum(-1, 1)\n  Output: 0",
    "function sum(a, b) {\n    // Your code here\n}",
    [
        { input: [2, 3], expected: 5 },
        { input: [-1, 1], expected: 0 },
        { input: [0, 0], expected: 0 },
        { input: [100, 200], expected: 300 }
    ],
    2 // 2 minutes expected
));

problems.push(createProblem(2, "Find Maximum", "easy",
    "Write a function called 'max' that takes two numbers and returns the larger one.\n\nExample:\n  Input: max(5, 10)\n  Output: 10\n\n  Input: max(-5, -10)\n  Output: -5",
    "function max(a, b) {\n    // Your code here\n}",
    [
        { input: [5, 10], expected: 10 },
        { input: [20, 5], expected: 20 },
        { input: [-5, -10], expected: -5 },
        { input: [0, 0], expected: 0 }
    ]
));

problems.push(createProblem(3, "Is Even", "easy",
    "Write a function called 'isEven' that takes a number and returns true if it's even, false otherwise.\n\nExample:\n  Input: isEven(2)\n  Output: true\n\n  Input: isEven(3)\n  Output: false",
    "function isEven(num) {\n    // Your code here\n}",
    [
        { input: [2], expected: true },
        { input: [3], expected: false },
        { input: [0], expected: true },
        { input: [100], expected: true }
    ]
));

problems.push(createProblem(4, "Reverse String", "easy",
    "Write a function called 'reverseString' that takes a string and returns it reversed.\n\nExample:\n  Input: reverseString('hello')\n  Output: 'olleh'\n\n  Input: reverseString('world')\n  Output: 'dlrow'",
    "function reverseString(str) {\n    // Your code here\n}",
    [
        { input: ["hello"], expected: "olleh" },
        { input: ["world"], expected: "dlrow" },
        { input: [""], expected: "" },
        { input: ["a"], expected: "a" }
    ]
));

problems.push(createProblem(5, "Factorial", "easy",
    "Write a function called 'factorial' that calculates the factorial of a number. Factorial of n is n * (n-1) * ... * 1.\n\nExample:\n  Input: factorial(5)\n  Output: 120\n\n  Input: factorial(3)\n  Output: 6",
    "function factorial(n) {\n    // Your code here\n}",
    [
        { input: [5], expected: 120 },
        { input: [0], expected: 1 },
        { input: [1], expected: 1 },
        { input: [3], expected: 6 }
    ]
));

problems.push(createProblem(6, "Is Palindrome", "easy",
    "Write a function called 'isPalindrome' that checks if a string reads the same forwards and backwards.\n\nExample:\n  Input: isPalindrome('racecar')\n  Output: true\n\n  Input: isPalindrome('hello')\n  Output: false",
    "function isPalindrome(str) {\n    // Your code here\n}",
    [
        { input: ["racecar"], expected: true },
        { input: ["hello"], expected: false },
        { input: ["a"], expected: true },
        { input: ["madam"], expected: true }
    ]
));

problems.push(createProblem(7, "Count Vowels", "easy",
    "Write a function called 'countVowels' that counts the number of vowels (a, e, i, o, u) in a string.\n\nExample:\n  Input: countVowels('hello')\n  Output: 2\n\n  Input: countVowels('aeiou')\n  Output: 5",
    "function countVowels(str) {\n    // Your code here\n}",
    [
        { input: ["hello"], expected: 2 },
        { input: ["aeiou"], expected: 5 },
        { input: ["xyz"], expected: 0 },
        { input: ["Hello World"], expected: 3 }
    ]
));

problems.push(createProblem(8, "FizzBuzz", "easy",
    "Write a function called 'fizzBuzz' that takes a number. Return 'Fizz' if divisible by 3, 'Buzz' if divisible by 5, 'FizzBuzz' if divisible by both, otherwise return the number.\n\nExample:\n  Input: fizzBuzz(3)\n  Output: 'Fizz'\n\n  Input: fizzBuzz(15)\n  Output: 'FizzBuzz'\n\n  Input: fizzBuzz(7)\n  Output: 7",
    "function fizzBuzz(n) {\n    // Your code here\n}",
    [
        { input: [3], expected: "Fizz" },
        { input: [5], expected: "Buzz" },
        { input: [15], expected: "FizzBuzz" },
        { input: [7], expected: 7 }
    ]
));

problems.push(createProblem(9, "Find Largest", "easy",
    "Write a function called 'findLargest' that takes an array of numbers and returns the largest number.\n\nExample:\n  Input: findLargest([1, 5, 3, 9, 2])\n  Output: 9\n\n  Input: findLargest([-1, -5, -3])\n  Output: -1",
    "function findLargest(arr) {\n    // Your code here\n}",
    [
        { input: [[1, 5, 3, 9, 2]], expected: 9 },
        { input: [[-1, -5, -3]], expected: -1 },
        { input: [[10]], expected: 10 },
        { input: [[1, 2, 3, 4, 5]], expected: 5 }
    ]
));

problems.push(createProblem(10, "Sum Array", "easy",
    "Write a function called 'sumArray' that takes an array of numbers and returns their sum.\n\nExample:\n  Input: sumArray([1, 2, 3])\n  Output: 6\n\n  Input: sumArray([10, 20, 30])\n  Output: 60",
    "function sumArray(arr) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3]], expected: 6 },
        { input: [[10, 20, 30]], expected: 60 },
        { input: [[-1, 1]], expected: 0 },
        { input: [[]], expected: 0 }
    ]
));

// Problems 11-30: Arrays & Loops
problems.push(createProblem(11, "Remove Duplicates", "medium",
    "Write a function called 'removeDuplicates' that takes an array and returns a new array with duplicates removed.\n\nExample:\n  Input: removeDuplicates([1, 2, 2, 3, 4, 4, 5])\n  Output: [1, 2, 3, 4, 5]\n\n  Input: removeDuplicates(['a', 'b', 'a', 'c'])\n  Output: ['a', 'b', 'c']",
    "function removeDuplicates(arr) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 2, 3, 4, 4, 5]], expected: [1, 2, 3, 4, 5] },
        { input: [["a", "b", "a", "c"]], expected: ["a", "b", "c"] },
        { input: [[1, 1, 1, 1]], expected: [1] },
        { input: [[]], expected: [] }
    ]
));

problems.push(createProblem(12, "Find Index", "easy",
    "Write a function called 'findIndex' that takes an array and a value, returns the index of that value, or -1 if not found.\n\nExample:\n  Input: findIndex([1, 2, 3, 4], 3)\n  Output: 2\n\n  Input: findIndex([1, 2, 3], 5)\n  Output: -1",
    "function findIndex(arr, val) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3, 4], 3], expected: 2 },
        { input: [["a", "b", "c"], "b"], expected: 1 },
        { input: [[1, 2, 3], 5], expected: -1 },
        { input: [[], 1], expected: -1 }
    ]
));

problems.push(createProblem(13, "Capitalize Words", "medium",
    "Write a function called 'capitalizeWords' that takes a string and capitalizes the first letter of each word.\n\nExample:\n  Input: capitalizeWords('hello world')\n  Output: 'Hello World'\n\n  Input: capitalizeWords('javascript is fun')\n  Output: 'Javascript Is Fun'",
    "function capitalizeWords(str) {\n    // Your code here\n}",
    [
        { input: ["hello world"], expected: "Hello World" },
        { input: ["javascript is fun"], expected: "Javascript Is Fun" },
        { input: ["a"], expected: "A" },
        { input: [""], expected: "" }
    ]
));

problems.push(createProblem(14, "Is Prime", "medium",
    "Write a function called 'isPrime' that checks if a number is prime (only divisible by 1 and itself).\n\nExample:\n  Input: isPrime(7)\n  Output: true\n\n  Input: isPrime(4)\n  Output: false\n\n  Input: isPrime(2)\n  Output: true",
    "function isPrime(n) {\n    // Your code here\n}",
    [
        { input: [7], expected: true },
        { input: [4], expected: false },
        { input: [2], expected: true },
        { input: [1], expected: false }
    ]
));

problems.push(createProblem(15, "Fibonacci", "medium",
    "Write a function called 'fibonacci' that takes a number n and returns the nth Fibonacci number.\n\nExample:\n  Input: fibonacci(5)\n  Output: 5  // (0, 1, 1, 2, 3, 5)\n\n  Input: fibonacci(7)\n  Output: 13",
    "function fibonacci(n) {\n    // Your code here\n}",
    [
        { input: [0], expected: 0 },
        { input: [1], expected: 1 },
        { input: [5], expected: 5 },
        { input: [7], expected: 13 }
    ]
));

problems.push(createProblem(16, "Flatten Array", "medium",
    "Write a function called 'flattenArray' that takes a nested array and returns a flattened array.\n\nExample:\n  Input: flattenArray([1, [2, 3], [4, 5]])\n  Output: [1, 2, 3, 4, 5]\n\n  Input: flattenArray([[1, 2], [3, 4]])\n  Output: [1, 2, 3, 4]",
    "function flattenArray(arr) {\n    // Your code here\n}",
    [
        { input: [[1, [2, 3], [4, 5]]], expected: [1, 2, 3, 4, 5] },
        { input: [[1, 2, 3]], expected: [1, 2, 3] },
        { input: [[[1, 2], [3, 4]]], expected: [1, 2, 3, 4] },
        { input: [[]], expected: [] }
    ]
));

problems.push(createProblem(17, "Count Characters", "easy",
    "Write a function called 'countCharacters' that takes a string and returns an object with character counts.\n\nExample:\n  Input: countCharacters('hello')\n  Output: {h: 1, e: 1, l: 2, o: 1}\n\n  Input: countCharacters('aabb')\n  Output: {a: 2, b: 2}",
    "function countCharacters(str) {\n    // Your code here\n}",
    [
        { input: ["hello"], expected: {h: 1, e: 1, l: 2, o: 1} },
        { input: ["aabb"], expected: {a: 2, b: 2} },
        { input: [""], expected: {} },
        { input: ["abc"], expected: {a: 1, b: 1, c: 1} }
    ]
));

problems.push(createProblem(18, "Merge Arrays", "easy",
    "Write a function called 'mergeArrays' that takes two arrays and returns a merged array.\n\nExample:\n  Input: mergeArrays([1, 2], [3, 4])\n  Output: [1, 2, 3, 4]\n\n  Input: mergeArrays(['a'], ['b'])\n  Output: ['a', 'b']",
    "function mergeArrays(arr1, arr2) {\n    // Your code here\n}",
    [
        { input: [[1, 2], [3, 4]], expected: [1, 2, 3, 4] },
        { input: [["a"], ["b"]], expected: ["a", "b"] },
        { input: [[], [1, 2]], expected: [1, 2] },
        { input: [[1, 2], []], expected: [1, 2] }
    ]
));

problems.push(createProblem(19, "Rotate Array", "medium",
    "Write a function called 'rotateArray' that takes an array and a number k, rotates the array k positions to the right.\n\nExample:\n  Input: rotateArray([1, 2, 3, 4, 5], 2)\n  Output: [4, 5, 1, 2, 3]\n\n  Input: rotateArray([1, 2, 3], 1)\n  Output: [3, 1, 2]",
    "function rotateArray(arr, k) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3, 4, 5], 2], expected: [4, 5, 1, 2, 3] },
        { input: [[1, 2, 3], 1], expected: [3, 1, 2] },
        { input: [[1], 5], expected: [1] },
        { input: [[1, 2], 0], expected: [1, 2] }
    ]
));

problems.push(createProblem(20, "Two Sum", "medium",
    "Write a function called 'twoSum' that takes an array of numbers and a target sum. Return indices of two numbers that add up to target.\n\nExample:\n  Input: twoSum([2, 7, 11, 15], 9)\n  Output: [0, 1]\n\n  Input: twoSum([3, 2, 4], 6)\n  Output: [1, 2]",
    "function twoSum(arr, target) {\n    // Your code here\n}",
    [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
        { input: [[3, 2, 4], 6], expected: [1, 2] },
        { input: [[3, 3], 6], expected: [0, 1] },
        { input: [[1, 2, 3], 5], expected: [1, 2] }
    ]
));

// Problems 21-40: More String & Array Operations
problems.push(createProblem(21, "Truncate String", "easy",
    "Write a function called 'truncate' that takes a string and max length, truncates if longer and adds '...'.\n\nExample:\n  Input: truncate('hello world', 5)\n  Output: 'hello...'\n\n  Input: truncate('short', 10)\n  Output: 'short'",
    "function truncate(str, maxLen) {\n    // Your code here\n}",
    [
        { input: ["hello world", 5], expected: "hello..." },
        { input: ["short", 10], expected: "short" },
        { input: ["test", 4], expected: "test" }
    ]
));

problems.push(createProblem(22, "Anagram Check", "medium",
    "Write a function called 'isAnagram' that checks if two strings are anagrams (same letters, different order).\n\nExample:\n  Input: isAnagram('listen', 'silent')\n  Output: true\n\n  Input: isAnagram('hello', 'world')\n  Output: false",
    "function isAnagram(str1, str2) {\n    // Your code here\n}",
    [
        { input: ["listen", "silent"], expected: true },
        { input: ["hello", "world"], expected: false },
        { input: ["rail safety", "fairy tales"], expected: true }
    ]
));

problems.push(createProblem(23, "Longest Word", "easy",
    "Write a function called 'longestWord' that finds the longest word in a string.",
    "function longestWord(str) {\n    // Your code here\n}",
    [
        { input: ["The quick brown fox"], expected: "quick" },
        { input: ["Hello world"], expected: "Hello" },
        { input: ["a bb ccc"], expected: "ccc" }
    ]
));

problems.push(createProblem(24, "Title Case", "easy",
    "Write a function called 'titleCase' that converts a string to title case (first letter of each word capitalized).",
    "function titleCase(str) {\n    // Your code here\n}",
    [
        { input: ["hello world"], expected: "Hello World" },
        { input: ["THE QUICK BROWN"], expected: "The Quick Brown" },
        { input: ["a"], expected: "A" }
    ]
));

problems.push(createProblem(25, "Remove Whitespace", "easy",
    "Write a function called 'removeWhitespace' that removes all whitespace from a string.",
    "function removeWhitespace(str) {\n    // Your code here\n}",
    [
        { input: ["hello world"], expected: "helloworld" },
        { input: ["  test  "], expected: "test" },
        { input: ["a b c"], expected: "abc" }
    ]
));

problems.push(createProblem(26, "Map Double", "easy",
    "Write a function called 'doubleArray' that doubles each number in an array.",
    "function doubleArray(arr) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3]], expected: [2, 4, 6] },
        { input: [[0, -1, 5]], expected: [0, -2, 10] },
        { input: [[]], expected: [] }
    ]
));

problems.push(createProblem(27, "Filter Evens", "easy",
    "Write a function called 'filterEvens' that returns only even numbers from an array.",
    "function filterEvens(arr) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3, 4, 5]], expected: [2, 4] },
        { input: [[1, 3, 5]], expected: [] },
        { input: [[2, 4, 6]], expected: [2, 4, 6] }
    ]
));

problems.push(createProblem(28, "Reduce Sum", "medium",
    "Write a function called 'reduceSum' that sums all numbers in an array using reduce.",
    "function reduceSum(arr) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3, 4]], expected: 10 },
        { input: [[10, 20, 30]], expected: 60 },
        { input: [[]], expected: 0 }
    ]
));

problems.push(createProblem(29, "Chunk Array", "medium",
    "Write a function called 'chunkArray' that splits an array into chunks of specified size.",
    "function chunkArray(arr, size) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3, 4, 5], 2], expected: [[1, 2], [3, 4], [5]] },
        { input: [[1, 2, 3], 1], expected: [[1], [2], [3]] },
        { input: [[1, 2, 3, 4], 4], expected: [[1, 2, 3, 4]] }
    ]
));

problems.push(createProblem(30, "Intersection", "medium",
    "Write a function called 'intersection' that returns common elements of two arrays.",
    "function intersection(arr1, arr2) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3], [2, 3, 4]], expected: [2, 3] },
        { input: [[1, 2], [3, 4]], expected: [] },
        { input: [[1, 2, 3], [1, 2, 3]], expected: [1, 2, 3] }
    ]
));

// Problems 31-50: Objects & Advanced Arrays
problems.push(createProblem(31, "Get Keys", "easy",
    "Write a function called 'getKeys' that returns all keys of an object as an array.",
    "function getKeys(obj) {\n    // Your code here\n}",
    [
        { input: [{a: 1, b: 2}], expected: ["a", "b"] },
        { input: [{}], expected: [] },
        { input: [{x: 1, y: 2, z: 3}], expected: ["x", "y", "z"] }
    ]
));

problems.push(createProblem(32, "Get Values", "easy",
    "Write a function called 'getValues' that returns all values of an object as an array.",
    "function getValues(obj) {\n    // Your code here\n}",
    [
        { input: [{a: 1, b: 2}], expected: [1, 2] },
        { input: [{x: 'hello', y: 'world'}], expected: ['hello', 'world'] },
        { input: [{}], expected: [] }
    ]
));

problems.push(createProblem(33, "Merge Objects", "medium",
    "Write a function called 'mergeObjects' that merges two objects. If keys conflict, use second object's value.",
    "function mergeObjects(obj1, obj2) {\n    // Your code here\n}",
    [
        { input: [{a: 1}, {b: 2}], expected: {a: 1, b: 2} },
        { input: [{a: 1}, {a: 2}], expected: {a: 2} },
        { input: [{x: 1, y: 2}, {z: 3}], expected: {x: 1, y: 2, z: 3} }
    ]
));

problems.push(createProblem(34, "Group By Property", "medium",
    "Write a function called 'groupByProperty' that groups array of objects by a property name.",
    "function groupByProperty(arr, prop) {\n    // Your code here\n}",
    [
        { input: [[{age: 20, name: 'A'}, {age: 30, name: 'B'}, {age: 20, name: 'C'}], 'age'], 
          expected: {20: [{age: 20, name: 'A'}, {age: 20, name: 'C'}], 30: [{age: 30, name: 'B'}]} }
    ]
));

problems.push(createProblem(35, "Valid Parentheses", "medium",
    "Write a function called 'isValidParentheses' that checks if parentheses are balanced.",
    "function isValidParentheses(str) {\n    // Your code here\n}",
    [
        { input: ["()"], expected: true },
        { input: ["()[]{}"], expected: true },
        { input: ["(]"], expected: false },
        { input: ["([)]"], expected: false }
    ]
));

problems.push(createProblem(36, "Binary Search", "hard",
    "Write a function called 'binarySearch' that finds an element in a sorted array using binary search.",
    "function binarySearch(arr, target) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3, 4, 5], 3], expected: 2 },
        { input: [[1, 2, 3, 4, 5], 6], expected: -1 },
        { input: [[1, 3, 5, 7, 9], 5], expected: 2 }
    ]
));

problems.push(createProblem(37, "Quick Sort", "hard",
    "Write a function called 'quickSort' that sorts an array using quicksort algorithm.",
    "function quickSort(arr) {\n    // Your code here\n}",
    [
        { input: [[3, 1, 4, 1, 5]], expected: [1, 1, 3, 4, 5] },
        { input: [[5, 4, 3, 2, 1]], expected: [1, 2, 3, 4, 5] },
        { input: [[1]], expected: [1] }
    ]
));

problems.push(createProblem(38, "Longest Substring", "hard",
    "Write a function called 'longestSubstring' that finds length of longest substring without repeating characters.",
    "function longestSubstring(str) {\n    // Your code here\n}",
    [
        { input: ["abcabcbb"], expected: 3 },
        { input: ["bbbbb"], expected: 1 },
        { input: ["pwwkew"], expected: 3 }
    ]
));

problems.push(createProblem(39, "Reverse Linked List", "hard",
    "Write a function called 'reverseList' that reverses an array (simulating linked list reversal).",
    "function reverseList(arr) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3, 4]], expected: [4, 3, 2, 1] },
        { input: [[1]], expected: [1] },
        { input: [[1, 2]], expected: [2, 1] }
    ]
));

problems.push(createProblem(40, "Find Missing Number", "medium",
    "Write a function called 'findMissing' that finds the missing number in an array of consecutive numbers.",
    "function findMissing(arr) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 4, 5]], expected: 3 },
        { input: [[1, 3, 4, 5]], expected: 2 },
        { input: [[2, 3, 4, 5]], expected: 1 }
    ]
));

// Helper to get expected time based on difficulty (defined before use)
function getExpectedTime(difficulty) {
    switch(difficulty) {
        case 'easy': return 3; // 3 minutes
        case 'medium': return 6; // 6 minutes
        case 'hard': return 12; // 12 minutes
        default: return 5;
    }
}

// Problems 41-60: Advanced Algorithms
problems.push(createProblem(41, "Power of Two", "easy",
    "Write a function called 'isPowerOfTwo' that checks if a number is a power of 2.",
    "function isPowerOfTwo(n) {\n    // Your code here\n}",
    [
        { input: [8], expected: true },
        { input: [7], expected: false },
        { input: [1], expected: true },
        { input: [16], expected: true },
        { input: [0], expected: false }
    ]
));

problems.push(createProblem(42, "Sum Digits", "easy",
    "Write a function called 'sumDigits' that sums all digits of a number.\n\nExample:\n  Input: sumDigits(123)\n  Output: 6  // (1 + 2 + 3)\n\n  Input: sumDigits(456)\n  Output: 15  // (4 + 5 + 6)",
    "function sumDigits(n) {\n    // Your code here\n}",
    [
        { input: [123], expected: 6 },
        { input: [456], expected: 15 },
        { input: [0], expected: 0 },
        { input: [999], expected: 27 }
    ]
));

problems.push(createProblem(43, "Count Words", "easy",
    "Write a function called 'countWords' that counts the number of words in a string.\n\nExample:\n  Input: countWords('hello world')\n  Output: 2\n\n  Input: countWords('one')\n  Output: 1",
    "function countWords(str) {\n    // Your code here\n}",
    [
        { input: ["hello world"], expected: 2 },
        { input: ["one"], expected: 1 },
        { input: [""], expected: 0 },
        { input: ["   multiple   spaces   "], expected: 2 }
    ]
));

problems.push(createProblem(44, "Array Difference", "medium",
    "Write a function called 'arrayDiff' that returns elements in first array not in second.\n\nExample:\n  Input: arrayDiff([1, 2, 3], [2, 3])\n  Output: [1]\n\n  Input: arrayDiff([1, 2, 2, 3], [2])\n  Output: [1, 3]",
    "function arrayDiff(arr1, arr2) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3], [2, 3]], expected: [1] },
        { input: [[1, 2], [3, 4]], expected: [1, 2] },
        { input: [[1, 2, 2, 3], [2]], expected: [1, 3] }
    ]
));

problems.push(createProblem(45, "Is Perfect Square", "medium",
    "Write a function called 'isPerfectSquare' that checks if a number is a perfect square.\n\nExample:\n  Input: isPerfectSquare(16)\n  Output: true  // 4^2 = 16\n\n  Input: isPerfectSquare(15)\n  Output: false",
    "function isPerfectSquare(n) {\n    // Your code here\n}",
    [
        { input: [16], expected: true },
        { input: [15], expected: false },
        { input: [1], expected: true },
        { input: [25], expected: true }
    ]
));

problems.push(createProblem(46, "Climbing Stairs", "hard",
    "Write a function called 'climbStairs' that calculates ways to climb n stairs (can take 1 or 2 steps at a time).\n\nExample:\n  Input: climbStairs(2)\n  Output: 2  // (1+1, 2)\n\n  Input: climbStairs(3)\n  Output: 3  // (1+1+1, 1+2, 2+1)\n\n  Input: climbStairs(4)\n  Output: 5",
    "function climbStairs(n) {\n    // Your code here\n}",
    [
        { input: [2], expected: 2 },
        { input: [3], expected: 3 },
        { input: [4], expected: 5 },
        { input: [5], expected: 8 }
    ]
));

problems.push(createProblem(47, "Coin Change", "hard",
    "Write a function called 'coinChange' that finds minimum coins needed to make amount. Return -1 if impossible.\n\nExample:\n  Input: coinChange([1, 2, 5], 11)\n  Output: 3  // (5 + 5 + 1)\n\n  Input: coinChange([2], 3)\n  Output: -1  // impossible\n\n  Input: coinChange([1], 0)\n  Output: 0",
    "function coinChange(coins, amount) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 5], 11], expected: 3 },
        { input: [[2], 3], expected: -1 },
        { input: [[1], 0], expected: 0 }
    ]
));

problems.push(createProblem(48, "House Robber", "hard",
    "Write a function called 'rob' that finds maximum money you can rob without robbing two adjacent houses.\n\nExample:\n  Input: rob([1, 2, 3, 1])\n  Output: 4  // (rob house 0 and 2: 1 + 3)\n\n  Input: rob([2, 7, 9, 3, 1])\n  Output: 12  // (rob house 1 and 4: 7 + 1)",
    "function rob(nums) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3, 1]], expected: 4 },
        { input: [[2, 7, 9, 3, 1]], expected: 12 },
        { input: [[2, 1, 1, 2]], expected: 4 }
    ]
));

problems.push(createProblem(49, "Word Break", "hard",
    "Write a function called 'wordBreak' that determines if a string can be segmented into dictionary words.",
    "function wordBreak(s, wordDict) {\n    // Your code here\n}",
    [
        { input: ["leetcode", ["leet", "code"]], expected: true },
        { input: ["applepenapple", ["apple", "pen"]], expected: true },
        { input: ["catsandog", ["cats", "dog", "sand", "and", "cat"]], expected: false }
    ]
));

problems.push(createProblem(50, "Longest Increasing Subsequence", "hard",
    "Write a function called 'lengthOfLIS' that finds length of longest strictly increasing subsequence.",
    "function lengthOfLIS(nums) {\n    // Your code here\n}",
    [
        { input: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4 },
        { input: [[0, 1, 0, 3, 2, 3]], expected: 4 },
        { input: [[7, 7, 7, 7, 7]], expected: 1 }
    ]
));

// Problems 51-70: Graph & Tree Algorithms
problems.push(createProblem(51, "Max Depth of Binary Tree", "medium",
    "Write a function called 'maxDepth' that finds maximum depth of a binary tree (represented as nested arrays).",
    "function maxDepth(root) {\n    // root is null or [val, left, right]\n    // Your code here\n}",
    [
        { input: [[3, [9], [20, [15], [7]]]], expected: 3 },
        { input: [[1, null, [2]]], expected: 2 },
        { input: [null], expected: 0 }
    ]
));

problems.push(createProblem(52, "Same Tree", "medium",
    "Write a function called 'isSameTree' that checks if two binary trees are identical.",
    "function isSameTree(p, q) {\n    // Your code here\n}",
    [
        { input: [[1, [2], [3]], [1, [2], [3]]], expected: true },
        { input: [[1, [2], null], [1, null, [2]]], expected: false },
        { input: [[1, [2], [1]], [1, [1], [2]]], expected: false }
    ]
));

problems.push(createProblem(53, "Invert Binary Tree", "medium",
    "Write a function called 'invertTree' that inverts a binary tree (swaps left and right children).",
    "function invertTree(root) {\n    // Your code here\n}",
    [
        { input: [[4, [2, [1], [3]], [7, [6], [9]]]], expected: [4, [7, [9], [6]], [2, [3], [1]]] },
        { input: [[2, [1], [3]]], expected: [2, [3], [1]] }
    ]
));

problems.push(createProblem(54, "Number of Islands", "hard",
    "Write a function called 'numIslands' that counts islands in a 2D grid (1 = land, 0 = water). Islands are connected horizontally or vertically.\n\nExample:\n  Input: numIslands([['1','1','1','1','0'], ['1','1','0','1','0'], ['1','1','0','0','0'], ['0','0','0','0','0']])\n  Output: 1\n\n  Input: numIslands([['1','1','0','0','0'], ['1','1','0','0','0'], ['0','0','1','0','0'], ['0','0','0','1','1']])\n  Output: 3",
    "function numIslands(grid) {\n    // Your code here\n}",
    [
        { input: [[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]], expected: 1 },
        { input: [[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]], expected: 3 }
    ]
));

problems.push(createProblem(55, "Course Schedule", "hard",
    "Write a function called 'canFinish' that determines if you can finish all courses (prerequisites as [course, prereq] pairs).",
    "function canFinish(numCourses, prerequisites) {\n    // Your code here\n}",
    [
        { input: [2, [[1, 0]]], expected: true },
        { input: [2, [[1, 0], [0, 1]]], expected: false },
        { input: [3, [[1, 0], [2, 1]]], expected: true }
    ]
));

problems.push(createProblem(56, "Clone Graph", "hard",
    "Write a function called 'cloneGraph' that deep clones a graph node (represented as {val, neighbors: []}).",
    "function cloneGraph(node) {\n    // Your code here\n}",
    [
        { input: [{val: 1, neighbors: [{val: 2, neighbors: []}]}], 
          expected: (result) => result.val === 1 && result.neighbors[0].val === 2 }
    ]
));

// Problems 57-70: Advanced String & Array Problems
problems.push(createProblem(57, "Longest Palindromic Substring", "hard",
    "Write a function called 'longestPalindrome' that finds the longest palindromic substring in a string.\n\nExample:\n  Input: longestPalindrome('babad')\n  Output: 'bab'  // or 'aba'\n\n  Input: longestPalindrome('cbbd')\n  Output: 'bb'\n\n  Input: longestPalindrome('a')\n  Output: 'a'",
    "function longestPalindrome(s) {\n    // Your code here\n}",
    [
        { input: ["babad"], expected: "bab" },
        { input: ["cbbd"], expected: "bb" },
        { input: ["a"], expected: "a" }
    ]
));

problems.push(createProblem(58, "Minimum Window Substring", "hard",
    "Write a function called 'minWindow' that finds minimum window in s containing all characters of t.\n\nExample:\n  Input: minWindow('ADOBECODEBANC', 'ABC')\n  Output: 'BANC'\n\n  Input: minWindow('a', 'a')\n  Output: 'a'\n\n  Input: minWindow('a', 'aa')\n  Output: ''  // no valid window",
    "function minWindow(s, t) {\n    // Your code here\n}",
    [
        { input: ["ADOBECODEBANC", "ABC"], expected: "BANC" },
        { input: ["a", "a"], expected: "a" },
        { input: ["a", "aa"], expected: "" }
    ]
));

problems.push(createProblem(59, "Group Anagrams", "medium",
    "Write a function called 'groupAnagrams' that groups anagrams together.",
    "function groupAnagrams(strs) {\n    // Your code here\n}",
    [
        { input: [["eat","tea","tan","ate","nat","bat"]], 
          expected: (result) => {
            const sorted = result.map(arr => arr.sort());
            return sorted.some(arr => JSON.stringify(arr.sort()) === JSON.stringify(["bat"])) &&
                   sorted.some(arr => JSON.stringify(arr.sort()) === JSON.stringify(["eat","tea","ate"]));
          } }
    ]
));

problems.push(createProblem(60, "Three Sum", "hard",
    "Write a function called 'threeSum' that finds all unique triplets that sum to zero.",
    "function threeSum(nums) {\n    // Your code here\n}",
    [
        { input: [[-1, 0, 1, 2, -1, -4]], 
          expected: (result) => {
            const sorted = result.map(arr => arr.sort());
            return sorted.length >= 2 && sorted.some(arr => JSON.stringify(arr) === JSON.stringify([-1, 0, 1]));
          } },
        { input: [[0, 1, 1]], expected: [] },
        { input: [[0, 0, 0]], expected: [[0, 0, 0]] }
    ]
));

// Problems 61-80: Dynamic Programming & Optimization
problems.push(createProblem(61, "Edit Distance", "hard",
    "Write a function called 'minDistance' that finds minimum operations to convert word1 to word2 (insert, delete, replace).",
    "function minDistance(word1, word2) {\n    // Your code here\n}",
    [
        { input: ["horse", "ros"], expected: 3 },
        { input: ["intention", "execution"], expected: 5 },
        { input: ["", "a"], expected: 1 }
    ]
));

problems.push(createProblem(62, "Maximum Subarray", "medium",
    "Write a function called 'maxSubArray' that finds the maximum sum of contiguous subarray (Kadane's algorithm).",
    "function maxSubArray(nums) {\n    // Your code here\n}",
    [
        { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
        { input: [[1]], expected: 1 },
        { input: [[5, 4, -1, 7, 8]], expected: 23 }
    ]
));

problems.push(createProblem(63, "Product of Array Except Self", "hard",
    "Write a function called 'productExceptSelf' that returns array where each element is product of all except itself (no division).",
    "function productExceptSelf(nums) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
        { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] }
    ]
));

problems.push(createProblem(64, "Container With Most Water", "hard",
    "Write a function called 'maxArea' that finds maximum area of water that can be contained between vertical lines.",
    "function maxArea(height) {\n    // Your code here\n}",
    [
        { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
        { input: [[1, 1]], expected: 1 }
    ]
));

problems.push(createProblem(65, "Trapping Rain Water", "hard",
    "Write a function called 'trap' that calculates trapped rainwater between bars of different heights.",
    "function trap(height) {\n    // Your code here\n}",
    [
        { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
        { input: [[4, 2, 0, 3, 2, 5]], expected: 9 }
    ]
));

problems.push(createProblem(66, "Merge Intervals", "medium",
    "Write a function called 'merge' that merges overlapping intervals [[start, end], ...].",
    "function merge(intervals) {\n    // Your code here\n}",
    [
        { input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
        { input: [[[1, 4], [4, 5]]], expected: [[1, 5]] }
    ]
));

problems.push(createProblem(67, "Insert Interval", "hard",
    "Write a function called 'insert' that inserts a new interval into sorted, non-overlapping intervals.",
    "function insert(intervals, newInterval) {\n    // Your code here\n}",
    [
        { input: [[[1, 3], [6, 9]], [2, 5]], expected: [[1, 5], [6, 9]] },
        { input: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]], expected: [[1, 2], [3, 10], [12, 16]] }
    ]
));

problems.push(createProblem(68, "Rotate Image", "hard",
    "Write a function called 'rotate' that rotates a 2D matrix 90 degrees clockwise (in-place).",
    "function rotate(matrix) {\n    // Your code here\n}",
    [
        { input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [[7, 4, 1], [8, 5, 2], [9, 6, 3]] },
        { input: [[[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]], 
          expected: [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]] }
    ]
));

problems.push(createProblem(69, "Spiral Matrix", "hard",
    "Write a function called 'spiralOrder' that returns elements of matrix in spiral order.",
    "function spiralOrder(matrix) {\n    // Your code here\n}",
    [
        { input: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [1, 2, 3, 6, 9, 8, 7, 4, 5] },
        { input: [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]], expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7] }
    ]
));

problems.push(createProblem(70, "Word Search", "hard",
    "Write a function called 'exist' that checks if a word exists in a 2D board (can move up, down, left, right).",
    "function exist(board, word) {\n    // Your code here\n}",
    [
        { input: [[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"], expected: true },
        { input: [[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE"], expected: true },
        { input: [[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB"], expected: false }
    ]
));

// Problems 71-90: Advanced Algorithms & Math
problems.push(createProblem(71, "Pow(x, n)", "medium",
    "Write a function called 'myPow' that calculates x raised to power n efficiently.",
    "function myPow(x, n) {\n    // Your code here\n}",
    [
        { input: [2.0, 10], expected: 1024.0 },
        { input: [2.1, 3], expected: 9.261 },
        { input: [2.0, -2], expected: 0.25 }
    ]
));

problems.push(createProblem(72, "Sqrt(x)", "medium",
    "Write a function called 'mySqrt' that computes square root of x (integer part only).",
    "function mySqrt(x) {\n    // Your code here\n}",
    [
        { input: [4], expected: 2 },
        { input: [8], expected: 2 },
        { input: [0], expected: 0 }
    ]
));

problems.push(createProblem(73, "Count Primes", "medium",
    "Write a function called 'countPrimes' that counts primes less than n (Sieve of Eratosthenes).",
    "function countPrimes(n) {\n    // Your code here\n}",
    [
        { input: [10], expected: 4 },
        { input: [0], expected: 0 },
        { input: [1], expected: 0 }
    ]
));

problems.push(createProblem(74, "Valid Sudoku", "medium",
    "Write a function called 'isValidSudoku' that validates a 9x9 Sudoku board (represented as 2D array).",
    "function isValidSudoku(board) {\n    // Your code here\n}",
    [
        { input: [[["5","3",".",".","7",".",".",".","."],
                   ["6",".",".","1","9","5",".",".","."],
                   [".","9","8",".",".",".",".","6","."],
                   ["8",".",".",".","6",".",".",".","3"],
                   ["4",".",".","8",".","3",".",".","1"],
                   ["7",".",".",".","2",".",".",".","6"],
                   [".","6",".",".",".",".","2","8","."],
                   [".",".",".","4","1","9",".",".","5"],
                   [".",".",".",".","8",".",".","7","9"]]], expected: true }
    ]
));

problems.push(createProblem(75, "Set Matrix Zeroes", "medium",
    "Write a function called 'setZeroes' that sets entire row and column to 0 if element is 0 (in-place).",
    "function setZeroes(matrix) {\n    // Your code here\n}",
    [
        { input: [[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], expected: [[1, 0, 1], [0, 0, 0], [1, 0, 1]] },
        { input: [[[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]], expected: [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]] }
    ]
));

problems.push(createProblem(76, "Next Permutation", "hard",
    "Write a function called 'nextPermutation' that finds next lexicographically greater permutation (in-place).",
    "function nextPermutation(nums) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3]], expected: [1, 3, 2] },
        { input: [[3, 2, 1]], expected: [1, 2, 3] },
        { input: [[1, 1, 5]], expected: [1, 5, 1] }
    ]
));

problems.push(createProblem(77, "Combination Sum", "medium",
    "Write a function called 'combinationSum' that finds all unique combinations that sum to target (can reuse numbers).",
    "function combinationSum(candidates, target) {\n    // Your code here\n}",
    [
        { input: [[2, 3, 6, 7], 7], 
          expected: (result) => {
            const sorted = result.map(arr => arr.sort());
            return sorted.some(arr => JSON.stringify(arr) === JSON.stringify([2, 2, 3])) &&
                   sorted.some(arr => JSON.stringify(arr) === JSON.stringify([7]));
          } },
        { input: [[2], 1], expected: [] }
    ]
));

problems.push(createProblem(78, "Permutations", "medium",
    "Write a function called 'permute' that returns all permutations of distinct integers.",
    "function permute(nums) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3]], 
          expected: (result) => {
            const sorted = result.map(arr => JSON.stringify(arr.sort())).sort();
            return result.length === 6 && sorted.length === 6;
          } },
        { input: [[0, 1]], expected: [[0, 1], [1, 0]] }
    ]
));

problems.push(createProblem(79, "Subsets", "medium",
    "Write a function called 'subsets' that returns all possible subsets (power set) of distinct integers.",
    "function subsets(nums) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3]], 
          expected: (result) => {
            return result.length === 8 && result.some(arr => JSON.stringify(arr.sort()) === JSON.stringify([1, 2, 3]));
          } },
        { input: [[0]], expected: [[], [0]] }
    ]
));

problems.push(createProblem(80, "Letter Combinations", "medium",
    "Write a function called 'letterCombinations' that returns all letter combinations from phone number digits.",
    "function letterCombinations(digits) {\n    // Your code here\n}",
    [
        { input: ["23"], expected: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"] },
        { input: [""], expected: [] },
        { input: ["2"], expected: ["a", "b", "c"] }
    ]
));

// Problems 81-100: Very Hard Problems
problems.push(createProblem(81, "N-Queens", "hard",
    "Write a function called 'solveNQueens' that returns all distinct solutions to n-queens puzzle.",
    "function solveNQueens(n) {\n    // Your code here\n}",
    [
        { input: [4], 
          expected: (result) => {
            return result.length === 2 && result.every(board => board.length === 4);
          } }
    ]
));

problems.push(createProblem(82, "Regular Expression Matching", "hard",
    "Write a function called 'isMatch' that matches pattern (with '.' and '*') against string.",
    "function isMatch(s, p) {\n    // Your code here\n}",
    [
        { input: ["aa", "a"], expected: false },
        { input: ["aa", "a*"], expected: true },
        { input: ["ab", ".*"], expected: true },
        { input: ["aab", "c*a*b"], expected: true }
    ]
));

problems.push(createProblem(83, "Wildcard Matching", "hard",
    "Write a function called 'isMatchWildcard' that matches pattern (with '?' and '*') against string.",
    "function isMatchWildcard(s, p) {\n    // Your code here\n}",
    [
        { input: ["aa", "a"], expected: false },
        { input: ["aa", "*"], expected: true },
        { input: ["cb", "?a"], expected: false },
        { input: ["adceb", "*a*b"], expected: true }
    ]
));

problems.push(createProblem(84, "Median of Two Sorted Arrays", "hard",
    "Write a function called 'findMedianSortedArrays' that finds median of two sorted arrays (O(log(m+n)) complexity).",
    "function findMedianSortedArrays(nums1, nums2) {\n    // Your code here\n}",
    [
        { input: [[1, 3], [2]], expected: 2.0 },
        { input: [[1, 2], [3, 4]], expected: 2.5 }
    ]
));

problems.push(createProblem(85, "Merge K Sorted Lists", "hard",
    "Write a function called 'mergeKLists' that merges k sorted linked lists (represented as arrays) into one.",
    "function mergeKLists(lists) {\n    // Your code here\n}",
    [
        { input: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] },
        { input: [[], []], expected: [] }
    ]
));

problems.push(createProblem(86, "Reverse Nodes in K-Group", "hard",
    "Write a function called 'reverseKGroup' that reverses nodes of linked list (as array) in groups of k.",
    "function reverseKGroup(head, k) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3, 4, 5], 2], expected: [2, 1, 4, 3, 5] },
        { input: [[1, 2, 3, 4, 5], 3], expected: [3, 2, 1, 4, 5] }
    ]
));

problems.push(createProblem(87, "LRU Cache", "hard",
    "Write a class called 'LRUCache' with get and put methods implementing Least Recently Used cache.",
    "class LRUCache {\n    constructor(capacity) {}\n    get(key) {}\n    put(key, value) {}\n}",
    [
        { input: ["LRUCache", 2, "put", [1, 1], "put", [2, 2], "get", [1], "put", [3, 3], "get", [2]], 
          expected: [null, null, null, 1, null, -1] }
    ]
));

problems.push(createProblem(88, "Serialize and Deserialize Binary Tree", "hard",
    "Write functions 'serialize' and 'deserialize' to convert binary tree to/from string.",
    "function serialize(root) {}\nfunction deserialize(data) {}",
    [
        { input: [[1, [2], [3, [4], [5]]]], 
          expected: (result) => {
            const serialized = serialize([1, [2], [3, [4], [5]]]);
            const deserialized = deserialize(serialized);
            return JSON.stringify(deserialized) === JSON.stringify([1, [2], [3, [4], [5]]]);
          } }
    ]
));

problems.push(createProblem(89, "Kth Largest Element", "medium",
    "Write a function called 'findKthLargest' that finds kth largest element in array (O(n) average).",
    "function findKthLargest(nums, k) {\n    // Your code here\n}",
    [
        { input: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
        { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4 }
    ]
));

problems.push(createProblem(90, "Top K Frequent Elements", "medium",
    "Write a function called 'topKFrequent' that returns k most frequent elements.",
    "function topKFrequent(nums, k) {\n    // Your code here\n}",
    [
        { input: [[1, 1, 1, 2, 2, 3], 2], expected: [1, 2] },
        { input: [[1], 1], expected: [1] }
    ]
));

problems.push(createProblem(91, "Design Twitter", "hard",
    "Write a class called 'Twitter' with postTweet, getNewsFeed, follow, and unfollow methods.",
    "class Twitter {\n    constructor() {}\n    postTweet(userId, tweetId) {}\n    getNewsFeed(userId) {}\n    follow(followerId, followeeId) {}\n    unfollow(followerId, followeeId) {}\n}",
    [
        { input: ["Twitter", "postTweet", [1, 5], "getNewsFeed", [1], "follow", [1, 2], "postTweet", [2, 6], "getNewsFeed", [1]],
          expected: [null, null, [5], null, null, [6, 5]] }
    ]
));

problems.push(createProblem(92, "Meeting Rooms II", "medium",
    "Write a function called 'minMeetingRooms' that finds minimum rooms needed for all meetings.",
    "function minMeetingRooms(intervals) {\n    // Your code here\n}",
    [
        { input: [[[0, 30], [5, 10], [15, 20]]], expected: 2 },
        { input: [[[7, 10], [2, 4]]], expected: 1 }
    ]
));

problems.push(createProblem(93, "Task Scheduler", "medium",
    "Write a function called 'leastInterval' that finds minimum time to complete tasks with cooldown.",
    "function leastInterval(tasks, n) {\n    // Your code here\n}",
    [
        { input: [["A", "A", "A", "B", "B", "B"], 2], expected: 8 },
        { input: [["A", "A", "A", "B", "B", "B"], 0], expected: 6 }
    ]
));

problems.push(createProblem(94, "Decode Ways", "medium",
    "Write a function called 'numDecodings' that counts ways to decode a string (A=1, B=2, ..., Z=26).",
    "function numDecodings(s) {\n    // Your code here\n}",
    [
        { input: ["12"], expected: 2 },
        { input: ["226"], expected: 3 },
        { input: ["06"], expected: 0 }
    ]
));

problems.push(createProblem(95, "Word Ladder", "hard",
    "Write a function called 'ladderLength' that finds shortest transformation sequence from beginWord to endWord.",
    "function ladderLength(beginWord, endWord, wordList) {\n    // Your code here\n}",
    [
        { input: ["hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]], expected: 5 },
        { input: ["hit", "cog", ["hot", "dot", "dog", "lot", "log"]], expected: 0 }
    ]
));

problems.push(createProblem(96, "Longest Valid Parentheses", "hard",
    "Write a function called 'longestValidParentheses' that finds length of longest valid parentheses substring.",
    "function longestValidParentheses(s) {\n    // Your code here\n}",
    [
        { input: ["(()"], expected: 2 },
        { input: [")()())"], expected: 4 },
        { input: [""], expected: 0 }
    ]
));

problems.push(createProblem(97, "Candy", "hard",
    "Write a function called 'candy' that distributes candy to children based on ratings (each child gets at least 1).",
    "function candy(ratings) {\n    // Your code here\n}",
    [
        { input: [[1, 0, 2]], expected: 5 },
        { input: [[1, 2, 2]], expected: 4 }
    ]
));

problems.push(createProblem(98, "Best Time to Buy and Sell Stock IV", "hard",
    "Write a function called 'maxProfit' that finds maximum profit from at most k transactions.",
    "function maxProfit(k, prices) {\n    // Your code here\n}",
    [
        { input: [2, [2, 4, 1]], expected: 2 },
        { input: [2, [3, 2, 6, 5, 0, 3]], expected: 7 }
    ]
));

problems.push(createProblem(99, "Burst Balloons", "hard",
    "Write a function called 'maxCoins' that finds maximum coins from bursting balloons (multiply adjacent values).",
    "function maxCoins(nums) {\n    // Your code here\n}",
    [
        { input: [[3, 1, 5, 8]], expected: 167 },
        { input: [[1, 5]], expected: 10 }
    ]
));

problems.push(createProblem(100, "Russian Doll Envelopes", "hard",
    "Write a function called 'maxEnvelopes' that finds maximum envelopes you can Russian doll (fit inside each other).",
    "function maxEnvelopes(envelopes) {\n    // Your code here\n}",
    [
        { input: [[[5, 4], [6, 4], [6, 7], [2, 3]]], expected: 3 },
        { input: [[[1, 1], [1, 1], [1, 1]]], expected: 1 }
    ]
));

// Update all problems without expectedMinutes to have them based on difficulty
problems.forEach(problem => {
    if (!problem.expectedMinutes) {
        problem.expectedMinutes = getExpectedTime(problem.difficulty);
    }
});

