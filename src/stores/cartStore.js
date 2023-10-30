import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const useCartStore = defineStore('parts', () => {
  const cart = ref([]);

  const cartTotal = computed(() => cart.value.reduce((pre, cur) => pre += cur.cost, 0));
  return {
    cart,
    cartTotal,
  };
});
export default useCartStore;
