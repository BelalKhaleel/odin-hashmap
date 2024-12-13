import HashMap from "./hashmap.mjs";

const hashMap = HashMap();

// console.log(hashMap);
console.log(hashMap.hash("apple")); // Expect consistent value
console.log(hashMap.hash("banana")); // Different value than "apple"
console.log(hashMap.hash("apple")); // Should match the first call
