export class Node {
  constructor(data, left = null, right = null){
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

export class Tree {
  constructor(array) {
    this.array = this.#prepareArray(array);
    this.root = this.#buildTree(this.array);
  }

  #buildTree(array) {
    if (array.length <= 0) {return null};
    let mid = Math.floor(array.length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid + 1);
    
    let root = new Node(array[mid], this.#buildTree(left), this.#buildTree(right)) ;

    return root;    
  }  

  #prepareArray(array) {
    let sortedArray = array.sort((a,b) => a - b);
    let preparedArray = [...new Set(sortedArray)]; //remove duplicates
    return preparedArray;
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
  };
}

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.print();