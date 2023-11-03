<script setup>
import TreeMenu from "./components/TreeMenu.vue";
import { useTreeStore } from "./store/index";
import "./App.scss";
const treeStore = useTreeStore();
</script>

<template>
  <div style="width: 400px; padding: 1em">
    <Tree-menu
      v-for="child in treeStore.tree.children"
      :id="child.id"
      :parentId="0"
      :type="child.type"
      :name="child.name"
      :children="child.children"
      :depth="0"
    />
  </div>
</template>
