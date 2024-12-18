import Node from "./node.mjs";

function createLinkedList () {
  let headNode = null;
  let tailNode = null;
  let length = 0;

  const append = (key, value) => {
    const newNode = Node(key, value);

    if (!headNode) {
      headNode = newNode;
      tailNode = newNode;
    } else {
      tailNode.nextNode = newNode;
      tailNode = newNode;
    }
    length++;
  }

  const prepend = (key, value) => {
    const newNode = Node(key, value);

    if (!headNode) {
      headNode = newNode;
    } else {
      newNode.nextNode = headNode;
      headNode = newNode;
    }
    length++;
  }

  const size = () => {
    return length;
  }

  const head = () => {
    return headNode;
  }

  const tail = () => {
    return tailNode;
  }
  
  const checkIndexBoundary = (index) => {
    if (index < 0) {
      throw new Error('Index cannot be less than zero');
    }
    if (index > length) {
      throw new Error('Index cannot be greater than list size');
    }
  }

  const at = (index) => {
    checkIndexBoundary(index);

    let currentNode = headNode;
    while(index > 0) {
      currentNode = currentNode.nextNode;
      index--;
    }
    return currentNode;
  }

  const pop = () => {
    if (!headNode) {
      throw new Error("List is already empty!");
    }
    let currentNode = headNode;
    while (currentNode.nextNode !== tailNode) {
      currentNode = currentNode.nextNode;
    }
    let secondToLastNode = currentNode;
    if (length === 1) {
      headNode = null;
      tailNode = null;
    } else {
      tailNode = secondToLastNode;
      tailNode.nextNode = null;
    }
    length--;
  }

  const contains = (key) => {
    let currentNode = headNode;

    while(currentNode !== null) {
      if(currentNode.key === key) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }

    return false;
  }

  const find = (key) => {
    let index = 0;
    let currentNode = headNode;

    while(currentNode !== null) {
      if(currentNode.key === key) {
        return index;
      }
      currentNode = currentNode.nextNode;
      index++;
    }

    return null;
  }

  const toString = () => {
    let output = "";
    let currentNode = headNode;

    while (currentNode !== null) {
      output += `( ${currentNode.key}, ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }

    return output + "null";
  }

  const insertAt = (key, value, index) => {
    checkIndexBoundary(index);

    const newNode = Node(key, value);

    if (index === 0) {
      newNode.nextNode = headNode;
      headNode = newNode;

      if(length === 0) {
        tailNode = newNode;
      }
    } else if (index === length) {
      tailNode.nextNode = newNode;
      tailNode = newNode;
    } else {
      let currentIndex = 0;
      let currentNode = headNode;
    
      while(currentIndex < index - 1) {
        currentNode = currentNode.nextNode;
        currentIndex++;
      }
      newNode.nextNode = currentNode.nextNode;
      currentNode.nextNode = newNode;
    }
    length++;
  }

  const removeAt = (index) => {
    checkIndexBoundary(index);
    if (length === 0) {
      throw new Error("List already empty!");
    } 
    
    let secondToLastNode = null;
    if (index === 0) {
      headNode = headNode.nextNode;
      if (length === 1) {
        tailNode = null;
      }
    } else {
      let currentNode = headNode;
      let previousNode = null;
      let currentIndex = 0;
    
      while(currentIndex < index) {
        previousNode = currentNode;
        currentNode = currentNode.nextNode;
        currentIndex++;
      }

      if (currentNode === tailNode) {
        tailNode = previousNode;
        tailNode.nextNode = null;
        secondToLastNode = previousNode === headNode ? null : headNode;
        while (secondToLastNode?.nextNode !== tailNode) {
          secondToLastNode = secondToLastNode?.nextNode;
        }
      } else {
        previousNode.nextNode = currentNode.nextNode;
      }
    }
    length--;
  }

  const update = (value, index) => {
    checkIndexBoundary(index);

    let currentNode = headNode;

    for (let i = 0; i < index; i++) {
      currentNode = currentNode.nextNode;
    }

    return currentNode ? currentNode.value = value : null;
  }

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
    update,
  };
}

export default createLinkedList;