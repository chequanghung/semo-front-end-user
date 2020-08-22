<template>
  <div class="splash-container">
    <div class="splash-content">
      <p class="home-section-title">Sản phẩm bạn đang có là gì?</p>
      <!-- option -->
      <div class="columns is-centered is-mobile">
        <div
          class="column is-half-mobile is-4-tablet is-3-desktop is-3-widescreen is-2-fullhd"
          v-for="type in types"
          :key="type.value"
        >
          <div class="card-container" :class="{'selected' : type.value === product_type}">
            <ProductTypeButton :type="type" @select="changeType"></ProductTypeButton>
          </div>
        </div>
      </div>
      <br />
      <!-- submit -->
      <div class="columns is-centered">
        <b-button
          :type="product_type === '' ? 'is-light' : 'is-primary'"
          @click="submit"
          :disabled="product_type === ''"
        >👉 Tiếp tục</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ProductTypeButton: () => import("./ProductTypeButton"),
  },
  data() {
    return {
      product_type: "",
      //   types
      types: [
        {
          icon: "🌳",
          title: "Vườn cây",
          description: "Bạn muốn tìm con buôn cho vườn trồng của bạn",
          value: 1,
        },
        {
          icon: "🍑",
          title: "Trái cây",
          description: "Bạn tìm người mua cho lô nông sản đã thu hoạch",
          value: 2,
        },
      ],
    };
  },
  methods: {
    submit() {
      this.$emit("next", this.product_type);
    },
    changeType(value) {
      this.product_type = value;
    },
  },
};
</script>

<style scoped>
.home-section-title {
  text-align: center;
  color: #01d28e;
}

.splash-container {
  text-align: center;
}

.splash-content {
  align-self: center;
}

.card-container {
  box-shadow: 0 2px 8px #00000016;
  background-color: white;
  padding: 24px;
  border-radius: 10px;
  transition: 0.125s;
  cursor: pointer;
}

.card-container:hover {
  box-shadow: 0 4px 16px #00000016;
}

.selected {
  background-color: #01d28e;
  box-shadow: 0 4px 16px #01d28e59;
}
</style>