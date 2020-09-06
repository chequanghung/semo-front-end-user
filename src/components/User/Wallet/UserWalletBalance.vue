<template>
  <div class="card-container">
    <!-- prompt -->
    <div class="tile notification is-warning" v-if="wallet.wallet_status === 0">
      <div class="columns is-mobile is-vcentered">
        <div class="column is-narrow">
          <p style="font-size: 18px;">🧐</p>
        </div>
        <div class="column">
          <p>Chúng tôi đang xem xét giấy tờ xác thực của bạn. Nếu được xác nhận, chiếc ví này sẽ toàn quyền là của bạn.</p>
        </div>
      </div>
    </div>
    <!-- balance -->
    <div class="balance">
      <p class="home-section-subtitle">SỐ DƯ HIỆN TẠI</p>
      <p class="home-section-title" style="text-align: center;">{{ formatCurrency(wallet.amount) }}</p>
    </div>
    <!-- button -->
    <div class="columns is-centered is-mobile">
      <div class="column is-narrow">
        <b-button
          type="is-green"
          @click="topUp"
          :disabled="wallet.wallet_status === 0"
        >➕ Nạp tiền vào ví</b-button>
      </div>
    </div>
    <br />
    <!-- deposits and stats -->
    <div class="columns">
      <div class="column">
        <!-- deposit -->
        <div class="tile is-child box">
          <b-loading :is-full-page="false" v-model="isLoading"></b-loading>
          <p class="home-section-title">🧾 Cần thanh toán</p>
          <br />
          <div class="columns is-multiline">
          <div class="column is-half tile is-parent" v-for="(depo, i) in deps.slice(index * 6, (index + 1) * 6)" :key="i">
              <DepositCard :deposit="depo"></DepositCard>
          </div>
          </div>
          <div class="columns is-mobile is-vcentered is-centered">
            <div class="column">
              <b-button v-if="index > 0" @click="back" expanded>👈 Trang trước</b-button>
            </div>
            <div class="column">
              <b-button v-if="index < totalPages - 1 && totalPages > 1" @click="next" expanded>Trang sau 👉</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {
    DepositCard: () => import("./DepositCard"),
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      wallet: (state) => state.wallet.wallet,
      deposit: (state) => state.wallet.deposit,
    }),
    totalPages: function() {
      if (this.deposit.length % 6 > 0) {
        return Math.ceil(this.deposit.length / 6)
      } else {
        return this.deposit.length / 6
      }
    }
  },
  data() {
    return {
      index: 0,
      deps: [],
      isLoading: false,
    }
  },
  async mounted() {
    this.isLoading = true

    this.getw(this.user.id).then(() => {
      this.getd()
      .then(() => {
        this.isLoading = false
      })
    })
  },
  methods: {
    ...mapActions("wallet", ["getw", "getd"]),
    // format currency
    formatCurrency(amount) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    },
    topUp() {
      this.$emit("topup");
    },
    back() {
      --this.index;
      window.scrollTo(0, 400)
    },
    next() {
      ++this.index;
      window.scrollTo(0, 400)
    }
  },
  watch: {
    deposit: function() {
      this.deps = this.deposit
    }
  }
};
</script>

<style scoped>
.balance {
  width: 100%;
  text-align: center !important;
}

.unpaid {
  background-color: red;
}

.paid {
  background-color: green;
}
</style>