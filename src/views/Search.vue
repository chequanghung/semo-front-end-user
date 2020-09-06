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

    <!-- 404 -->
    <div class="container" v-if="auctions.length === 0">
      <div class="columns is-centered">
        <div class="column is-narrow">
          <p style="font-size: 70px; text-align: center;">🤷‍♂️</p>
          <br/>
          <p style="font-size: 20px; text-align: center;">Chúng tôi không có thứ bạn đang tìm rồi.</p>
        </div>
      </div>
    </div>

    <!-- tabs -->
    <div class="container">
      <!-- filter -->
      <div class="filters columns is-multiline" v-if="auctions.length > 0">
        <div class="column">
          <p style="font-weight: 700">Sắp xếp theo:</p>
        </div>
        <div class="column">
          <b-switch v-model="closing" type="is-green">Sắp kết thúc</b-switch>
        </div>
        <div class="column">
          <b-switch v-model="hottest" type="is-green">Được xem nhiều</b-switch>
        </div>
      </div>
    </div>
    <!-- grid list -->
    <AuctionGridList
      :auctions="auctions.slice(pageIndex * 20, (pageIndex + 1) * 20)"
      :index="pageIndex"
      :totalPage="pageTotal"
      @prev="prev"
      @next="next"
    ></AuctionGridList>

    <b-loading is-full-page v-model="isLoading"></b-loading>
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
      pageIndex: 0,
      pageTotal: 0,
      closing: false,
      hottest: false,
      isLoading: true,
    };
  },
  watch: {
    closing: function () {
      if (this.closing === true) {
        this.hottest = false;

        this.auctions.sort(function (a, b) {
          if (a.remain_time < b.remain_time) {
            return -1;
          } else if (a.remain_time > b.remain_time) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        this.hottest = true;
      }
    },
    hottest: function () {
      if (this.hottest === true) {
        this.closing = false;

        this.auctions.sort(function (a, b) {
          if (a.views < b.views) {
            return -1;
          } else if (a.views > b.views) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        this.closing = true;
      }
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
    searchItem() {
      this.isLoading = true;

      this.geta(this.search).finally(() => {
        this.isLoading = false;
      });
    },
  },
  async mounted() {
    this.searchItem();
  },
};
</script>

<style scoped>
</style>