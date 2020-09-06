<template>
  <div class="tile is-child box">
    <div>
      <p class="home-section-title">🧾 Lịch sử giao dịch</p>
    </div>
    <b-loading :is-full-page="false" v-model="isLoading"></b-loading>
    <!-- table -->
    <b-table
      :data="trans"
      :columns="columns"
      paginated
      :per-page="20"
      :current-page.sync="current"
      pagination-simple
      pagination-position="bottom"
    ></b-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  computed: {
    ...mapState({
      transactions: (state) => state.wallet.transaction,
    }),
  },
  data() {
    return {
      trans: [],
      columns: [
        {
          label: "THỜI GIAN",
          field: "date_created",
          searchable: true,
        },
        {
          label: "SỐ TIỀN (đ)",
          field: "amount",
          searchable: true,
          numeric: true,
        },
        {
          label: "NGƯỜI GIAO DỊCH",
          field: "src_name",
          searchable: true,
        },
        {
          label: "TRẠNG THÁI",
          field: "notes",
          searchable: true,
        },
      ],
      current: 1,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("wallet", ["gett"]),
    populate() {
      this.gett()
        .then(() => {
          this.format_array();
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    format_array() {
      this.trans = this.transactions.map((item) => {
        return {
          ...item,
          date_created: moment(item.date_created).format("hh:mm DD-MM-YYYY"),
          amount: new Intl.NumberFormat({
            style: "currency",
          }).format(item.amount),
        };
      });
    },
  },
  async mounted() {
    this.isLoading = true;
    this.populate();
  },
  watch: {
    transactions: function () {
      this.format_array();
    },
  },
};
</script>

<style scoped>
</style>