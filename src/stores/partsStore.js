import { defineStore } from 'pinia';
import { ref } from 'vue';

const usePartsStore = defineStore('parts', () => {
  const part = ref(null);
  const getParts = async () => {
    const response = await fetch('/api/parts');
    part.value = await response.json();
  };

  return {
    part,
    getParts,
  };
});

export default usePartsStore;
