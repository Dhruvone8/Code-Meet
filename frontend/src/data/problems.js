export const PROBLEMS = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array • Hash Table",
    description: {
      text: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
      notes: [
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        "You can return the answer in any order.",
      ],
    },
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
  // Write your solution here
  
}

// Test cases
int main() {
  vector<int> a = {2, 7, 11, 15};
  auto r1 = twoSum(a, 9);
  cout << "[" << r1[0] << "," << r1[1] << "]" << endl;

  vector<int> b = {3, 2, 4};
  auto r2 = twoSum(b, 6);
  cout << "[" << r2[0] << "," << r2[1] << "]" << endl;

  vector<int> c = {3, 3};
  auto r3 = twoSum(c, 6);
  cout << "[" << r3[0] << "," << r3[1] << "]" << endl;
}`,
      python: `def twoSum(nums, target):
    # Write your solution here
    pass

# Test cases
print(twoSum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print(twoSum([3, 2, 4], 6))  # Expected: [1, 2]
print(twoSum([3, 3], 6))  # Expected: [0, 1]`,
      java: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9)));
        System.out.println(Arrays.toString(twoSum(new int[]{3, 2, 4}, 6)));
        System.out.println(Arrays.toString(twoSum(new int[]{3, 3}, 6)));
    }
}`,
    },
    expectedOutput: {
      cpp: "[0,1]\n[1,2]\n[0,1]",
      python: "[0, 1]\n[1, 2]\n[0, 1]",
      java: "[0, 1]\n[1, 2]\n[0, 1]",
    },
  },

  "reverse-string": {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "Write a function that reverses a string. The input string is given as an array of characters s.",
      notes: ["You must do this by modifying the input array in-place with O(1) extra memory."],
    },
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ascii character"],
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

void reverseString(vector<char>& s) {
  // Write your solution here
  
}

// Test cases
int main() {
  vector<char> test1 = {'h','e','l','l','o'};
  reverseString(test1);
  for(char c : test1) cout << c;
  cout << endl;

  vector<char> test2 = {'H','a','n','n','a','h'};
  reverseString(test2);
  for(char c : test2) cout << c;
  cout << endl;
}`,
      python: `def reverseString(s):
    # Write your solution here
    pass`,
      java: `class Solution {
    public static void reverseString(char[] s) {
        
    }
}`,
    },
    expectedOutput: {
      cpp: "olleh\nhannaH",
      python: "['o', 'l', 'l', 'e', 'h']\n['h', 'a', 'n', 'n', 'a', 'H']",
      java: "[o, l, l, e, h]\n[h, a, n, n, a, H]",
    },
  },

  "valid-palindrome": {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String • Two Pointers",
    description: {
      text: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
      notes: ["Return true if it is a palindrome."],
    },
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
      },
      {
        input: 's = "race a car"',
        output: "false",
      },
    ],
    constraints: ["1 ≤ s.length ≤ 2 * 10⁵"],
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

bool isPalindrome(string s) {
  // Write your solution here
  
}

int main() {
  cout << isPalindrome("A man, a plan, a canal: Panama") << endl;
  cout << isPalindrome("race a car") << endl;
}`,
      python: `def isPalindrome(s):
    pass`,
      java: `class Solution {
    public static boolean isPalindrome(String s) {
        return false;
    }
}`,
    },
    expectedOutput: {
      cpp: "1\n0",
      python: "True\nFalse",
      java: "true\nfalse",
    },
  },

  "maximum-subarray": {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    description: {
      text: "Find the contiguous subarray with the largest sum.",
      notes: [],
    },
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
      },
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁵"],
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int maxSubArray(vector<int>& nums) {
  // Write your solution here
  
}

int main() {
  vector<int> v = {-2,1,-3,4,-1,2,1,-5,4};
  cout << maxSubArray(v) << endl;
}`,
      python: `def maxSubArray(nums):
    pass`,
      java: `class Solution {
    public static int maxSubArray(int[] nums) {
        return 0;
    }
}`,
    },
    expectedOutput: {
      cpp: "6",
      python: "6",
      java: "6",
    },
  },

  "container-with-most-water": {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array • Two Pointers",
    description: {
      text: "Return the maximum area of water a container can store.",
      notes: [],
    },
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
      },
    ],
    constraints: ["2 ≤ n ≤ 10⁵"],
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int maxArea(vector<int>& height) {
  // Write your solution here
  
}

int main() {
  vector<int> h = {1,8,6,2,5,4,8,3,7};
  cout << maxArea(h) << endl;
}`,
      python: `def maxArea(height):
    pass`,
      java: `class Solution {
    public static int maxArea(int[] height) {
        return 0;
    }
}`,
    },
    expectedOutput: {
      cpp: "49",
      python: "49",
      java: "49",
    },
  },
};

export const LANGUAGE_CONFIG = {
  cpp: {
    name: "C++",
    icon: "/cpp.png",
    monacoLang: "cpp",
  },
  python: {
    name: "Python",
    icon: "/python.png",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "/java.png",
    monacoLang: "java",
  },
};