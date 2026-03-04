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

  "house-robber": {
    id: "house-robber",
    title: "House Robber",
    difficulty: "Medium",
    category: "Array • Dynamic Programming",
    description: {
      text: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. The only constraint is that adjacent houses cannot be robbed on the same night.",
      notes: [
        "Return the maximum amount of money you can rob without alerting the police."
      ],
    },
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "4",
        explanation: "Rob house 1 (1) and house 3 (3). Total = 4."
      },
      {
        input: "nums = [2,7,9,3,1]",
        output: "12",
        explanation: "Rob house 1 (2), house 3 (9), house 5 (1). Total = 12."
      }
    ],
    constraints: [
      "1 ≤ nums.length ≤ 100",
      "0 ≤ nums[i] ≤ 400"
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int rob(vector<int>& nums) {
  // Write your solution here
  
}

int main() {
  vector<int> a = {1,2,3,1};
  cout << rob(a) << endl;

  vector<int> b = {2,7,9,3,1};
  cout << rob(b) << endl;
}`,
      python: `def rob(nums):
    # Write your solution here
    pass

print(rob([1,2,3,1]))  # Expected: 4
print(rob([2,7,9,3,1]))  # Expected: 12`,
      java: `class Solution {
    public static int rob(int[] nums) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(rob(new int[]{1,2,3,1}));
        System.out.println(rob(new int[]{2,7,9,3,1}));
    }
}`,
    },
    expectedOutput: {
      cpp: "4\n12",
      python: "4\n12",
      java: "4\n12",
    },
  },

    "making-a-large-island": {
    id: "making-a-large-island",
    title: "Making A Large Island",
    difficulty: "Hard",
    category: "Graph • DFS • Matrix",
    description: {
      text: "You are given an n x n binary matrix grid. You are allowed to change at most one 0 to 1. Return the size of the largest island after applying this operation.",
      notes: [
        "An island is a 4-directionally connected group of 1s."
      ],
    },
    examples: [
      {
        input: "grid = [[1,0],[0,1]]",
        output: "3"
      },
      {
        input: "grid = [[1,1],[1,0]]",
        output: "4"
      },
      {
        input: "grid = [[1,1],[1,1]]",
        output: "4"
      }
    ],
    constraints: [
      "1 ≤ n ≤ 500",
      "grid[i][j] is either 0 or 1"
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std;

int largestIsland(vector<vector<int>>& grid) {
  // Write your solution here
  
}

int main() {
  vector<vector<int>> g1 = {{1,0},{0,1}};
  cout << largestIsland(g1) << endl;

  vector<vector<int>> g2 = {{1,1},{1,0}};
  cout << largestIsland(g2) << endl;
}`,
      python: `def largestIsland(grid):
    # Write your solution here
    pass`,
      java: `class Solution {
    public static int largestIsland(int[][] grid) {
        // Write your solution here
        return 0;
    }
}`,
    },
    expectedOutput: {
      cpp: "3\n4",
      python: "3\n4",
      java: "3\n4",
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