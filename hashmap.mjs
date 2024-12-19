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

    const nonEmptyBuckets = buckets.filter(bucket => bucket !== undefined);

    if(nonEmptyBuckets.length === 0) {
      return null;
    } else {
      const matchingBucket = nonEmptyBuckets.find(bucket => bucket.find(key) || bucket.find(key) === 0);
      if(matchingBucket) {
        const index = matchingBucket.find(key);
        return matchingBucket.at(index).value;
      } else {
        return null;
      }
    }
  }

  return {
    buckets,
    set,
    get,
  }
}

export default createHashMap;