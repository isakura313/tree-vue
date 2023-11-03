<template>
  <div>
    <Modal :show="showEditModal">
      <div class="edit_box">
        <input
          type="text"
          class="edit_box__input"
          ref="edit_input_ref"
          v-model="input_data"
          @keyup.esc="show = showEditModal = false"
          @keydown.enter="saveEdit(id)"
        />
        <div class="edit_box__button_group">
          <button
            @click="saveEdit(id)"
            class="edit_box__button edit_box__button_save"
          >
            Save
          </button>
          <button
            @click="declineEdit"
            class="edit_box__button edit_box__button_decline"
          >
            Decline
          </button>
        </div>
      </div>
    </Modal>
    <div :style="indent" class="tree-menu">
      <div class="tree-menu__left" v-if="type === 'folder'">
        <IconFolder />
        <p style="margin-left: 6px">{{ name }}</p>
      </div>
      <div class="tree-menu__left" v-if="type === 'file'">
        <IconFile />
        <p style="margin-left: 6px">{{ name }}</p>
      </div>
      <div style="display: flex">
        <div @click="editItem(id)" class="tree-menu_icon tree-menu_icon_edit">
          <IconPencil />
        </div>
        <div
          @click="deleteItem(id)"
          class="tree-menu_icon tree-menu_icon_delete"
        >
          <IconTrash />
        </div>
      </div>
    </div>

    <tree-menu
      v-for="child in children"
      :id="child.id"
      :type="child.type"
      :children="child.children"
      :name="child.name"
      :depth="depth + 1"
    >
    </tree-menu>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { IconFolder } from "@tabler/icons-vue";
import { IconFile } from "@tabler/icons-vue";
import { IconPencil } from "@tabler/icons-vue";
import { IconTrash } from "@tabler/icons-vue";
import { useTreeStore } from "../store/index.js";
import Modal from "./Modal.vue";

const store = useTreeStore();
const showEditModal = ref(false);
const input_data = ref("");
const edit_input_ref = ref(null);
defineOptions({
  name: "tree-menu",
});
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  children: {
    type: Array,
    required: true,
  },
  depth: {
    type: Number,
    required: true,
  },
});
const indent = computed(() => {
  return { paddingLeft: `${props.depth * 20}px` };
});

function deleteItem(id) {
  store.deleteNode(id);
}
function editItem(id) {
  showEditModal.value = true;
  setTimeout(() => {
    edit_input_ref.value.focus();
  }, 500);
  input_data.value = store.getNameOfNode(id);
}

function saveEdit(id) {
  store.updateNameOfNode(id, input_data.value);
  showEditModal.value = false;
}

function declineEdit() {
  showEditModal.value = false;
}
</script>

<style lang="scss">
.edit_box {
  width: 400px;
  background-color: #fff;
  height: 200px;
  z-index: 3;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid black;
  &__input {
    outline: none;
    font-size: 20px;
    box-shadow: none;
    border-radius: 6px;
    padding: 6px;
    width: 55%;
  }
  &__button_group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 55%;
    margin-top: 4em;
  }
  &__button {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    font-size: 18px;
    padding: 6px 16px;
    border: none;
    color: white;

    &:hover {
      cursor: pointer;
    }
    &_save {
      background-color: #00c853;
    }
    &_decline {
      background-color: #ff1744;
    }
  }
}
.tree-menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;

  &__left {
    display: flex;
    align-items: center;
  }
  &_icon {
    // color: red;
    &:hover {
      cursor: pointer;
    }
    &_edit:hover {
      color: #00c853;
    }
    &_delete:hover {
      color: #ff1744;
    }
  }
}
</style>
