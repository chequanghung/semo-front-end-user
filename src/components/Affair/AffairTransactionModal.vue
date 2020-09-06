<template>
  <div class="card-container">
    <p class="home-section-title">💳 Thanh toán</p>
    <br/>
    <!-- content -->
    <form @submit.prevent="transact">
      <!-- seller -->
      <b-field label="Người nhận" label-position="on-border">
        <div class="columns is-mobile is-vcentered" style="margin: 0;">
          <div class="column is-narrow" v-if="affair !== undefined">
            <div
              :style="{backgroundImage: 'url(' + affair.seller.img_url + ')'}"
              style="border-radius: 50%; width: 28px; height: 28px; background-size: cover; background-position: center"
            ></div>
          </div>
          <div class="column">
            <p
              class="home-section-title"
              style="margin-bottom: 0; font-size: 20px;"
            >{{ affair.seller.name }}</p>
          </div>
        </div>
      </b-field>

      <!-- money -->
      <b-field label="Số tiền" label-position="on-border">
        <!-- computed -->
        <b-input disabled expanded :value="formatCurrency(amount)"></b-input>
      </b-field>
      <!-- computed -->
      <div class="notification is-danger is-light" v-if="late">
        <p>😥 Bạn đã trễ hạn chuyển tiền rồi, hãy nộp thêm phí thanh toán muộn cho đối tác nhé.</p>
      </div>

      <!-- submit btn -->
      <b-button type="is-green" expanded native-type="submit">💳 Chuyển tiền</b-button>
    </form>

    <br />
    <!-- wallet -->
    <div class="columns is-mobile">
      <div class="column">
        <div class="columns is-mobile is-vcentered">
          <div class="column is-narrow">
            <p>👛 Ví của bạn:</p>
          </div>
          <div class="column">
            <p>
              <strong>{{ formatCurrency(wallet.amount) }}</strong>
            </p>
          </div>
        </div>
      </div>
      <div class="column is-narrow">
        <router-link to="/user/wallet">NẠP TIỀN</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      affair: (state) => state.affair.affair,
      contract: (state) => state.affair.contract,
      product: (state) => state.affair.product,
      user: (state) => state.user.user,
      wallet: (state) => state.wallet.wallet,
    }),
    amount: function () {
      let baseAmount = this.product.price_cur;

      if (!this.shipment) {
        baseAmount += this.contract.shipment_late_fee || 0;
      }

      if (this.late === true) {
        baseAmount += this.contract.payment_late_fee || 0;
      }

      return baseAmount;
    },
    late: function () {
      return Date.parse(this.contract.payment_date) - Date.now() > 0 ? false : true;
    },
    shipment: function () {
      return this.contract.shipment_user_id === this.user.id ? true : false;
    },
  },
  async mounted() {
    this.getw(this.user.id);
  },
  methods: {
    ...mapActions("affair", ["changec", "payc"]),
    ...mapActions("wallet", ["getw"]),
    transact() {
      if (this.wallet.amount < this.amount) {
        this.$buefy.toast.open({
          type: "is-danger",
          message: "Ví của bạn không đủ tiền để thanh toán. 😪",
        });
      } else if (this.wallet.wallet_status === 0) {
        this.$buefy.toast.open({
          type: "is-danger",
          message: "Ví của bạn chưa được cấp phép để giao dịch. 😪",
        });
      } else {
        this.payc({
          src_wallet_id: this.wallet.id,
          rcv_user_id: this.affair.seller_user_id,
          amount: this.amount,
          notes: `Thanh toan cho giao keo ${this.affair.id}`,
        })
          .then(() => {
            this.change();
          })
          .catch(() => {
            this.$buefy.toast.open({
              type: "is-danger",
              message: `Lỗi rồi, bạn vui lòng thử lại sau nhé. 😟`,
            });
          });
      }
    },
    change() {
      this.changec({
        id: this.contract.id,
        status: "PAY",
      })
        .then(() => {
          this.$buefy.toast.open({
            type: "is-success",
            message: "Tuyệt, bạn đã thanh toán thành công! 😍",
          });

          this.$emit("close");
        })
        .catch((error) => {
          this.$buefy.toast.open({
            type: "is-danger",
            message: `${error.data.message}`,
          });
        });
    },
    formatCurrency(currency) {
        return new Intl.NumberFormat('vi-VN', { currency: 'VND', style: 'currency'}).format(currency)
    }
  },
};
</script>

<style scoped>
.card-container {
  max-width: 640px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px #00000016;
  padding: 40px 24px;
}
</style>