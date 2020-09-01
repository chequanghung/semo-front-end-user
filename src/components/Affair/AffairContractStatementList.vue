<template>
  <div class="page-container">
    <!-- transportation -->
    <p class="section-title">VẬN CHUYỂN</p>
    <!-- transportation responsibilities -->
    <ContractStatement
      title="Bên vận chuyển"
      :user="shipment_user"
      :users="[affair.buyer, affair.seller]"
      :class="{'edited' : shipment_user !== contract.shipment_user && shipment_user}"
      :uneditable="updateMode"
      @changeUser="changeShipmentUser"
    ></ContractStatement>
    <div class="change" v-if="update.shipment_user_id !== contract.shipment_user_id">
      <div
        class="tile notification is-warning is-light"
        style="display: flex; justify-content: center; flex-flow: column;"
      >
        <p class="change-notice-title">Có thay đối từ đối tác của bạn</p>
        <ContractStatement
          title="Bên vận chuyển"
          :user="update.shipment_user"
          :uneditable="true"
          class="edited"
          v-if="update.shipment_user_id !== contract.shipment_user_id"
        ></ContractStatement>
        <div class="columns is-mobile is-vcentered is-centered">
          <div class="column is-narrow">
            <b-button type="is-green">✅ Chấp thuận</b-button>
          </div>
          <div class="column is-narrow">
            <b-button type="is-danger">⛔ Từ chối</b-button>
          </div>
        </div>
      </div>
    </div>
    <!-- transportation deadline -->
    <ContractStatement
      title="Ngày bắt đầu vận chuyển"
      :date="shipment_date"
      :class="{'edited' : shipment_date !== contract.shipment_date && shipment_date}"
      :uneditable="updateMode"
      @changeDate="changeShipDate"
    ></ContractStatement>
    <!-- transportation fee -->
    <ContractStatement
      title="Phí vận chuyển muộn"
      :money="shipment_late_fee"
      :min="0"
      :max="product.price_cur"
      :class="{'edited' : shipment_late_fee !== contract.shipment_late_fee && shipment_late_fee}"
      :uneditable="updateMode"
      @changeMoney="changeShipmentLateFee"
    ></ContractStatement>
    <!-- transaction -->
    <p class="section-title">THANH TOÁN</p>
    <!-- payment date -->
    <ContractStatement
      title="Ngày thanh toán"
      :date="payment_date"
      :class="{'edited' : payment_date !== contract.payment_date && payment_date}"
      :uneditable="updateMode"
      @changeDate="changePaymentDate"
    ></ContractStatement>
    <!-- payment amount -->
    <ContractStatement title="Số tiền thanh toán" :money="price_cur" :uneditable="true"></ContractStatement>
    <!-- payment late fee -->
    <ContractStatement
      title="Phí thanh toán muộn"
      :money="payment_late_fee"
      :min="0"
      :max="product.price_cur"
      :class="{'edited' : payment_late_fee !== contract.payment_late_fee && payment_late_fee}"
      :uneditable="updateMode"
      @changeMoney="changePaymentLateFee"
    ></ContractStatement>
    <!-- extra -->
    <p class="section-title">CHẤT LƯỢNG</p>
    <!-- preservation amount -->
    <ContractStatement
      title="Nồng đồ chất bảo quản thực vật"
      :percent="preservative_amount"
      :min="0"
      :max="100"
      :class="{'edited' : preservative_amount !== contract.preservative_amount && preservative_amount}"
      :uneditable="updateMode"
      @changePercent="changePreservativeAmount"
    ></ContractStatement>

    <br />

    <div class="columns is-mobile is-centered">
      <div class="column is-narrow">
        <!-- :disabled="updateMode"  -->
        <b-button
          type="is-green"
          @click="submitUpdateReview"
          v-if="updateMode"
        >✅ Thay đổi trạng thái</b-button>
      </div>
    </div>
    {{ update }}
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  components: {
    ContractStatement: () => import("./AffairContractStatement"),
  },
  computed: {
    ...mapState({
      contract: (state) => state.affair.contract,
      product: (state) => state.affair.product,
      affair: (state) => state.affair.affair,
      update: (state) => state.affair.update,
      user: (state) => state.user.user,
    }),
    updateMode: function () {
      // if there is update
      if (Object.keys(this.update).length !== 0) {
        // if update is more recent than the contract
        if (this.contract.date_updated < this.update.date_updated) {
          // if update is requested by this user, let the user wait for his partner to review the changes
          if (this.contract.change_user_id === this.update.change_user_id) {
            return false;
            // this user is reviewing the incoming change
          } else {
            // this user has submitted update review
            if (this.updated) {
              return false;
              // this user has NOT submitted update review
            } else {
              return true;
            }
          }
          // if update is older than the contract (contract is updated from the update request)
        } else {
          return false;
        }
        // if there isn't any update (contract is newly created)
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      shipment_user: null,
      shipment_date: null,
      shipment_late_fee: null,
      payment_date: null,
      payment_late_fee: null,
      preservative_amount: null,
      price_cur: null,
      updated: false,
    };
  },
  methods: {
    submitUpdateReview() {
      console.log(1);
    },
    changeShipDate(date) {
      this.shipment_date = moment(date).format("YYYY-MM-DD HH:mm:ss");
      this.bindChange();
    },
    changeShipmentLateFee(content) {
      this.shipment_late_fee = content;
      this.bindChange();
    },
    changePaymentLateFee(content) {
      this.payment_late_fee = content;
      this.bindChange();
    },
    changePaymentDate(date) {
      this.payment_date = moment(date).format("YYYY-MM-DD HH:mm:ss");
      this.bindChange();
    },
    changePreservativeAmount(percent) {
      this.preservative_amount = percent;
      this.bindChange();
    },
    changeShipmentUser(user) {
      this.shipment_user = user;
      this.bindChange();
    },
    async setAtr() {
      this.shipment_user = this.contract.shipment_user;
      this.shipment_date = this.contract.shipment_date;
      this.shipment_late_fee = this.contract.shipment_late_fee;
      this.payment_date = this.contract.payment_date;
      this.payment_late_fee = this.contract.payment_late_fee;
      this.preservative_amount = this.contract.preservative_amount;
      this.price_cur = this.product.price_cur;
    },
    bindChange() {
      let contract_edit = {
        shipment_user_id: this.shipment_user ? this.shipment_user.id : null,
        shipment_date: this.shipment_date,
        shipment_late_fee: this.shipment_late_fee,
        payment_date: this.payment_date,
        payment_late_fee: this.payment_late_fee,
        preservative_amount: this.preservative_amount,
      };

      this.$emit("change", contract_edit);
    },
  },
  // async mounted() {},
  watch: {
    contract: function () {
      if (this.contract !== undefined) {
        this.setAtr();
      }
    },
    updateMode: function () {
      this.$emit("update", this.updateMode);
    },
  },
};
</script>

<style scoped>
.page-container {
  padding: 0;
}

.section-title {
  text-transform: uppercase;
  color: #707070;
  font-size: 17px;
  margin: 16px 0;
  font-weight: 700;
}

.change-notice-title {
  text-align: center;
}

.edited {
  background-color: #fff7cc;
  box-shadow: 0 2px 4px #fff7cc59;
}
</style>