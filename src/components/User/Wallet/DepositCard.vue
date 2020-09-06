<template>
  <div
    class="tile notification is-child is-light"
    style="padding-right: 24px;"
    :class="{'is-primary': deposit.user_status === 0 && warning === false, 'is-success': deposit.user_status === 1, 'is-danger': deposit.user_status === 0 && warning === true}"
  >
    <!-- title -->
    <p
      class="deposit-section-title"
      v-if="deposit.notes === 'Tien coc cho giao keo' && deposit.user_status === 0"
    >🤝 Trả tiền cọc cho giao kèo</p>
    <p
      class="deposit-section-title"
      v-if="deposit.notes === 'Tien coc cho giao keo' && deposit.user_status === 1"
    >🤗 Cảm ơn bạn! Giao kèo sẽ được tiếp diễn.</p>
    <p
      class="deposit-section-title"
      v-if="deposit.notes === 'Tien coc cho dau gia' && deposit.user_status === 0"
    >⛏️ Trả tiền cọc cho đấu giá</p>
    <p
      class="deposit-section-title"
      v-if="deposit.notes === 'Tien coc cho dau gia' && deposit.user_status === 1"
    >🤗 Cảm ơn bạn! Đấu giá sẽ được tiếp diễn.</p>

    <!-- content -->
    <div class="columns is-vcentered">
      <div class="column is-7">
        <p
          class="card-title"
          style="margin-top: 12px; font-weight: 700; wprd-break: break-word;"
        >📦 {{ deposit.auction !== null ? deposit.auction.Product.title : deposit.affair.Product.title }}</p>
      </div>

      <div class="column is-5">
        <p class="card-title" style="margin-top: 12px; font-weight: 700;">Còn: {{ elapsed }} phút</p>
      </div>
    </div>
    <!-- price -->
    <div class="columns is-mobile">
      <div class="column">
        <p>SỐ TIỀN CỌC</p>
        <p class="deposit-content">{{ money }}</p>
      </div>
      <div class="column">
        <p>NGÀY THANH TOÁN</p>
        <p class="deposit-content">{{ date }}</p>
      </div>
    </div>
    <!-- button -->
    <div class="columns is-mobile">
      <div class="column">
        <p style="font-weight: 700;" v-if="deposit.user_status === 1">✅ Đã nộp tiền cọc</p>
      </div>
      <div class="column is-narrow">
        <b-button type="is-warning" v-if="deposit.user_status === 0" @click="pay">💵 Thanh toán</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";

export default {
  props: ["deposit"],
  components: {},
  computed: {
    money: function () {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(this.deposit.amount);
    },
    deadline: function () {
      return Date.parse(this.deposit.date_created) + 1000 * 60 * 60 * 48;
    },
    elapsed: function () {
      let deadline = moment(this.deadline);
      let now = moment(new Date());
      let diff = now.diff(deadline);

      return moment.utc(diff).format("HH giờ mm");
    },
    warning: function () {
      return this.deadline - new Date().getTime() <= 1000 * 60 * 60 * 24
        ? true
        : false;
    },
    date: function () {
      return moment(this.deadline + 1000 * 60 * 60 * 48).format("DD-MM-YYYY");
    },
  },
  methods: {
    ...mapActions("wallet", ["payd"]),

    pay() {
      this.payd({
        id: this.deposit.id,
        amount: this.deposit.amount,
      })
        .then((response) => {
          this.$buefy.toast.open({
            type: "is-success",
            message: `${response.data.message}`,
          });
        })
        .catch((error) => {
          this.$buefy.toast.open({
            type: "is-danger",
            message: `${error.message}`,
          });
        });
    },
  },
};
</script>

<style scoped>
.deposit-section-title {
  color: #b88cd8;
  font-weight: 900;
  font-size: 18px;
}

.not {
  color: #07d390;
}

.deposit-content {
  font-weight: 900;
  font-size: 24px;
}
</style>