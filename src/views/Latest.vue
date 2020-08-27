<template>
  <div class="home">
    <!-- welcome -->
    <div class="welcome">
      <p class="welcome-title">Những buổi đấu giá mới nhất tại đây!</p>
    </div>

    <!-- auctions -->
    <AuctionGridList
      :auctions="newest.slice(index * 20, (index + 1) * 20)"
      :index="index"
      :totalPage="pageTotal"
      @prev="prev"
      @next="next"
    ></AuctionGridList>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    AuctionGridList: () => import("@/components/Auction/AuctionGridList"),
  },
  computed: {
    ...mapState({
      newest: (state) => state.home.newest,
    }),
    pageTotal: function () {
      return this.newest.length % 20 > 0
        ? Math.ceil(this.newest.length / 20)
        : Math.floor(this.newest.length / 20);
    },
  },
  data() {
    return {
      index: 0,
    };
  },
  methods: {
      prev() {
          --this.index
          window.scrollTo(0,0)
      },
      next() {
          ++this.index
          window.scrollTo(0,0)
      }
  }
};
</script>

<style>
</style>