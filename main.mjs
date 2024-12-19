import HashMap from "./hashmap.mjs";

const hashMap = HashMap();

hashMap.set("apple", 2); // Expect consistent value
// hashMap.set("apple", 4); // Expect consistent value
hashMap.set("aaaaj", 3);
hashMap.set("banana", 4);

// console.log(hashMap.buckets)
console.log(hashMap.length())
// hashMap.buckets.forEach(bucket => console.log(bucket.toString()))

