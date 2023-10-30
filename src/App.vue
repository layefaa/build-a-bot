<template>
  <header>
    <nav>
      <ul>
        <li class="nav-item">
          <router-link :to="{name: 'Home'}" class="nav-link">
            <img src="./assets/build-a-bot-logo.png" alt="logo" class="logo"/>
            Build-a-Bot
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'Build'}" class="nav-link">
            Build
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'Search'}" class="nav-link">
            Search
          </router-link>
        </li>
        <li class="nav-item nav-cart">
          <router-link :to="{name: 'Cart'}" class="nav-link">

            Cart
            <sup>{{cartStore.cart.length}}</sup>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <router-view></router-view>
  </main>

</template>

<script setup>
import { provide, ref } from 'vue';
import useCartStore from '@/stores/cartStore';

const cartStore = useCartStore();

const userName = ref('Martin');
provide('username', userName);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  background: #999;
  width: 1460px;
  margin: 0 auto;
}

ul {
  padding: 3px;
  display: flex;
}

.nav-item {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  font-size: 22px;
}

.nav-link {
  text-decoration: none;
  color: inherit;
}

.logo {
  vertical-align: middle;
  height: 30px;
}

.active-link {
  color: white;
}
</style>
