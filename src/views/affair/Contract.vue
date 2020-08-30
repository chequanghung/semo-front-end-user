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
            :product="product"
            :affair="affair"
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
        <div class="column"></div>
        <div class="column is-narrow">
          <b-button type="is-danger" @click="back">❌ Hủy hợp đồng</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AffairContractStatementList from "@/components/Affair/AffairContractStatementList";

export default {
  components: {
    AffairContractStatementList,
    // : () =>
    //   import("@/components/Affair/AffairContractStatementList"),
  },
  computed: {
    ...mapState({
      contract: (state) => state.affair.contract,
      product: (state) => state.affair.product,
      affair: (state) => state.affair.affair,
    }),
    isDisabled: function () {
      if (this.cont === this.contract || Object.keys(this.cont).length === 0) {
        return true;
      } else if (this.isLoading === true) {
        return true;
      } else {
        return false
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
      this.isLoading = true

      this.editc(this.cont).then(() => {
        this.$buefy.toast.open({
          type: 'is-success',
          message: 'Xong rồi!'
        })

        this.$router.go(-1)
      }).catch(() => {
      this.isLoading = false
        this.$buefy.toast.open({
          type: 'is-danger',
          message: 'Lỗi rồi!'
        })
      })
    },
    changeContractAttr(contract_edit) {
      // submit change on contract object
      this.cont.affair_contract_id = contract_edit.id
      this.cont.shipment_user_id = contract_edit.shipment_user_id;
      this.cont.shipment_date = contract_edit.shipment_date
      this.cont.shipment_late_fee = contract_edit.shipment_late_fee
      this.cont.payment_date = contract_edit.payment_date
      this.cont.payment_late_fee = contract_edit.payment_late_fee
      this.cont.preservative_amount = contract_edit.preservative_amount
      this.cont.change_user_id = contract_edit.change_user_id

      console.log(this.cont === this.contract)

      console.log('cont')
      console.log(this.cont)
      console.log('contract')
      console.log(this.contract)

      console.log(Object.keys(this.cont).length === 0)
    },
  },
  async mounted() {
    this.getc(this.$route.params.id)
  },
};
</script>

<style scoped>
</style>