<template>
  <div class="container">
    <!-- title -->
    <div class="columns is-vcentered is-mobile">
      <!-- title -->
      <div class="column">
        <p class="home-section-title" style="margin: 0;">{{ title }}</p>
      </div>
      <!-- nav buttons -->
      <div class="column is-narrow" v-if="auctions != undefined">
        <div class="columns is-vcentered is-mobile">
          <div class="column is-narrow">
            <b-button outlined rounded @click="prev">👈</b-button>
          </div>
          <div class="column is-narrow">
            <b-button outlined rounded @click="next">👉</b-button>
          </div>
        </div>
      </div>
    </div>

    <!-- strip -->
    <div class="auctions columns is-mobile is" v-if="auctions != undefined">
      <div
        class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen is-2-fullhd"
        v-for="auction in auctions"
        :key="auction.id"
      >
        <AuctionCard :auction="auction"></AuctionCard>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuctionGridList",
  components: {
    AuctionCard: () => import("@/components/Auction/AuctionCard"),
  },
  props: ["title", "auctions"],
  methods: {
    prev(){
      let content = document.querySelector(".auctions");
      content.scrollLeft -= 600;
    },
    next(){
      let content = document.querySelector(".auctions");
      content.scrollLeft += 600;
    }
  }
};
</script>

<style scoped>
.auctions {
  padding: 10px 0;
  overflow-x: scroll;
  scroll-behavior: smooth;
}
</style>