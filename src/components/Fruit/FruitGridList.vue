<template>
  <div class="container">
    <p class="home-section-title">{{ title }}</p>
    <!-- list -->
    <div class="columns is-vcentered is-centered is-multiline is-mobile" style="padding: 16px 0;">
      <div
        class="fruit column is-one-third-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen is-2-fullhd"
        v-for="fruit in fruits"
        :key="fruit.id"
        @click="$router.push({ name: 'FruitView', params: { id: fruit.id } })"
      >
        <div
        :style="{backgroundImage: 'url(' + fruit.icon_url + ')'}"
        style="height: 96px; width: 96px; margin: 0 auto 16px auto; background-size: cover; background-position: center; border-radius: 50%;">
          <!-- <img class="is-rounded" :src="fruit.icon_url" /> -->
        </div>
        <p
          class="card-info-title"
          style="text-transform: uppercase; text-align: center;"
        >{{ fruit.title }}</p>
      </div>
    </div>

    <!-- show all -->
    <div class="columns is-mobile is-centered" v-if="notHome === undefined">
      <div class="column is-narrow">
        <b-button outlined rounded @click="$router.push({ path: '/fruit' })">📰 Xem thêm</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FruitGridList",
  props: ["title", "fruits", 'notHome'],
};
</script>

<style scoped>
.fruit {
  cursor: pointer;
  transition: 0.25s;
}

.fruit:hover {
  color: #01d28e;
  text-decoration: underline;
}
</style>