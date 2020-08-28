<template>
  <div class="home">
    <!-- welcome -->
    <div class="welcome">
      <p class="welcome-title">
        Kết quả tìm kiếm cho
        <strong style="color: #01d28e;">
          <i>{{ search }}</i>
        </strong>
      </p>
    </div>

    <!-- tabs -->
    <div class="container">
      <b-tabs v-model="index" expanded type="is-toggle">
        <b-tab-item label="🍎 Sản phẩm">
          <AuctionGridList
            :auctions="auctions.slice(pageIndex * 20, (pageIndex + 1) * 20)"
            :index="pageIndex"
            :totalPage="pageTotal"
            @prev="prev"
            @next="next"
          ></AuctionGridList>
        </b-tab-item>
        <b-tab-item label="📘 Bộ sưu tập"></b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["search"],
  components: {
    AuctionGridList: () => import("@/components/Auction/AuctionGridList"),
  },
  computed: {
    ...mapState({
      auctions: (state) => state.search.auctions,
      collections: (state) => state.search.collections,
    }),
  },
  data() {
    return {
      index: "ab",
      pageIndex: 0,
      pageTotal: 0,
    };
  },
  watch: {
    index: function () {
      this.changeIndex()
    },
  },
  methods: {
    ...mapActions("search", ["geta", "getc"]),
    prev() {
      window.scrollTo(0, 0);
      --this.pageIndex;
    },
    next() {
      window.scrollTo(0, 0);
      ++this.pageIndex;
    },
    changeIndex() {
      if (this.index === 0) {
        this.geta(this.search);
        this.pageIndex = 0;
        this.pageTotal =
          this.auctions.length % 20 > 0
            ? Math.ceil(this.auctions.length / 20)
            : Math.floor(this.auctions.length / 20);
      } else if (this.index === 1) {
        alert("ok");
      }
    },
  },
  async mounted() {
    this.geta(this.search);
    this.index = 0;
    this.changeIndex()
  },
};
</script>

<style scoped>
</style>