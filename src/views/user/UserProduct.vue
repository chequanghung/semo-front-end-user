<template>
  <div class="home">
    <UserTitle :user="user"></UserTitle>
    <PageSubtitle :menus="menus"></PageSubtitle>

    <!-- content -->
    <div class="container" style="padding: 0;">
      <!-- menu -->
      <br />
      <br />
      <div class="columns is-variable is-4 is-centered">
        <div class="column is-one-fifth">
          <UserMenu :index="index" :menus="sideMenus" @click="changeSideIndex"></UserMenu>
        </div>
        <div class="column">
          <!-- search bar -->
          <div class="columns is-variable is-2 is-mobile is-centered">
            <div class="column">
              <b-input placeholder="🔍 Tìm kiếm sản phẩm" expanded rounded></b-input>
            </div>
            <div class="column is-narrow">
              <b-button type="is-primary" rounded tag="router-link" to="/create">➕ Tạo sản phẩm mới</b-button>
            </div>
          </div>

          <!-- products -->
          <div>
            <transition-group name="enlist" class="columns is-variable is-2 is-multiline">
              <div
                class="product column is-full-mobile is-full-tablet is-half-desktop is-half-widescreen is-one-third-fullhd"
                v-for="product in products"
                :key="product.id"
              >
                <ProductCard :product="product" @edit="editProduct" @delete="deleteProduct"></ProductCard>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "UserInfo",
  components: {
    UserTitle: () => import("@/components/User/UserTitle"),
    PageSubtitle: () => import("@/components/PageSubtitle"),
    UserMenu: () => import("@/components/User/UserMenu"),
    ProductCard: () => import("@/components/User/Product/ProductCard"),
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      products: (state) => state.product.products,
    }),
  },
  watch: {
    index: function () {
      this.populate();
    },
  },
  mounted() {
    this.gets(this.index);
  },
  data() {
    return {
      menus: [
        {
          url: "/user/info",
          title: "📝 Thông tin cá nhân",
        },
        {
          url: "/user/product",
          title: "📦 Sản phẩm bạn đăng",
        },
        {
          url: "/user/bid",
          title: "🛒 Sản phẩm bạn mua",
        },
        {
          url: "/user/wallet",
          title: "👛 Ví của bạn",
        },
      ],
      sideMenus: [
        {
          name: "⚠️ Cần chỉnh sửa",
          index: 0,
        },
        {
          name: "⏲️ Chờ kiểm duyệt",
          index: 1,
        },
        {
          name: "✅ Đã kiểm duyệt",
          index: 2,
        },
        {
          name: "💸 Đang đấu giá",
          index: 3,
        },
        {
          name: "🤝 Đang giao kèo",
          index: 4,
        },
        {
          name: "💰 Đã bán",
          index: 5,
        },
        {
          name: "🗑️ Đã xóa",
          index: 9,
        },
      ],
      index: 0,
    };
  },
  methods: {
    ...mapActions("product", ["gets", "deletep"]),
    changeSideIndex(index) {
      this.index = index;
    },
    populate() {
      this.gets(this.index);
    },
    // for product
    editProduct(product) {
      console.log(product);
    },
    deleteProduct(product) {
      this.$buefy.dialog.confirm({
        message: "Bạn chắc chắn muốn xóa sản phẩm này chứ? 😧",
        onConfirm: function () {
          this.deletep(product)
            .then(() => {
              this.$buefy.toast.open({
                type: "is-success",
                position: "is-top",
                message: "Sản phẩm đã được đưa đến thư mục đã xóa. 🗑️",
              });
            })
            .catch(() => {
              this.$buefy.toast.open({
                type: "is-danger",
                position: "is-top",
                message: "Úi, hãy thử lại sau nhé. 😪",
              });
            });
        },
        cancelText: "Không, tôi đổi ý rồi.",
        type: "is-danger",
        confirmText: "🗑️ Xóa",
      });
    },
  },
};
</script>

<style scoped>
.enlist-enter-to {
  opacity: 0;
  animation: zoomIn;
  animation-duration: .35s;
  animation-delay: .25s;
}

.enlist-leave-to {
  animation: zoomOut;
  animation-duration: .2s;
}

</style>