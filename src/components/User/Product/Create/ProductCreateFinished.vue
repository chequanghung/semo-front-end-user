<template>
  <div class="splash-container">
    <p>Mã sản phẩm: {{ product_id }}</p>
    <b-button type='is-primary' tag='router-link' to='/user/product'>✔️ Hoàn tất</b-button>
  </div>
</template>

<script>
export default {
  props: ["product_id"],
};
</script>

<style>
</style>