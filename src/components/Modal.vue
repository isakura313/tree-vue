<template>
  <Teleport to="body" class="modal">
    <Transition name="bounce">
      <template v-if="show">
        <slot></slot>
      </template>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const $emits = defineEmits(["close"]);
</script>

<style lang="scss">
.modal {
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 0;

  &,
  &-mask {
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }

  &-mask {
    position: absolute;
    z-index: -1;
    background: rgba(0, 0, 0, 0.6);
  }
}
</style>
