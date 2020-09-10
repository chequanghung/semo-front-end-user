<template>
  <div class="home">
    <UserTitle :user="user" @feedbacks="viewFeedbacks"></UserTitle>
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
    <!-- money input -->
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
        <b-loading is-full-page v-model="isTopUpLoading"></b-loading>
      </div>
    </b-modal>

    <!-- transaction -->
    <b-modal :active.sync="isMessageModal" trap-focus has-modal-card scroll="keep">
      <div class="modal-card" style="overflow-y: scroll;">
        <p class="home-section-title">👌 Hãy chuyển khoản cho chúng tôi</p>

        <div class="notification is-light is-info">
          <p>💵 Ví của bạn sẽ tăng sau khi semo nhận được tiền chuyển khoản. Hãy nhớ ghi nội dung chuyển khoản như ở dưới để chúng tôi biết bạn là ai nhé.</p>
        </div>

        <!-- money amount -->
        <div class="notification is-light is-success">
          <!-- price -->
          <div class="columns is-mobile">
            <div class="column">
              <p>MÃ GIAO DỊCH</p>
              <p class="deposit-content">{{ requestId }}</p>
            </div>
            <div class="column">
              <p>SỐ TIỀN CẦN NẠP</p>
              <p class="deposit-content">{{ formatCurrency(amount) }}</p>
            </div>
          </div>
        </div>

        <!-- bank info -->
        <div class="tile is-ancestor">
          <div class="tile is-parent is-vertical">
            <div class="tile is-child box">
              <img src="@/assets/Techcombank_logo.png" style="height: 40px;" />
              <p>
                <strong>Ngân hàng TMCP Kỹ Thương Việt Nam - Techcombank</strong>
              </p>
              <p>Phòng giao dịch Trần Đăng Ninh - chi nhánh Hoàng Quốc Việt - TP Hà Nội</p>
              <hr />
              <p>
                Số tài khoản:
                <strong>19130401201019</strong>
              </p>
              <p>
                Chủ tài khoản:
                <strong>CONG TY TNHH DICH VU SEMO</strong>
              </p>
              <p>
                Nội dung:
                <strong>{{ user.phone }} NAP TIEN {{ requestId }}</strong>
              </p>
            </div>
            <div class="tile is-child box">
              <img src="@/assets/sacombank-logo.png" style="height: 40px;" />
              <p>
                <strong>Ngân hàng TMCP Sài Gòn Thương Tín - Sacombank</strong>
              </p>
              <p>Chi nhánh Đông Đô - TP Hà Nội</p>
              <hr />
              <p>
                Số tài khoản:
                <strong>020042439399</strong>
              </p>
              <p>
                Chủ tài khoản:
                <strong>CONG TY TNHH DICH VU SEMO</strong>
              </p>
              <p>
                Nội dung:
                <strong>{{ user.phone }} NAP TIEN {{ requestId }}</strong>
              </p>
            </div>
            <div class="tile is-child box">
              <img src="@/assets/vietcombank-logo.png" style="height: 40px;" />
              <p>
                <strong>Ngân hàng TMCP Ngoại thương Việt Nam - Vietcombank</strong>
              </p>
              <p>Chi nhánh Thăng Long - TP Hà Nội</p>
              <hr />
              <p>
                Số tài khoản:
                <strong>0491001700825</strong>
              </p>
              <p>
                Chủ tài khoản:
                <strong>CONG TY TNHH DICH VU SEMO</strong>
              </p>
              <p>
                Nội dung:
                <strong>{{ user.phone }} NAP TIEN {{ requestId }}</strong>
              </p>
            </div>
            <div class="tile is-child box">
              <img src="@/assets/achaubank-logo.png" style="height: 40px;" />
              <p>
                <strong>Ngân hàng TMCP Á Châu - ACB</strong>
              </p>
              <p>PGD Trần Quốc Hoàn - TP Hà Nội</p>
              <hr />
              <p>
                Số tài khoản:
                <strong>85885588</strong>
              </p>
              <p>
                Chủ tài khoản:
                <strong>CONG TY TNHH DICH VU SEMO</strong>
              </p>
              <p>
                Nội dung:
                <strong>{{ user.phone }} NAP TIEN {{ requestId }}</strong>
              </p>
            </div>
          </div>
        </div>

        <!-- last  -->
        <b-button type="is-green" @click="isMessageModal = false">💳 Tôi đã chuyển khoản xong!</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import uniqid from "uniqid";

export default {
  name: "UserInfo",
  components: {
    UserTitle: () => import("@/components/User/UserTitle"),
    PageSubtitle: () => import("@/components/PageSubtitle"),
    UserMenu: () => import("@/components/User/UserMenu"),
    UserWalletBalance: () =>
      import("@/components/User/Wallet/UserWalletBalance"),
    UserWalletTransaction: () =>
      import("@/components/User/Wallet/UserWalletTransaction"),
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
      isMessageModal: false,
      isTopUpLoading: false,
      requestId: "",
    };
  },
  methods: {
    ...mapActions("wallet", ["addm"]),
    changeSideIndex(index) {
      this.index = index;
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
    },
    topUp() {
      this.isAddModal = true;
      this.amount = 150000
    },
    submitTopUp() {
      this.requestId = uniqid.process();
      this.isTopUpLoading = true

      this.addm({
        id: this.requestId,
        amount: this.amount,
      })
        .then((response) => {
          this.isAddModal = false;
          this.isMessageModal = true;

          this.$buefy.toast.open({
            type: "is-success",
            message: `${response.data.message}`,
            position: "is-top",
          });
        })
        .catch((error) => {
          this.$buefy.toast.open({
            type: "is-danger",
            message: `${error.response.data.message}`,
            position: "is-top",
          });
        })
        .finally(() => {
          this.isTopUpLoading = false
        })
    },
    viewFeedbacks() {
      this.$emit('feedbacks')
    }
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

.deposit-content {
  font-weight: 900;
  font-size: 24px;
}
</style>