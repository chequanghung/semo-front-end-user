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
        <div class="image is-96x96" style="margin: 0 auto 16px auto;">
          <img class="is-rounded" :src="fruit.icon_url" />
        </div>
        <p class="card-info-title" style="text-transform: uppercase;">{{ fruit.title }}</p>
      </div>
    </div>

    <!-- show all -->
    <b-button outlined rounded @click="$router.push({ path: '/fruit' })">📰 Xem thêm</b-button>
  </div>
</template>

<script>
export default {
  name: "FruitGridList",
  props: ["title", "fruits"],
};
</script>

<style scoped>
.fruit {
  cursor: pointer;
  transition: .25s;
}

.fruit:hover {
  color: #01d28e;
  text-decoration: underline;
}
</style>