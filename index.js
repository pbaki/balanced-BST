//Merge sort
function MergeSort(arr) {
  let mid = arr.length / 2;
  let first = arr.slice(0, mid);
  let second = arr.slice(mid, arr.length);
  if (arr.length < 2) {
    return arr;
  }
  let left = MergeSort(first);
  let right = MergeSort(second);
  let finish = merge(left, right);
  return finish;
}

function merge(arr1, arr2) {
  let mergeArr = [];
  while (arr1.length >= 1 && arr2.length >= 1) {
    if (arr1[0] < arr2[0]) {
      mergeArr.push(arr1.shift());
    } else if (arr1[0] == arr2[0]) {
      mergeArr.push(arr1[0]);
      arr1.shift();
      arr2.shift();
    } else {
      mergeArr.push(arr2.shift());
    }
  }
  if (arr1.length == 0 && arr2.length !== 0) {
    mergeArr = mergeArr.concat(arr2);
  } else if (arr2.length == 0 && arr1.length !== 0) {
    mergeArr = mergeArr.concat(arr1);
  }
  return mergeArr;
}

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
function find(value, node = bst.root) {
  let currentDataNode;
  if (node === null) {
    return "no such data";
  }
  if (value == node.data) {
    return node;
  }

  if (value > node.data) {
    currentDataNode = node.right;
  } else if (value < node.data) {
    currentDataNode = node.left;
  }
  return find(value, currentDataNode);
}

function insert(value, node = bst.root) {
  let currentDataNode;
  if (node.data == value) {
    return "Value exists";
  }
  if (value > node.data && node.right == null) {
    node.right = new Node(value);
    return node;
  } else if (value < node.data && node.left == null) {
    node.left = new Node(value);
    return node;
  }
  if (value > node.data) {
    currentDataNode = node.right;
  } else if (value < node.data) {
    currentDataNode = node.left;
  }

  return insert(value, currentDataNode);
}
function deleteNode(value, node = bst.root) {
  if (node == null) {
    return node;
  }
  if (value < node.data) {
    node.left = deleteNode(value, node.left);
  } else if (value > node.data) {
    node.right = deleteNode(value, node.right);
  } else {
    if (node.right == null) {
      return node.left;
    } else if (node.left == null) {
      return node.right;
    }
    node.data = minValue(node.right);
    node.right = deleteNode(node.data, node.right);
  }
  return node;
}

function minValue(node) {
  let minValue = node.data;
  while (node.left !== null) {
    minValue = node.left.data;
    node = node.left;
  }
  return minValue;
}

let holder = [];
function levelOrder(node = bst.root) {
  if (node == null) {
    return;
  }
  let queue = [];
  queue.push(node);
  holder.push(node.data);
  while (queue.length != 0) {
    node = queue[0];
    if (node == null) {
      return;
    }
    if (node.left != null) {
      queue.push(node.left);
      holder.push(node.left.data);
    }
    if (node.right != null) {
      queue.push(node.right);
      holder.push(node.right.data);
    }
    queue.shift();
  }
}

let arr = [
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 6, 2, 7, 235, 7845, 1234,
  346, 856,
];
let sortedArr = MergeSort(arr);
let bst = new Tree(sortedArr);
bst = sortDupli(bst);
//console.log(bst.root);
//console.log(find(1));
//insert(88);
//deleteNode(9);
//levelOrder();
//console.log("breadth-first data in order: " + holder);
prettyPrint(bst.root);
