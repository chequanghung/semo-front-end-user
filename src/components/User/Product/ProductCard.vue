<template>
  <div class="card-container">
    <div class="columns is-vcentered is-mobile">
      <div class="column is-narrow">
        <div
          class="product-thumbnail image is-96x96"
          :style="{backgroundImage: 'url(' + product.ProductMedia[0].media_url + ')'}"
        ></div>
      </div>
      <div class="column">
        <p class="card-title">{{ product.title }}</p>
        <!-- price -->
        <div class="card-info">
          <p class="card-info-title">Giá hiện tại</p>
          <p class="card-info-content major">{{ product.price_cur }}</p>
        </div>
        <!-- brief info -->
        <p class="card-info-title">{{ product.weight }} tạ | {{ product.Address.province }}</p>
      </div>
    </div>

    <div class="columns is-vcentered is-mobile">
      <div class="column">
        <p class="card-info-subtle">{{ product.date_created }}</p>
      </div>
      <div class="column is-narrow">
        <div class="columns is-variable is-1 is-mobile">
          <div class="column is-narrow">
            <b-button type="is-primary" @click="editProduct">🖊️ Chỉnh sửa</b-button>
          </div>
          <div class="column is-narrow">
            <b-button type="is-danger" @click="deleteProduct">🗑️ Xóa</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  methods: {
      editProduct() {
          this.$emit('edit', this.product)
      },
      deleteProduct() {
          this.$emit('delete', this.product)
      }
  }
};
</script>

<style scoped>
.card-container {
  background-color: white;
  box-shadow: 0 2px 8px #00000016;
  padding: 16px;
  border-radius: 10px;
  transition: 0.25s;
}

.card-container:hover {
  box-shadow: 0 4px 16px #00000016;
}

.card-title {
  font-weight: 800;
  font-size: 18px;
  height: 60px;
}

.product-thumbnail {
  border-radius: 10px;
  background-size: cover;
  background-position: center;
}

.card-info {
  padding: 8px 0;
}

.card-info-title {
  color: #707070;
  font-size: 15px;
}

.card-info-content {
  font-size: 17px;
  font-weight: 900;
  color: #707070;
}

.card-info-subtle {
  font-size: 12px;
}
</style>