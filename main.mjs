import HashMap from "./hashmap.mjs";

const hashMap = HashMap();

hashMap.set("apple", 2); // Expect consistent value
hashMap.set("apple", 4); // Expect consistent value
hashMap.set("aaaaj", 3);
console.log(hashMap.buckets[10].toString());

