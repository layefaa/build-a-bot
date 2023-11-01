<script setup>
import { computed } from 'vue';
import usePartStore from '@/stores/partStore';

const partsStore = usePartStore();

const props = defineProps(['partType', 'id']);
const part = computed(() => partsStore.part[props.partType].find((p) => p.id === +props.id));

</script>

<template>
  <div>
    <h1>{{ part.title }}</h1>
    <div>{{ part.description }}</div>
  </div>

</template>

<style scoped>

</style>
