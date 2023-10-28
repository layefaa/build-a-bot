<script setup>
import { ref } from 'vue';

const open = ref(true);

</script>

<template>
  <div>
    <div class="header">
      <span v-if="open" @keydown="open = !open" @click="open = !open">&#x25B2; Collapse</span>
      <span v-if="!open" @keydown="open = !open" @click="open = !open">&#x25BC; Expand </span>
    </div>
    <slot v-if="open"/>
  </div>

</template>

<style scoped>
.header {
  background-color: #bbb;
  padding: 3px;
  cursor: pointer;
  font-size: 22px;
}

</style>
