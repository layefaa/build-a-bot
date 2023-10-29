import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/home/HomePage.vue';
import RobotBuilder from '@/build/RobotBuilder.vue';
import ProductSearch from '@/search/ProductSearch.vue';
import PartInfo from '@/parts/PartInfo.vue';

export default createRouter({
  linkActiveClass: 'active-link',
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/build',
      name: 'Build',
      component: RobotBuilder,
    },
    {
      path: '/search',
      name: 'Search',
      component: ProductSearch,
    },
    {
      path: '/part/:partType/:id',
      name: 'PartInfo',
      component: PartInfo,
      props: true,
    },
  ],
});
