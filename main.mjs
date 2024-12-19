import HashMap from "./hashmap.mjs";

const hashMap = HashMap();

hashMap.set("apple", 2); // Expect consistent value
// hashMap.set("apple", 4); // Expect consistent value
hashMap.set("aaaaj", 3);
hashMap.set("banana", 4);

// hashMap.clear()
// console.log(hashMap.length())
// console.log(hashMap.buckets)
console.log(hashMap.keys());
// hashMap.buckets.forEach(bucket => console.log(bucket.toString()))

