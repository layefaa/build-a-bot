import { computed, onMounted } from 'vue';
import usePartStore from '@/stores/partStore';

const partsStore = usePartStore();
export default function useSearch(searchTerm) {
  const allParts = partsStore.part ?
    [
      ...partsStore.part.heads,
      ...partsStore.part.arms,
      ...partsStore.part.torsos,
      ...partsStore.part.bases,
    ] : [];

  const results = computed(() => {
    let searchResults;
    if (!searchTerm.value) searchResults = allParts;
    else {
      const lowerTerm = searchTerm.value.toLowerCase();
      searchResults = allParts.filter(
        (part) => part.title.toLowerCase().includes(lowerTerm),
      );
    }
    return [...searchResults];
  });

  onMounted(() => console.log('Mounted: useSearch'));

  return { searchResults: results };
}
