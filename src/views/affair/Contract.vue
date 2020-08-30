<template>
  <div class="container">
    <br />
    <div class="columns">
      <div class="column">
        <b-button type="is-danger" outlined @click="back">👈 Quay lại</b-button>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-parent">
        <div class="tile is-child box">
          <p class="home-section-title">🗃️ Điều khoản</p>
          <!-- statements -->
          <p style="text-align: center;">Nhấp vào điều khoản để chỉnh sửa</p>
          <AffairContractStatementList
            @change="changeContractAttr"
          ></AffairContractStatementList>
          <!-- submit -->
          <br />
          <div class="columns is-centered is-mobile">
            <div class="column is-narrow">
              <b-button
                type="is-green"
                @click="editContract"
                :disabled="isDisabled"
                :loading="isLoading"
              >✈️ Yêu cầu sửa hợp đồng</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tile is-child box is-narrow">
      <div class="columns is-mobile">
        <div class="column">{{ cont }}</div>
        <div class="column is-narrow">
          <b-button type="is-danger" @click="back">❌ Hủy hợp đồng</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import AffairContractStatementList from "@/components/Affair/AffairContractStatementList";

export default {
  components: {
    AffairContractStatementList: () =>
      import("@/components/Affair/AffairContractStatementList"),
  },
  computed: {
    ...mapState({
      contract: (state) => state.affair.contract,
      product: (state) => state.affair.product,
      affair: (state) => state.affair.affair,
    }),
    isDisabled: function () {
      if (this.compare() === true || this.isLoading === true) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      cont: {},
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("affair", ["getc", "editc", "clear"]),

    back() {
      this.clear();
      this.$router.go(-1);
    },
    editContract() {
      // submit to server
      this.isLoading = true;

      this.editc(this.cont)
        .then(() => {
          this.$buefy.toast.open({
            type: "is-success",
            message: "Xong rồi!",
          });

          this.$router.go(-1);
        })
        .catch(() => {
          this.isLoading = false;
          this.$buefy.toast.open({
            type: "is-danger",
            message: "Lỗi rồi!",
          });
        });
    },
    // submit change on contract object
    changeContractAttr(contract_edit) {
      this.cont.shipment_user_id = contract_edit.shipment_user_id;
      this.cont.shipment_date = contract_edit.shipment_date;
      this.cont.shipment_late_fee = contract_edit.shipment_late_fee;
      this.cont.payment_date = contract_edit.payment_date;
      this.cont.payment_late_fee = contract_edit.payment_late_fee;
      this.cont.preservative_amount = contract_edit.preservative_amount;
      this.cont.change_user_id = this.user.id;
    },
    // compare cont with contract in the db
    compare() {
      if (
        this.cont.shipment_user_id === this.contract.shipment_user_id &&
        this.cont.shipment_date === this.contract.shipment_date &&
        this.cont.shipment_late_fee === this.contract.shipment_late_fee &&
        this.cont.payment_date === this.contract.payment_date &&
        this.cont.payment_late_fee === this.contract.payment_late_fee &&
        this.cont.preservative_amount === this.contract.preservative_amount
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  async mounted() {
    this.getc(this.$route.params.id).then(() => {
      // bind data from contractinto cont
      this.cont = {
        id: this.contract.id,
        shipment_user_id: this.contract.shipment_user_id,
        shipment_date: this.contract.shipment_date,
        shipment_late_fee: this.contract.shipment_late_fee,
        payment_date: this.contract.payment_date,
        payment_late_fee: this.contract.payment_late_fee,
        preservative_amount: this.contract.preservative_amount,
        contract_status: this.contract.contract_status,
        change_user_id: this.contract.change_user_id,
      };
    });
  },
};
</script>

<style scoped>
</style>