import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const useCartStore = defineStore('cart', () => {
  const cart = ref([]);
  // eslint-disable-next-line
  const cartTotal = computed(() => cart.value.reduce((pre, cur) => pre += cur.cost, 0));
  return {
    cart,
    cartTotal,
  };
});
export default useCartStore;
