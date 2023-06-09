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

function inorder(node, result) {
  if (node === null) {
    return;
  }
  inorder(node.left, result);
  result.push(node.data);
  inorder(node.right, result);
}
function preorder(node, result) {
  if (node === null) {
    return;
  }
  result.push(node.data);
  preorder(node.left, result);
  preorder(node.right, result);
}
function postorder(node, result) {
  if (node === null) {
    return;
  }
  postorder(node.left, result);
  postorder(node.right, result);
  result.push(node.data);
}
function inorderHandler(node = bst.root) {
  let result = [];
  inorder(node, result);
  return result;
}
function preorderHandler(node = bst.root) {
  let result = [];
  preorder(node, result);
  return result;
}
function postorderHandler(node = bst.root) {
  let result = [];
  postorder(node, result);
  return result;
}
function height(node = bst.root) {
  if (node === null) {
    return;
  }
  let counter1 = 0;
  let counter2 = 0;
  let tempnode = node;
  while (tempnode != null) {
    tempnode = tempnode.right;
    counter1 += 1;
  }
  while (node != null) {
    node = node.left;
    counter2 += 1;
  }
  return counter1 > counter2
    ? counter1
    : counter2 > counter1
    ? counter2
    : counter1;
}

function depth(
  givenNode = bst.root.left.right.left,
  rootNode = bst.root,
  counter = 0
) {
  if (rootNode === null) {
    return "Not found";
  }
  if (rootNode === givenNode) {
    return counter;
  }

  let leftDepth = depth(givenNode, rootNode.left, counter + 1);
  let rightDepth = depth(givenNode, rootNode.right, counter + 1);

  if (leftDepth !== "Not found") {
    return leftDepth;
  }
  if (rightDepth !== "Not found") {
    return rightDepth;
  }

  return "Not found";
}

function isBalanced(node = bst.root, counter = 0) {
  if (node === null) {
    return 0;
  }

  let leftHeight = isBalanced(node.left, counter + 1);
  let rightHeight = isBalanced(node.right, counter + 1);
  if (leftHeight === false || rightHeight === false) {
    return false;
  }
  if (leftHeight - rightHeight > 1 || rightHeight - leftHeight > 1) {
    return false;
  }
  return Math.max(leftHeight, rightHeight) + 1;
}
function rebalance(node = bst.root) {
  let balancedTree = sortDupli(node);
  return balancedTree;
}

function isBalancedString(Tree) {
  if (isBalanced(Tree) === false) {
    console.log("Tree not balanced");
  } else {
    console.log("Tree is Balanced");
  }
}

let arr = [
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 6, 2, 7, 235, 7845, 1234,
  346, 856,
];
//bst = sortDupli(bst);
//console.log(bst.root);
//console.log(find(1));
//insert(88);
//deleteNode(9);
//levelOrder();
//console.log("breadth-first data in order: " + holder);
// inorderHandler();
// preorderHandler();
// postorderHandler();
//console.log(height());
//console.log(depth());
// deleteNode(1);
// deleteNode(2);
// deleteNode(3);
// deleteNode(5);
// console.log(isBalanced());
//prettyPrint(bst.root);

function tieTogeter() {
  let sortedArr = MergeSort(arr);
  let bst = new Tree(sortedArr);
  isBalancedString(bst.root);
  console.log("preorder: " + preorderHandler(bst.root));
  console.log("postorder: " + postorderHandler(bst.root));
  console.log("inorder: " + inorderHandler(bst.root));
  insert(101, bst.root);
  insert(102, bst.root);
  insert(103, bst.root);
  insert(104, bst.root);
  insert(105, bst.root);
  insert(106, bst.root);
  console.log("Inserted some numbers");
  isBalancedString(bst.root);
  let rebalanced = rebalance(bst);
  console.log("rebalanced");
  isBalancedString(rebalanced.root);
  console.log("preorder: " + preorderHandler(bst.root));
  console.log("postorder: " + postorderHandler(bst.root));
  console.log("inorder: " + inorderHandler(bst.root));
}
tieTogeter();
