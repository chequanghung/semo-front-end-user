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
          </div>

          <!-- 404 -->
          <div class="container" v-if="product_list.length === 0">
            <div class="columns is-centered">
              <div class="column is-narrow">
                <p style="font-size: 70px; text-align: center;">🤷‍♂️</p>
                <br />
                <p style="font-size: 20px; text-align: center;">Úi, ở đây chưa có gì cả.</p>
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
                <BidBoughtCard :item="product" @auction="intoAuction" @affair="intoAffair"></BidBoughtCard>
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
    BidBoughtCard: () => import("@/components/User/Product/BidBoughtCard"),
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      products: (state) => state.product.products,
    }),
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
          name: "💸 Đang đấu giá",
          index: 3,
        },
        {
          name: "🤝 Đang giao kèo",
          index: 4,
        },
        {
          name: "💰 Đã mua",
          index: 5,
        },
      ],
      index: 3,
      keyword: "",
      product_list: [],
    };
  },
  watch: {
    index: function () {
      this.populate();
    },
    keyword: function () {
      this.keyword !== ""
        ? (this.product_list = this.product_list.filter(
            (item) =>
              item.Product.title
                .toLowerCase()
                .indexOf(this.keyword.toLowerCase()) >= 0
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
  methods: {
    ...mapActions("product", ["getbs"]),

    populate() {
      this.getbs(this.index).then(() => {
        this.keyword = "";
        this.product_list = this.products;
      });
    },
    changeSideIndex(index) {
      this.index = index;
    },
    intoAuction(info) {
      this.$router.push({ name: "Auction", params: { id: info.id } });
    },
    intoAffair(info) {
      this.$router.push({ name: "Affair", params: { id: info.id } });
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