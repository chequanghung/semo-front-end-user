<template>
  <div class="card-container">
    <div class="content">
      <p class="card-content"><strong>{{ address.address }}</strong></p>
      <p class="card-content">{{ address.ward }}</p>
      <p class="card-content">{{ address.district }}</p>
      <p class="card-content">{{ address.province }}</p>
    </div>
    <div class="columns is-vcentered is-mobile">
      <div class="column">
        <b-tag type="is-success" v-if="address.default_address === 1">Mặc định</b-tag>
      </div>
      <div class="column is-narrow">
        <div class="columns is-vcentered is-mobile is-variable is-2">
          <div class="column">
            <b-button type="is-primary" @click="$emit('edit', address)">🖊️ Chỉnh sửa</b-button>
          </div>
          <div class="column" v-if="address.default_address !== 1">
            <b-button type="is-danger" @click="$emit('delete', address)">🗑️ Xóa</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["address"],
};
</script>

<style scoped>
.card-container {
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 8px #00000016;
  padding: 24px 24px;
}

.card-container:hover {
  box-shadow: 0 4px 16px #00000016;
}

.card-content {
    padding: 0 0 0 6px;
    margin-bottom: 2px !important;
}
</style>