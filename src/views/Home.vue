<template>
  <div class="home">
    <!-- welcome -->
    <div class="welcome">
      <p class="welcome-title">Chào mừng bạn đến với</p>
      <img class="welcome-img" src="../assets/logo.png" />
    </div>

    <!-- banner -->
    <CollectionBanner :collections="collections" @into="clickCollection"></CollectionBanner>

    <!-- most viewed -->
    <AuctionCarouselList title="😍 Đông đảo bà con" :auctions="mostviewed"></AuctionCarouselList>

    <!-- top fruits -->
    <FruitGridList title="🍑 Loại quả" :fruits="fruits.slice(0, 10)"></FruitGridList>

    <!-- newest and closing -->
    <div class="container">
      <div class="columns is-vcentered is-variable is-8 is-mobile">
        <div class="column is-narrow">
          <p
            class="home-section-title"
            :class="{'disabled' : auctionMenuIndex !== 1}"
            style="cursor: pointer;"
            @click="auctionMenuIndex = 1"
          >💥 Mới nhất</p>
        </div>
        <div class="column"></div>
        <div class="column is-narrow">
          <p
            class="home-section-title"
            :class="{'disabled' : auctionMenuIndex !== 2}"
            style="cursor: pointer;"
            @click="auctionMenuIndex = 2"
          >Sắp kết thúc ⏲️</p>
        </div>
      </div>
    </div>

    <!-- views -->
    <AuctionGridList :auctions="auctionMenuIndex === 1 ? newest.slice(0, 20) : ending.slice(0, 20)"></AuctionGridList>

    <!-- show all -->
    <div class="columns is-mobile is-centered" v-if="auctionMenuIndex === 1">
      <div class="column is-narrow">
        <b-button outlined rounded @click="$router.push({ path: '/latest' })">📰 Xem thêm</b-button>
      </div>
    </div>

    <b-loading is-full-page v-model="isLoading"></b-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    CollectionBanner: () => import("@/components/Home/CollectionBanner"),
    AuctionCarouselList: () =>
      import("@/components/Auction/AuctionCarouselList"),
    FruitGridList: () => import("@/components/Fruit/FruitGridList"),
    AuctionGridList: () => import("@/components/Auction/AuctionGridList"),
  },
  data() {
    return {
      auctionMenuIndex: 1,
      isLoading: false
    };
  },
  computed: {
    ...mapState({
      collections: (state) => state.home.collections,
      mostviewed: (state) => state.home.mostviewed,
      newest: (state) => state.home.newest,
      ending: (state) => state.home.ending,
      fruits: (state) => state.home.fruits,
    }),
  },
  async mounted() {
    this.isLoading = true

    this.populateh()
    .finally(() => {
      this.isLoading = false
    })
  },
  methods: {
    ...mapActions("home", ["populateh"]),

    clickCollection(collection) {
      this.$router.push({
        name: "CollectionView",
        params: { id: collection.id },
      });
    },
  },
};
</script>

<style scoped>
.disabled {
  color: #70707049;
}
</style>
