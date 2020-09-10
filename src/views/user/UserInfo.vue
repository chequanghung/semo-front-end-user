<template>
  <div class="home">
    <UserTitle :user="user" @feedbacks="viewFeedbacks"></UserTitle>
    <PageSubtitle :menus="menus"></PageSubtitle>

    <!-- content -->
    <div class="container" style="padding: 0;">
      <!-- menu -->
      <br />
      <br />
      <div class="columns is-variable is-4">
        <div class="column is-one-fifth">
          <UserMenu :index="index" :menus="sideMenus" @click="changeSideIndex"></UserMenu>
        </div>
        <!-- cards -->
        <div class="column is-four-fifths">
          <!-- info -->
          <transition name="router-view-transition">
            <UserInfoCard v-if="index === 1"></UserInfoCard>
            <!-- address -->
            <UserAddressCard v-if="index === 2"></UserAddressCard>
            <!-- identity -->
            <UserIdentityCard v-if="index === 3"></UserIdentityCard>
            <!-- password -->
            <UserPasswordCard v-if="index === 4"></UserPasswordCard>
          </transition>
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
    // cards
    UserInfoCard: () => import("@/components/User/Info/UserInfoCard"),
    UserAddressCard: () => import("@/components/User/Info/UserAddressCard"),
    UserIdentityCard: () => import("@/components/User/Info/UserIdentityCard"),
    UserPasswordCard: () => import("@/components/User/Info/UserPasswordCard"),
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
          name: "📜 Hồ sơ",
          index: 1,
        },
        {
          name: "🏡 Địa chỉ",
          index: 2,
        },
        {
          name: "🎫 Xác thực",
          index: 3,
        },
        {
          name: "🔑 Mật khẩu",
          index: 4,
        },
      ],
      index: 1,
    };
  },
  methods: {
    changeSideIndex(index) {
      this.index = index;
    },
    viewFeedbacks() {
      this.$emit('feedbacks')
    }
  },
};
</script>

<style>
</style>