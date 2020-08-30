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
      @changeUser="changeShipmentUser"
    ></ContractStatement>
    <!-- transportation deadline -->
    <ContractStatement
      title="Ngày bắt đầu vận chuyển"
      :date="shipment_date"
      @changeDate="changeShipDate"
      :class="{'edited' : shipment_date !== contract.shipment_date && shipment_date}"
    ></ContractStatement>
    <!-- transportation fee -->
    <ContractStatement
      title="Phí vận chuyển muộn"
      :money="shipment_late_fee"
      :min="0"
      :max="product.price_cur"
      @changeMoney="changeShipmentLateFee"
      :class="{'edited' : shipment_late_fee !== contract.shipment_late_fee && shipment_late_fee}"
    ></ContractStatement>
    <!-- transaction -->
    <p class="section-title">THANH TOÁN</p>
    <!-- payment date -->
    <ContractStatement
      title="Ngày thanh toán"
      :date="payment_date"
      @changeDate="changePaymentDate"
      :class="{'edited' : payment_date !== contract.payment_date && payment_date}"
    ></ContractStatement>
    <!-- payment amount -->
    <ContractStatement title="Số tiền thanh toán" :money="price_cur" :uneditable="true"></ContractStatement>
    <!-- payment late fee -->
    <ContractStatement
      title="Phí thanh toán muộn"
      :money="payment_late_fee"
      :min="0"
      :max="product.price_cur"
      @changeMoney="changePaymentLateFee"
      :class="{'edited' : payment_late_fee !== contract.payment_late_fee && payment_late_fee}"
    ></ContractStatement>
    <!-- extra -->
    <p class="section-title">CHẤT LƯỢNG</p>
    <!-- preservation amount -->
    <ContractStatement
      title="Nồng đồ chất bảo quản thực vật"
      :percent="preservative_amount"
      :min="0"
      :max="100"
      @changePercent="changePreservativeAmount"
      :class="{'edited' : preservative_amount !== contract.preservative_amount && preservative_amount}"
    ></ContractStatement>

    {{ shipment_user }}
    <br/>
    {{ shipment_date }}
    <br/>
    {{ shipment_late_fee }}
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
      user: (state) => state.user.user,
    }),
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
    };
  },
  methods: {
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
    setAtr() {
      this.shipment_user = this.contract.shipment_user;
      this.shipment_date = this.contract.shipment_date;
      this.shipment_late_fee = this.contract.shipment_late_fee;
      this.payment_date = this.contract.payment_date;
      this.payment_late_fee = this.contract.payment_late_fee;
      this.preservative_amount = this.contract.preservative_amount;
      this.price_cur = this.product.price_cur;
    },
    bindChange() {
      console.log(this.shipment_user.id)
      let contract_edit = {
        shipment_user_id:
          this.shipment_user ? this.shipment_user.id : null,
        shipment_date: this.shipment_date,
        shipment_late_fee: this.shipment_late_fee,
        payment_date: this.payment_date,
        payment_late_fee: this.payment_late_fee,
        preservative_amount: this.preservative_amount,
      };

      this.$emit("change", contract_edit);
    },
  },
  mounted() {
    this.setAtr();
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
</style>