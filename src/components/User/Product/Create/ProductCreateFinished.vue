<template>
  <div class="splash-container">
    <img src="@/assets/Illustration.png">
    <p class="home-section-title">Sản phẩm của bạn đã được tạo thành công!</p>
    <p>Mã sản phẩm: {{ product_id }}</p>
    <b-button type='is-primary' tag='router-link' to='/user/product'>✔️ Hoàn tất</b-button>
  </div>
</template>

<script>
export default {
  props: ["product_id"],
};
</script>

<style scoped>

</style>