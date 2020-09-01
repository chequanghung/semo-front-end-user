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
          <br />
          <b-notification
            type="is-warning"
            v-if="updateMode"
          ><strong>💡 Đối tác của bạn vừa yêu cầu cập nhật hợp đồng. Cùng nhau trao đổi và chỉnh sửa hợp đồng nhé!</strong></b-notification>
          <AffairContractStatementList
            :updateMode="updateMode"
            @change="changeContractAttr"
            @update="changeUpdateMode"
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
                v-if="updateMode === false"
              >✈️ Yêu cầu sửa hợp đồng</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tile is-child box is-narrow">
      <div class="columns is-mobile is-vcentered">
        <div class="column">
          <p style="font-size: 18px; font-weight: 900; color: #b88cd8">⚙️ Chức năng</p>
        </div>
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
      update: (state) => state.affair.update,
      user: (state) => state.user.user,
    }),
    isDisabled: function () {
      if (this.compare(this.contract) === true || this.isLoading === true) {
        return true;
      } else {
        return false;
      }
    },
    updateMode: function () {
      // if there is update
      if (Object.keys(this.update).length !== 0) {
        // chưa check trường hợp contract null có update
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
    changeUpdateMode() {
      this.updateMode === true ? (this.updateMode = false) : "";
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
    },
    // compare cont with contract in the db
    compare(object) {
      if (
        this.cont.shipment_user_id === object.shipment_user_id &&
        this.cont.shipment_date === object.shipment_date &&
        this.cont.shipment_late_fee === object.shipment_late_fee &&
        this.cont.payment_date === object.payment_date &&
        this.cont.payment_late_fee === object.payment_late_fee &&
        this.cont.preservative_amount === object.preservative_amount
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
        affair_contract_id: this.contract.id,
        shipment_user_id: this.contract.shipment_user_id,
        shipment_date: this.contract.shipment_date,
        shipment_late_fee: this.contract.shipment_late_fee,
        payment_date: this.contract.payment_date,
        payment_late_fee: this.contract.payment_late_fee,
        preservative_amount: this.contract.preservative_amount,
        change_user_id: this.user.id,
      };
    });
  },
};
</script>

<style scoped>
</style>