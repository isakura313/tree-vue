function searchTree(element, matchingId, parent) {
  if (element.id === matchingId) {
    return { element: element, parent: parent };
  } else if (element.children != null) {
    let result = null;
    for (let i = 0; result == null && i < element.children.length; i++) {
      result = searchTree(element.children[i], matchingId, element);
    }
    return result;
  }
  return null;
}

export default searchTree;
