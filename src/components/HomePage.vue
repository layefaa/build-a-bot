<template>
  <div class="home">
    <div><img src="../assets/robot-home.png" alt="robot" aria-hidden="true" class="robot"></div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  text-align: center;
}
</style>
