<template>
  <div class="home">
    <UserTitle :user="user"></UserTitle>
    <PageSubtitle :menus="menus"></PageSubtitle>

    <div class="container" style="padding: 0;">
      <!-- menu -->
      <br />
      <br />
      <div class="columns is-variable is-4 is-centered">
        <div class="column is-one-fifth">
          <UserMenu :index="index" :menus="sideMenus" @click="changeSideIndex"></UserMenu>
        </div>
        <div class="column">
          <transition name="router-view-transition">
            <UserWalletBalance v-if="index === 1" @topup="topUp"></UserWalletBalance>
            <UserWalletTransaction v-if="index === 2"></UserWalletTransaction>
          </transition>
        </div>
      </div>
    </div>

    <!-- modal -->
    <b-modal :active.sync="isAddModal" trap-focus has-modal-card>
      <div class="modal-card">
        <p class="home-section-title">➕ Nạp tiền vào ví</p>
        <br />
        <b-field label="Số tiền muốn nạp" label-position="on-border">
          <b-numberinput type="is-green" min="150000" max="500000000" step="1000" v-model="amount"></b-numberinput>
        </b-field>

        <div class="tile is-warning is-light notification">
          <div class="columns is-mobile is-vcentered" style="text-align: left">
            <div class="column is-narrow">
              <p>💡</p>
            </div>
            <div class="column">
              <p>Chúng minh chỉ nhận tiền từ 150 ngàn đến 500 triệu đồng thôi nha. 🤩</p>
            </div>
          </div>
        </div>
        <b-button type="is-green" @click="submitTopUp" :disabled="isDisabled">💳 Nạp tiền</b-button>
      </div>
    </b-modal>
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
    UserWalletBalance: () =>
      import("@/components/User/Wallet/UserWalletBalance"),
      UserWalletTransaction: () => import('@/components/User/Wallet/UserWalletTransaction')
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),

    isDisabled: function () {
      if (this.amount < 150000 || this.amount > 500000000) {
        return true;
      } else {
        return false;
      }
    },
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
          name: "💰 Số dư",
          index: 1,
        },
        {
          name: "🧾 Lịch sử giao dịch",
          index: 2,
        },
      ],
      index: 1,
      amount: 150000,
      isAddModal: false,
    };
  },
  methods: {
    ...mapActions("wallet", ["addm"]),
    changeSideIndex(index) {
      this.index = index;
    },
    topUp() {
      this.isAddModal = true;
    },
    submitTopUp() {
      this.addm(this.amount).then((response) => {
        this.amount = 150000;
        this.isAddModal = false;

        this.$buefy.toast.open({
          type: "is-success",
          message: `${response.data.message}`,
          position: "is-top",
        });
      }).catch(error => {
          this.$buefy.toast.open({
          type: "is-danger",
          message: `${error.response.data.message}`,
          position: "is-top",
        });
      });
    },
  },
};
</script>

<style scoped>
.modal-card {
  background-color: white;
  padding: 24px;
  border-radius: 10px;
  /* width: 480px; */
}
</style>