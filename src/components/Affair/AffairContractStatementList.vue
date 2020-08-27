<template>
  <div class="page-container">
    <!-- transportation -->
    <p class="section-title">VẬN CHUYỂN</p>
    <!-- transportation responsibilities -->
    <ContractStatement title="Bên vận chuyển" :user="contract.shipment_user"></ContractStatement>
    <!-- transportation deadline -->
    <ContractStatement
      title="Ngày bắt đầu vận chuyển"
      :date="shipment_date"
      @changeDate="changeShipDate"
    ></ContractStatement>
    <!-- transportation fee -->
    <ContractStatement title="Phí vận chuyển muộn" :content="shipment_late_fee"></ContractStatement>
    <!-- transaction -->
    <p class="section-title">THANH TOÁN</p>
    <!-- payment date -->
    <ContractStatement title="Ngày thanh toán" :date="payment_date"></ContractStatement>
    <!-- payment amount -->
    <ContractStatement title="Số tiền thanh toán" :content="price_cur"></ContractStatement>
    <!-- payment late fee -->
    <ContractStatement title="Phí thanh toán muộn" :content="payment_late_fee"></ContractStatement>
    <!-- extra -->
    <p class="section-title">CHẤT LƯỢNG</p>
    <!-- preservation amount -->
    <ContractStatement title="Nồng đồ chất bảo quản thực vật" :content="preservative_amount"></ContractStatement>

    <!-- modal -->
    <b-modal is-></b-modal>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["contract", "product"],
  components: {
    ContractStatement: () => import("./AffairContractStatement"),
  },
  computed: {
  },
  data() {
    return {
      shipment_user: "",
      shipment_date: "",
      shipment_late_fee: "",
      payment_date: "",
      payment_late_fee: "",
      preservative_amount: "",
      price_cur: "",
    };
  },
  methods: {
    changeShipDate(date) {
      this.shipment_date = date;
    },
  },
  mounted() {
    this.shipment_user = this.contract.shipment_user
      ? this.contract.shipment_user
      : "Chưa thỏa thuận";
    this.shipment_date = this.contract.shipment_date
      ? moment(this.contract.shipment_date).format("DD/MM/YYYY")
      : "Chưa thỏa thuận";
    this.shipment_late_fee = this.contract.shipment_late_fee
      ? new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(this.contract.shipment_late_fee)
      : "Chưa thỏa thuận";
    this.payment_date = this.contract.payment_date
      ? moment(this.contract.payment_date).format("DD/MM/YYYY")
      : "Chưa thỏa thuận";
    this.payment_late_fee = this.contract.payment_late_fee
      ? new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(this.contract.payment_late_fee)
      : "Chưa thỏa thuận";
    this.preservative_amount = this.contract.preservative_amount
      ? `${this.contract.preservative_amount}%`
      : "Chưa thỏa thuận";
    this.price_cur = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(this.product.price_cur);
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