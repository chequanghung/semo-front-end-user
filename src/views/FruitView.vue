<template>
  <div class="home">
    <b-loading v-model="isLoading"></b-loading>
    <div class="welcome">
      <div
        class="is-64x64"
        style="border-radius: 50%; width: 64px; height: 64px; background-size: cover; background-position: center;"
        :style="{backgroundImage: 'url(' + fruit.icon_url + ')'}"
      ></div>
      <p class="welcome-title" style="margin-left: 16px;">{{ fruit.title }} | {{ auctions.length }} SẢN PHẨM</p>
    </div>
    <br />
    <!-- auctions -->
    <AuctionGridList
      :auctions="auctions.slice(index * 20, (index + 1) * 20)"
      :index="index"
      :totalPage="totalPage"
      @prev="prev"
      @next="next"
    ></AuctionGridList>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["id"],
  beforeDestroy() {
    this.clear()
  },
  components: {
    AuctionGridList: () => import("@/components/Auction/AuctionGridList"),
  },
  computed: {
    ...mapState({
      fruit: (state) => state.fruit.fruit,
      auctions: (state) => state.fruit.auctions,
    }),

    totalPage: function () {
      return this.auctions.length % 20 > 0
        ? Math.ceil(this.auctions.length / 20)
        : Math.floor(this.auctions.length / 20);
    },
  },
  data() {
    return {
      index: 0,
      isLoading: true,
    };
  },
  methods: {
    ...mapActions("fruit", ["getf", "geta", "clear"]),
    prev() {
      --this.index;
      window.scrollTo(0, 0);
    },
    next() {
      ++this.index;
      window.scrollTo(0, 0);
    },
  },
  async mounted() {
    this.getf(this.id);
    this.geta(this.id);
  },
  watch: {
    auctions: function() {
      if (this.auctions !== undefined) {
        this.isLoading = false
      }
    }
  }
};
</script>

<style>
</style>