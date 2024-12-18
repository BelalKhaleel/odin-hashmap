import LinkedList from "./linked-list.mjs";

function createHashMap() {
  let capacity = 16;
  let loadFactor = 0.75;
  let buckets = new Array(capacity);

  function hash(key) {
    if (typeof key !== "string") {
      key = key.toString();
    }
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }

    return hashCode;
  }

  function set(key, value) {
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

  return {
    buckets,
    set,
  }
}

export default createHashMap;