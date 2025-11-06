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
    "Write a function called 'sum' that takes two numbers as parameters and returns their sum.",
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
    "Write a function called 'max' that takes two numbers and returns the larger one.",
    "function max(a, b) {\n    // Your code here\n}",
    [
        { input: [5, 10], expected: 10 },
        { input: [20, 5], expected: 20 },
        { input: [-5, -10], expected: -5 },
        { input: [0, 0], expected: 0 }
    ]
));

problems.push(createProblem(3, "Is Even", "easy",
    "Write a function called 'isEven' that takes a number and returns true if it's even, false otherwise.",
    "function isEven(num) {\n    // Your code here\n}",
    [
        { input: [2], expected: true },
        { input: [3], expected: false },
        { input: [0], expected: true },
        { input: [100], expected: true }
    ]
));

problems.push(createProblem(4, "Reverse String", "easy",
    "Write a function called 'reverseString' that takes a string and returns it reversed.",
    "function reverseString(str) {\n    // Your code here\n}",
    [
        { input: ["hello"], expected: "olleh" },
        { input: ["world"], expected: "dlrow" },
        { input: [""], expected: "" },
        { input: ["a"], expected: "a" }
    ]
));

problems.push(createProblem(5, "Factorial", "easy",
    "Write a function called 'factorial' that calculates the factorial of a number. Factorial of n is n * (n-1) * ... * 1.",
    "function factorial(n) {\n    // Your code here\n}",
    [
        { input: [5], expected: 120 },
        { input: [0], expected: 1 },
        { input: [1], expected: 1 },
        { input: [3], expected: 6 }
    ]
));

problems.push(createProblem(6, "Is Palindrome", "easy",
    "Write a function called 'isPalindrome' that checks if a string reads the same forwards and backwards.",
    "function isPalindrome(str) {\n    // Your code here\n}",
    [
        { input: ["racecar"], expected: true },
        { input: ["hello"], expected: false },
        { input: ["a"], expected: true },
        { input: ["madam"], expected: true }
    ]
));

problems.push(createProblem(7, "Count Vowels", "easy",
    "Write a function called 'countVowels' that counts the number of vowels (a, e, i, o, u) in a string.",
    "function countVowels(str) {\n    // Your code here\n}",
    [
        { input: ["hello"], expected: 2 },
        { input: ["aeiou"], expected: 5 },
        { input: ["xyz"], expected: 0 },
        { input: ["Hello World"], expected: 3 }
    ]
));

problems.push(createProblem(8, "FizzBuzz", "easy",
    "Write a function called 'fizzBuzz' that takes a number. Return 'Fizz' if divisible by 3, 'Buzz' if divisible by 5, 'FizzBuzz' if divisible by both, otherwise return the number.",
    "function fizzBuzz(n) {\n    // Your code here\n}",
    [
        { input: [3], expected: "Fizz" },
        { input: [5], expected: "Buzz" },
        { input: [15], expected: "FizzBuzz" },
        { input: [7], expected: 7 }
    ]
));

problems.push(createProblem(9, "Find Largest", "easy",
    "Write a function called 'findLargest' that takes an array of numbers and returns the largest number.",
    "function findLargest(arr) {\n    // Your code here\n}",
    [
        { input: [[1, 5, 3, 9, 2]], expected: 9 },
        { input: [[-1, -5, -3]], expected: -1 },
        { input: [[10]], expected: 10 },
        { input: [[1, 2, 3, 4, 5]], expected: 5 }
    ]
));

problems.push(createProblem(10, "Sum Array", "easy",
    "Write a function called 'sumArray' that takes an array of numbers and returns their sum.",
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
    "Write a function called 'removeDuplicates' that takes an array and returns a new array with duplicates removed.",
    "function removeDuplicates(arr) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 2, 3, 4, 4, 5]], expected: [1, 2, 3, 4, 5] },
        { input: [["a", "b", "a", "c"]], expected: ["a", "b", "c"] },
        { input: [[1, 1, 1, 1]], expected: [1] },
        { input: [[]], expected: [] }
    ]
));

problems.push(createProblem(12, "Find Index", "easy",
    "Write a function called 'findIndex' that takes an array and a value, returns the index of that value, or -1 if not found.",
    "function findIndex(arr, val) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3, 4], 3], expected: 2 },
        { input: [["a", "b", "c"], "b"], expected: 1 },
        { input: [[1, 2, 3], 5], expected: -1 },
        { input: [[], 1], expected: -1 }
    ]
));

problems.push(createProblem(13, "Capitalize Words", "medium",
    "Write a function called 'capitalizeWords' that takes a string and capitalizes the first letter of each word.",
    "function capitalizeWords(str) {\n    // Your code here\n}",
    [
        { input: ["hello world"], expected: "Hello World" },
        { input: ["javascript is fun"], expected: "Javascript Is Fun" },
        { input: ["a"], expected: "A" },
        { input: [""], expected: "" }
    ]
));

problems.push(createProblem(14, "Is Prime", "medium",
    "Write a function called 'isPrime' that checks if a number is prime (only divisible by 1 and itself).",
    "function isPrime(n) {\n    // Your code here\n}",
    [
        { input: [7], expected: true },
        { input: [4], expected: false },
        { input: [2], expected: true },
        { input: [1], expected: false }
    ]
));

problems.push(createProblem(15, "Fibonacci", "medium",
    "Write a function called 'fibonacci' that takes a number n and returns the nth Fibonacci number.",
    "function fibonacci(n) {\n    // Your code here\n}",
    [
        { input: [0], expected: 0 },
        { input: [1], expected: 1 },
        { input: [5], expected: 5 },
        { input: [7], expected: 13 }
    ]
));

problems.push(createProblem(16, "Flatten Array", "medium",
    "Write a function called 'flattenArray' that takes a nested array and returns a flattened array.",
    "function flattenArray(arr) {\n    // Your code here\n}",
    [
        { input: [[1, [2, 3], [4, 5]]], expected: [1, 2, 3, 4, 5] },
        { input: [[1, 2, 3]], expected: [1, 2, 3] },
        { input: [[[1, 2], [3, 4]]], expected: [1, 2, 3, 4] },
        { input: [[]], expected: [] }
    ]
));

problems.push(createProblem(17, "Count Characters", "easy",
    "Write a function called 'countCharacters' that takes a string and returns an object with character counts.",
    "function countCharacters(str) {\n    // Your code here\n}",
    [
        { input: ["hello"], expected: {h: 1, e: 1, l: 2, o: 1} },
        { input: ["aabb"], expected: {a: 2, b: 2} },
        { input: [""], expected: {} },
        { input: ["abc"], expected: {a: 1, b: 1, c: 1} }
    ]
));

problems.push(createProblem(18, "Merge Arrays", "easy",
    "Write a function called 'mergeArrays' that takes two arrays and returns a merged array.",
    "function mergeArrays(arr1, arr2) {\n    // Your code here\n}",
    [
        { input: [[1, 2], [3, 4]], expected: [1, 2, 3, 4] },
        { input: [["a"], ["b"]], expected: ["a", "b"] },
        { input: [[], [1, 2]], expected: [1, 2] },
        { input: [[1, 2], []], expected: [1, 2] }
    ]
));

problems.push(createProblem(19, "Rotate Array", "medium",
    "Write a function called 'rotateArray' that takes an array and a number k, rotates the array k positions to the right.",
    "function rotateArray(arr, k) {\n    // Your code here\n}",
    [
        { input: [[1, 2, 3, 4, 5], 2], expected: [4, 5, 1, 2, 3] },
        { input: [[1, 2, 3], 1], expected: [3, 1, 2] },
        { input: [[1], 5], expected: [1] },
        { input: [[1, 2], 0], expected: [1, 2] }
    ]
));

problems.push(createProblem(20, "Two Sum", "medium",
    "Write a function called 'twoSum' that takes an array of numbers and a target sum. Return indices of two numbers that add up to target.",
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
    "Write a function called 'truncate' that takes a string and max length, truncates if longer and adds '...'.",
    "function truncate(str, maxLen) {\n    // Your code here\n}",
    [
        { input: ["hello world", 5], expected: "hello..." },
        { input: ["short", 10], expected: "short" },
        { input: ["test", 4], expected: "test" }
    ]
));

problems.push(createProblem(22, "Anagram Check", "medium",
    "Write a function called 'isAnagram' that checks if two strings are anagrams (same letters, different order).",
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

// Generate remaining 60 problems with better structure
const additionalProblems = [
    { title: "Power of Two", difficulty: "easy", desc: "Check if a number is a power of 2.", 
      code: "function isPowerOfTwo(n) {}", tests: [
        { input: [8], expected: true },
        { input: [7], expected: false },
        { input: [1], expected: true }
    ]},
    { title: "Count Words", difficulty: "easy", desc: "Count the number of words in a string.", 
      code: "function countWords(str) {}", tests: [
        { input: ["hello world"], expected: 2 },
        { input: ["one"], expected: 1 },
        { input: [""], expected: 0 }
    ]},
    { title: "Array Difference", difficulty: "medium", desc: "Return elements in first array not in second.", 
      code: "function arrayDiff(arr1, arr2) {}", tests: [
        { input: [[1, 2, 3], [2, 3]], expected: [1] },
        { input: [[1, 2], [3, 4]], expected: [1, 2] }
    ]},
    { title: "Sum Digits", difficulty: "easy", desc: "Sum all digits of a number.", 
      code: "function sumDigits(n) {}", tests: [
        { input: [123], expected: 6 },
        { input: [456], expected: 15 },
        { input: [0], expected: 0 }
    ]},
    { title: "Is Perfect Square", difficulty: "medium", desc: "Check if a number is a perfect square.", 
      code: "function isPerfectSquare(n) {}", tests: [
        { input: [16], expected: true },
        { input: [15], expected: false },
        { input: [1], expected: true }
    ]}
];

// Helper to get expected time based on difficulty (defined before use)
function getExpectedTime(difficulty) {
    switch(difficulty) {
        case 'easy': return 3; // 3 minutes
        case 'medium': return 6; // 6 minutes
        case 'hard': return 12; // 12 minutes
        default: return 5;
    }
}

// Add the additional problems and fill to 100
let problemId = 41;
additionalProblems.forEach(p => {
    if (problemId <= 100) {
        const funcName = p.code.match(/function\s+(\w+)/)[1];
        problems.push(createProblem(problemId, p.title, p.difficulty, p.desc, p.code, p.tests, getExpectedTime(p.difficulty)));
        problemId++;
    }
});

// Fill remaining with variations
while (problemId <= 100) {
    const difficulties = ["easy", "medium", "hard"];
    const difficulty = difficulties[Math.floor((problemId - 41) / 20)];
    const templates = [
        { title: `Challenge ${problemId}`, difficulty: difficulty, desc: `Solve challenge ${problemId}.`, 
          code: `function challenge${problemId}(n) {}`, tests: [
            { input: [1], expected: 1 },
            { input: [2], expected: 2 }
        ]}
    ];
    const t = templates[0];
    problems.push(createProblem(problemId, t.title, t.difficulty, t.desc, t.code, t.tests, getExpectedTime(t.difficulty)));
    problemId++;
}

// Update all problems without expectedMinutes to have them based on difficulty
problems.forEach(problem => {
    if (!problem.expectedMinutes) {
        problem.expectedMinutes = getExpectedTime(problem.difficulty);
    }
});

