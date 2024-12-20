import LinkedList from "./linked-list.mjs";

function createHashMap(capacity = 16, loadFactor = 0.75) {
  let buckets = new Array(capacity);

  function doubleBucketsSize() {
    if (length() > capacity * loadFactor) {
      const previousBuckets = buckets;
      capacity *= 2;
      buckets = new Array(capacity);
      for (const bucket of previousBuckets) {
        if (bucket) {
          for (let i = 0; i < bucket.size(); i++) {
            const { key, value } = bucket.at(i);
            const index = hash(key);
            if (!buckets[index]) {
              const list = LinkedList();
              list.append(key, value);
              buckets[index] = list;
            } else {
              const list = buckets[index];
              list.append(key, value);
            }
          }
        }
      }
    }
  }

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
        list.append(key, value);
      }
    }
    doubleBucketsSize();
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

    return buckets.some((bucket) => bucket && bucket.contains(key));
  }

  function remove(key) {
    checkKeyIsString(key);

    const bucket = buckets.find((bucket) => bucket && bucket.contains(key));
    if (!bucket) return false;
    if (bucket.size() === 1) {
      const index = buckets.indexOf(bucket);
      delete buckets[index];
    } else {
      const index = bucket.find(key);
      bucket.removeAt(index);
    }

    return true;
  }

  function length() {
    return buckets.reduce((storedKeys, currentBucket) => {
      if (currentBucket) {
        storedKeys += currentBucket.size();
      }
      return storedKeys;
    }, 0);
  }

  function clear() {
    for (let i = 0; i < buckets.length; i++) {
      delete buckets[i];
    }
  }

  function keys() {
    return buckets
      .filter((bucket) => bucket)
      .flatMap((bucket) =>
        Array.from({ length: bucket.size() }, (_, i) => bucket.at(i).key)
      );
  }

  function values() {
    return buckets
      .filter((bucket) => bucket)
      .flatMap((bucket) =>
        Array.from({ length: bucket.size() }, (_, i) => bucket.at(i).value)
      );
  }

  function entries() {
    return buckets
      .filter((bucket) => bucket)
      .flatMap((bucket) =>
        Array.from({ length: bucket.size() }, (_, i) => [
          bucket.at(i).key,
          bucket.at(i).value,
        ])
      );
  }

  return {
    get bucketsLength() {
      return buckets.length;
    },
    get buckets() {
      return buckets;
    },
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}

export default createHashMap;
