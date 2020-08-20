<template>
  <div class="bar-container">
    <div class="subtitle-bar columns is-vcentered is-centered is-variable is-5">
      <div class="column is-narrow" v-for="(menu, i) in menus" :key="i">
        <router-link class="router-link" :to="menu.url">{{ menu.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["menus"]
};
</script>

<style scoped>
.bar-container {
  margin: 0 auto;
  padding: 0;
  width: 100%;
  /* position: sticky; */
  top: 68px;
  z-index: 1;
  background-color: #ffffff94;
  backdrop-filter: saturate(180%) blur(20px);
}

.subtitle-bar {
  margin: 0 auto;
  padding: 0;
}

.router-link {
  font-family: 'Merriweather';
  font-weight: 900;
  color: #707070;
  opacity: 0.5;
}

.router-link-exact-active {
  color: #01d28e;
  opacity: 1;
  padding-bottom: 12px;
  border-bottom: 3px solid #01d28e;
}
</style>