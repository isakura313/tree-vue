import { defineStore } from "pinia";
import searchTree from "../utils/searchTree.js";

export const useTreeStore = defineStore("treeStore", {
  state: () => ({
    tree: {
      id: 0,
      name: "root",
      children: [
        {
          id: 1,
          name: "Dir1",
          type: "folder",
          children: [
            {
              id: 2,
              name: "Dir 1-1",
              type: "folder",
              children: [
                { id: 3, name: "File 1-1-1", type: "file", children: [] },
              ],
            },
            { id: 4, name: "File 1-2", type: "file", children: [] },
          ],
        },
        {
          id: 5,
          name: "Dir2",
          type: "folder",
          children: [
            { id: 6, name: "Dir 2-1", type: "folder", children: [] },
            { id: 7, name: "File 2-2", type: "file", children: [] },
          ],
        },
        {
          id: 8,
          name: "File 2",
          type: "file",
          children: [],
        },
      ],
    },
  }),
  getters: {
    getTree: (state) => state.tree,
  },
  actions: {
    updateNameOfNode(id, newName) {
      const { element, parent } = searchTree(this.tree, id);
      parent.children = parent.children.map((child) => {
        if (child.id == element.id) {
          child.name = newName;
          return child;
        }
        return child;
      });
    },
    getNameOfNode(id) {
      const { element } = searchTree(this.tree, id);
      return element.name;
    },
    deleteNode(id) {
      const { element, parent } = searchTree(this.tree, id);
      console.log(parent);
      parent.children = parent.children.filter(
        (child) => child.id !== element.id
      );
    },
  },
});
