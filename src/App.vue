<template>
  <header>
    <nav>
      <ul>
        <li class="nav-item">
          <img src="./assets/build-a-bot-logo.png" alt="logo" class="logo"/>
          Build-a-Bot
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <RobotBuilder/>
  </main>

</template>

<script>
import RobotBuilder from '@/build/RobotBuilder.vue';

export default {
  name: 'App',
  components: {
    RobotBuilder,
  },
};
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
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
}

.logo {
  vertical-align: middle;
  height: 30px;
}
</style>
