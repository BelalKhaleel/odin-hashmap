import LinkedList from "./linked-list.mjs";

function createHashMap() {
  let capacity = 16;
  let loadFactor = 0.75;
  let buckets = new Array(capacity);

  function checkKeyIsString(key) {
    if (typeof key !== "string") {
      key = key.toString();
    }
  }

  function hash(key) {
    checkKeyIsString(key);

    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  function set(key, value) {
    checkKeyIsString(key);

    const index = hash(key);

    if (!buckets[index]) {
      const list = LinkedList();
      list.append(key, value);
      buckets[index] = list;
    } else {
      const list = buckets[index];
      const nodeIndex = list.find(key);
      if (key === list.at(nodeIndex).key) {
        list.update(value, nodeIndex);
      } else {
        list.append(key, value)
      }
    }
  }

  function get(key) {
    checkKeyIsString(key);
    
    for (const bucket of buckets) {
      if (bucket && bucket.contains(key)) {
        return bucket.at(bucket.find(key)).value;
      }
    }
  
    return null;
  }

  function has(key) {
    checkKeyIsString(key);

    return buckets.some(bucket => bucket && bucket.contains(key));
  }

  function remove(key) {
    checkKeyIsString(key);

    for (const bucket of buckets) {
      if (bucket && bucket.contains(key)) {
        const index = bucket.find(key);
        bucket.removeAt(index);
        return true;
      }
    }
  
    return false;
  }

  function length() {
    return buckets.reduce((storedKeys, currentBucket) => {
      if (currentBucket) {
        storedKeys += currentBucket.size();
      }
      return storedKeys;
    }, 0);
  }

  return {
    buckets,
    set,
    get,
    has,
    remove,
    length,

  }
}

export default createHashMap;