function createHashMap() {
  let capacity = 16;
  let loadFactor = 0.75;

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
 return {
  hash,
 }
}

export default createHashMap;