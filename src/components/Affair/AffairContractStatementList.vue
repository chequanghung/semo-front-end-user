<template>
  <div class="page-container">
    <!-- transportation -->
    <p class="section-title">VẬN CHUYỂN</p>
    <!-- transportation responsibilities -->
    <ContractStatement title="Bên vận chuyển" :user="contract.shipment_user"></ContractStatement>
    <!-- transportation deadline -->
    <ContractStatement title="Ngày bắt đầu vận chuyển" :content="shipment_date"></ContractStatement>
    <!-- transportation fee -->
    <ContractStatement title="Phí vận chuyển muộn" :content="shipment_late_fee"></ContractStatement>
    <!-- transaction -->
    <p class="section-title">THANH TOÁN</p>
    <!-- payment date -->
    <ContractStatement title="Ngày thanh toán" :content="payment_date"></ContractStatement>
    <!-- payment amount -->
    <ContractStatement title="Số tiền thanh toán" :content="price_cur"></ContractStatement>
    <!-- payment late fee -->
    <ContractStatement title="Phí thanh toán muộn" :content="payment_late_fee"></ContractStatement>
    <!-- extra -->
    <p class="section-title">CHẤT LƯỢNG</p>
    <!-- preservation amount -->
    <ContractStatement title="Nồng đồ chất bảo quản thực vật" :content="preservative_amount"></ContractStatement>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["contract"],
  components: {
    ContractStatement: () => import("./AffairContractStatement"),
  },
  computed: {
    shipment_date: function () {
      return this.contract.shipment_date !== null ? moment(this.contract.shipment_date).format("DD/MM/YYYY") : 'Chưa thỏa thuận'
    },
    shipment_late_fee: function () {
      return this.contract.shipment_late_fee !== null
        ? new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(this.contract.shipment_late_fee)
        : "Chưa thỏa thuận";
    },
    payment_date: function() {
        return this.contract.payment_date !== null
        ? new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(this.contract.payment_date)
        : "Chưa thỏa thuận";
    },
    payment_late_fee: function() {
        return this.contract.payment_late_fee !== null
        ? new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(this.contract.payment_late_fee)
        : "Chưa thỏa thuận";
    },
    preservative_amount: function() {
        return this.contract.preservative_amount !== null
        ? `${this.contract.preservative_amount}%`
        : 'Chưa thỏa thuận'
    },
    price_cur: function() {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(this.contract.Product.price_cur)
    }
  },
  mounted() {
  }
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