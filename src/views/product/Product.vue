<template>
  <div class="page-container">
    <div class="bar-container">
      <div class="title-bar columns is-vcentered is-mobile" style="padding: 20px;">
        <div class="column is-2">
          <b-button type="is-danger" @click="cancel" outlined>❌ Hủy</b-button>
        </div>
        <div class="column">
          <p class="title-bar-title">Tạo sản phẩm mới</p>
        </div>
        <div class="column is-2"></div>
      </div>
    </div>
    <div class="container columns is-vcentered is-mobile" style="margin: 0 auto;">
      <div class="column is-full" v-if="index === 1">
        <ProductType @next="submitType"></ProductType>
      </div>
      <div class="column is-full" v-if="index === 2">
        <ProductCreate @submit="addProduct"></ProductCreate>
      </div>
      <div class="column is-full" v-if="index === 3">
        <ProductCreateFinished :product_id="product_id"></ProductCreateFinished>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

import ProductType from "@/components/User/Product/Create/ProductType";
export default {
  components: {
    ProductType,
    ProductCreate: () =>
      import("@/components/User/Product/Create/ProductCreate"),
    ProductCreateFinished: () =>
      import("@/components/User/Product/Create/ProductCreateFinished"),
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  data() {
    return {
      index: 1,
      product_type: "",
      product_id: "",
    };
  },
  methods: {
    submitType(type) {
      ++this.index;
      this.product_type = type;
    },
    async addProduct(product) {
      axios
        .post(`/product/`, {
          user_id: this.user.id,
          fruit_id: product.fruit_id,
          address_id: product.address_id,
          title: product.title,
          weight: product.weight,
          fruit_pct: product.fruit_pct,
          sugar_pct: product.sugar_pct,
          weight_avg: product.weight_avg,
          diameter_avg: product.diameter_avg,
          price_init: product.price_init,
          price_step: product.price_step,
          product_type: this.product_type,
        })
        // added successfully
        .then((response) => {
          // get product_id
          let product_id = response.data.id;

          // put image to db
          Promise.all(
            product.media.map((item) => {
              return axios.post(`/product/productMedia`, {
                product_id: product_id,
                media_url: item,
              });
            })
          )
            .then(() => {
              // success toast
              this.$buefy.toast.open({
                type: "is-success",
                position: "is-top",
                message: "Đã đăng sản phẩm thành công. 😎",
              });

              // redirect to my product page
              this.index = 3;
            })
            .catch((error) => {
              console.info(error);
              this.$buefy.toast.open({
                type: "is-danger",
                position: "is-top",
                message: "Ối, lỗi rồi. Chờ chút rồi thử lại nhé! 😪",
              });
            });
        })
        .catch((error) => {
          console.info(error);
          this.$buefy.toast.open({
            type: "is-danger",
            position: "is-top",
            message: "Ối, lỗi rồi. Chờ chút rồi thử lại nhé! 😪",
          });
        });
    },
    cancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.page-container {
  min-height: 100vh;
}

.container {
  margin-top: 0;
  margin-bottom: 0;
  min-height: calc(100vh - 68px);
}

.bar-container {
  margin: 0 auto;
  padding: 0;
  width: 100%;
  position: sticky;
  top: 0px;
  z-index: 1;
  background-color: #ffffff94;
  backdrop-filter: saturate(180%) blur(20px);
}

.title-bar {
  margin: 0 auto;
  transition: 0.12s;
  height: 68px;
  max-width: 1366px;
}

.title-bar-title {
  font-size: 25px;
  font-weight: 900;
  color: #01d28e;
  padding-bottom: 4px;
  text-align: center;
}
</style>