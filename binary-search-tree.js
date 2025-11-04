export class Node {
  constructor(data, left = null, right = null){
    this.data = data
    this.left = left
    this.right = right
  }
}

export class Tree {
  constructor(array) {
    this.array = this.#prepareArray(array)
    this.root = this.#buildTree(this.array)
  }

  #prepareArray(array) {
    let sortedArray = array.sort((a,b) => a - b)
    let preparedArray = [...new Set(sortedArray)] //remove duplicates
    return preparedArray
  }

  #buildTree(array) {
    if (array.length <= 0) {return null}
    let mid = Math.floor(array.length / 2)
    let left = array.slice(0, mid)
    let right = array.slice(mid + 1)
    
    let root = new Node(array[mid], this.#buildTree(left), this.#buildTree(right)) ;

    return root;    
  }  

  insert(value) {
    this.#insertHelper(value, this.root)
  }

  #insertHelper(value, root) {
    if (root === null) {return new Node(value)}
    if (value === root.data) {return root}    
    if (value < root.data) {
      root.left = this.#insertHelper(value, root.left)
    }
    else {
      root.right = this.#insertHelper(value, root.right)
    }
    return root;
  }

  delete(value) {
    this.root = this.#deleteHelper(value, this.root)
  } 

  #deleteHelper(value, root) {
    if (!root) {return root}
    if (value < root.data) {root.left = this.#deleteHelper(value, root.left)}
    else if (value > root.data) {root.right = this.#deleteHelper(value, root.right)}
    else {
      if (!root.left && !root.right) {return null}
      else if (root.left && !root.right) {return root.left}
      else if (root.right && !root.left) {return root.right}
      else {
        const temp = this.findMin(root.right)
        root.data = temp.data
        root.right = this.#deleteHelper(temp.data, root.right)
      }
    }
    return root;
  }

  levelOrderForEachIterative(callback) {
    if (!callback) {throw new Error("Callback required but none given.");}
    if (!this.root) {return}

    let queue = [this.root]
    let head = 0

    while (head < queue.length) {
      const node = queue[head++]
      callback(node)
      if (node.left) {queue.push(node.left)}
      if (node.right) {queue.push(node.right)}
    }    
  }

  levelOrderForEachRecursive(callback) {
    if (!callback) {throw new Error("Callback required.");}
    if (!this.root) {throw new Error ("No root found.")}
    else {this.#levelOrderForEachRecursiveHelper(callback, queue = [this.root], 0)}
  }

  #levelOrderForEachRecursiveHelper(callback, queue, index) {
    if (index >= queue.length) {return}

    const node = queue[index]    
    callback(node)

    if (node.left) {queue.push(node.left)}
    if (node.right) {queue.push(node.right)}

    this.#levelOrderForEachRecursiveHelper(callback, queue, index + 1)
  }

  inOrderForEach(callback) {
    this.#inOrderForEachHelper(callback, this.root)
  }

  #inOrderForEachHelper(callback, root) {
    if (!root) {return}
    this.#inOrderForEachHelper(callback, root.left)
    callback(root)
    this.#inOrderForEachHelper(callback, root.right)
    return root
  }

  findMin(root) {
    if (root === null) {return root}
    if (root.left) {root = this.findMin(root.left)}
    else if (root.right) {root = this.findMin(root.right)}
    return root
  }

  find(value) {
    return this.#findHelper(value, this.root)
  }
  
  #findHelper(value, root) {
    if (!root) {return null}
    if (value < root.data) {root = this.#findHelper(value, root.left)}
    else if (value > root.data) {root = this.#findHelper(value, root.right)}
    else if (value === root.data){return root}
    else {return null}
    return root;
  }

  print(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.print(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.print(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.print();
console.log(tree.find(222))

tree.inOrderForEach((node) => console.log(node.data))