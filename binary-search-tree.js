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

  #prepareArray(array) {
    let sortedArray = array.sort((a,b) => a - b);
    let preparedArray = [...new Set(sortedArray)]; //remove duplicates
    return preparedArray;
  }

  #buildTree(array) {
    if (array.length <= 0) {return null};
    let mid = Math.floor(array.length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid + 1);
    
    let root = new Node(array[mid], this.#buildTree(left), this.#buildTree(right)) ;

    return root;    
  }  

  insert(value, root = this.root) {
    if (root === null) {return new Node(value)}
    if (value === root.data) {return root}    
    if (value < root.data) {
      root.left = this.insert(value, root.left)
    }
    else {
      root.right = this.insert(value, root.right)
    }
    return root;
  }

  delete(value, root = this.root) {
    if (root === null) {return root}
    if (value < root.data) {root.left = this.delete(value, root.left);} 
    else if (value > root.data) {root.right = this.delete(value, root.right);} 
    else {
      //If has no children
      if (root.left === null && root.right === null) {
        return null;
      }
      //If has one child
      else if (root.left === null) {
        return root.right;
      }
      else if (root.right === null) {
        return root.left;
      }

      //If has 2 children
      else if (root.right != null && root.left != null){
        const temp = this.findMin(root.right);
        root.data = temp.data;
        root.right = this.delete(temp.data, root.right)
      }
    }
    return root;
  }

  findMin(root) {
    if (root === null) {return root};
    if (root.left) {root = this.findMin(root.left)}
    else if (root.right) {root = this.findMin(root.right)}
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
  };
}

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.insert(1);
tree.print();
tree.delete(5);
tree.print();
tree.delete(4);
tree.print();