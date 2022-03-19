import locations from '@/assets/locations.json';
import { ref, computed } from 'vue';
export default () => {
  const areaSelected = ref('North');
  const countiesList = computed(() => locations[areaSelected.value]);
  const countySelected = ref('Taipei')
  return {
    areaSelected,
    countiesList,
    countySelected
  }
}