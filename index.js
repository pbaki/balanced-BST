class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = buildTree(arr, 0, arr.length - 1);
  }
}

function buildTree(dataArray, start, end) {
  if (start > end) {
    return null;
  }
  let mid = Math.floor((start + end) / 2);
  let node = new Node(dataArray[mid]);
  node.left = buildTree(dataArray, start, mid - 1);
  node.right = buildTree(dataArray, mid + 1, end);
  return node;
}

function inOrderTraversal(node, result) {
  if (node === null) {
    return;
  }
  inOrderTraversal(node.left, result);
  if (!result.includes(node.data)) {
    result.push(node.data);
  }
  inOrderTraversal(node.right, result);
}

function sortDupli(bst) {
  let result = [];
  inOrderTraversal(bst.root, result);
  return new Tree(result);
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let bst = new Tree(arr);
let sortedBST = sortDupli(bst);
prettyPrint(sortedBST.root);
