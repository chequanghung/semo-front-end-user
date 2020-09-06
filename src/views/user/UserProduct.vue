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
              <b-input v-model="keyword" placeholder="🔍 Tìm kiếm sản phẩm" expanded rounded></b-input>
            </div>
            <div class="column is-narrow">
              <b-button type="is-green" rounded tag="router-link" to="/create">➕ Tạo sản phẩm mới</b-button>
            </div>
          </div>

          <!-- 404 -->
          <div class="container" v-if="product_list.length === 0">
            <div class="columns is-centered">
              <div class="column is-narrow">
                <p style="font-size: 70px; text-align: center;">🤷‍♂️</p>
                <br />
                <p
                  style="font-size: 20px; text-align: center;"
                >Úi, ở đây chưa có gì cả.</p>
              </div>
            </div>
          </div>

          <!-- products -->
          <div>
            <transition-group name="enlist" class="columns is-variable is-2 is-multiline">
              <div
                class="product column is-full-mobile is-full-tablet is-half-desktop is-half-widescreen is-half-fullhd"
                v-for="product in product_list"
                :key="product.id"
              >
                <ProductCard
                  :item="product"
                  @edit="editProduct"
                  @delete="deleteProduct"
                  @create="createAuction"
                  @auction="intoAuction"
                  @affair="intoAffair"
                  @restore="restoreProduct"
                ></ProductCard>
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
    keyword: function () {
      this.keyword !== ""
        ? (this.product_list = this.product_list.filter(
            (item) =>
              item.title.toLowerCase().indexOf(this.keyword.toLowerCase()) >= 0
          ))
        : (this.product_list = this.products);
    },
    products: function () {
      this.product_list = this.products;
    },
  },
  async mounted() {
    this.populate();
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
      // product
      product_list: [],
      // search
      keyword: "",
    };
  },
  methods: {
    ...mapActions("product", [
      "gets",
      "deletep",
      "restorep",
      "createa",
      "createaclosure",
    ]),

    changeSideIndex(index) {
      this.index = index;
    },
    populate() {
      this.gets(this.index).then(() => {
        this.keyword = "";
        this.product_list = this.products;
      });
    },
    // for product
    editProduct(product) {
      console.log(product);
    },
    deleteProduct(product) {
      let vm = this;

      this.$buefy.dialog.confirm({
        message: "Bạn chắc chắn muốn xóa sản phẩm này chứ? 😧",
        onConfirm: function () {
          vm.deletep(product)
            .then(() => {
              vm.$buefy.toast.open({
                type: "is-success",
                position: "is-top",
                message: "Sản phẩm đã được đưa đến thư mục đã xóa. 🗑️",
              });
            })
            .catch(() => {
              vm.$buefy.toast.open({
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
    // for auction
    createAuction(item) {
      // create auction
      this.createa(item)
        .then(() => {
          this.createaclosure(item)
            .then(() => {
              this.$buefy.toast.open({
                message: "Tạo buổi đấu giá thành công. 😋",
                type: "is-success",
                position: "is-top",
              });

              this.populate();
            })
            .catch((error) => {
              let prompt = error.response.data.message;

              if (prompt.startsWith("Unknown column")) {
                prompt = prompt.substr(prompt.indexOf(`'`) + 1);
                prompt = prompt.substr(0, prompt.indexOf(`'`) - 1);
              }
              this.$buefy.toast.open({
                message: `${prompt} 😪`,
                type: "is-danger",
                position: "is-top",
              });
            });
        })
        .catch((error) => {
          let prompt = error.response.data.message;

          if (prompt.startsWith("Unknown column")) {
            prompt = prompt.substr(prompt.indexOf(`'`) + 1);
            prompt = prompt.substr(0, prompt.indexOf(`'`) - 1);
          }
          this.$buefy.toast.open({
            message: `${prompt} 😪`,
            type: "is-danger",
            position: "is-top",
          });
        });
    },
    intoAuction(item) {
      this.$router.push({
        name: "Auction",
        params: { id: item.Auctions[0].id },
      });
    },
    // for affair
    intoAffair(item) {
      this.$router.push({ name: "Affair", params: { id: item.Affairs[0].id } });
    },
    // for deleted product
    restoreProduct(product) {
      let vm = this;

      this.$buefy.dialog.confirm({
        message: "Bạn chắc chắn muốn khôi phục sản phẩm này chứ? 🤗",
        onConfirm: function () {
          vm.restorep(product)
            .then(() => {
              vm.$buefy.toast.open({
                type: "is-success",
                position: "is-top",
                message: "Sản phẩm đã được đưa khôi phục và chờ kiểm duyệt. 🔄",
              });
            })
            .catch(() => {
              vm.$buefy.toast.open({
                type: "is-danger",
                position: "is-top",
                message: "Úi, hãy thử lại sau nhé. 😪",
              });
            });
        },
        cancelText: "Không, tôi đổi ý rồi.",
        type: "is-info",
        confirmText: "🔄 Khôi phục",
      });
    },
  },
};
</script>

<style scoped>
.enlist-enter-to {
  opacity: 0;
  animation: zoomIn;
  animation-duration: 0.35s;
  animation-delay: 0.25s;
}

.enlist-leave-to {
  animation: zoomOut;
  animation-duration: 0.2s;
}
</style>