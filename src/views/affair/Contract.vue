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
          <p class="home-section-title">📋 Hợp đồng</p>
        </div>
      </div>
      <div class="tile is-vertical is-parent">
        <div class="tile is-child box">
          <p class="home-section-title">🗃️ Điều khoản</p>
          <!-- statements -->
          <p style="text-align: center;">Nhấp vào điều khoản để chỉnh sửa</p>
          <AffairContractStatementList :contract="contract" :product="product"></AffairContractStatementList>
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

export default {
  components: {
    AffairContractStatementList: () =>
      import("@/components/Affair/AffairContractStatementList"),
  },
  computed: {
    ...mapState({
      contract: (state) => state.affair.contract,
    }),
  },
  methods: {
    ...mapActions("affair", ["getc", "editc"]),

    back() {},
  },
  async mounted() {
      this.getc(this.$route.params.id)
  }
};
</script>

<style scoped>
</style>