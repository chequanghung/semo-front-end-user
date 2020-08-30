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

          <!-- products -->
          <div>
            <transition-group name="enlist" class="columns is-variable is-2 is-multiline">
              <div
                class="product column is-full-mobile is-full-tablet is-half-desktop is-half-widescreen is-one-third-fullhd"
                v-for="product in product_list"
                :key="product.id"
              >
                <ProductCard
                  :item="product"
                  @auction="intoAuction"
                  @affair="intoAffair"
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
import { mapState } from "vuex";

export default {
  name: "UserInfo",
  components: {
    UserTitle: () => import("@/components/User/UserTitle"),
    PageSubtitle: () => import("@/components/PageSubtitle"),
    UserMenu: () => import("@/components/User/UserMenu"),
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
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
          name: "💰 Đã bán",
          index: 5,
        },
      ],
      index: 3,
      keyword: '',
      product_list: [],
    };
  },
  methods: {
      changeSideIndex(index) {
      this.index = index;
    },
  },
};
</script>

<style>
</style>