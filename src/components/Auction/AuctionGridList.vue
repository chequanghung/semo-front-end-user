<template>
  <div class="container">
    <div class="auctions columns is-mobile is-multiline is" v-if="auctions != undefined">
      <div
        class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen is-2-fullhd"
        v-for="auction in auctions"
        :key="auction.id"
      >
        <AuctionCard :auction="auction"></AuctionCard>
      </div>
    </div>

    <!-- pagination -->
    <div class="columns is-vcentered is-centered is-mobile">
      <div class="column"></div>
      <div class="column">
        <div class="columns is-vcentered is-centered is-mobile">
          <div class="column is-narrow">
            <b-button outlined rounded @click="prev">👈 Trang trước</b-button>
          </div>
          <div class="column is-narrow">
            <b-button outlined rounded @click="next">👉 Trang sau</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuctionGridList",
  props: ["auctions"],
  components: {
    AuctionCard: () => import("@/components/Auction/AuctionCard"),
  },
  methods: {
      prev() {

      },
      next() {

      }
  }
};
</script>

<style>
</style>