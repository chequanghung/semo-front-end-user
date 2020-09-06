<template>
  <div class="card-container" @click="intoAuction">
    <!-- image -->
    <div
      class="card-image"
      v-if="auction.Product.ProductMedia !== undefined"
      :style="{backgroundImage: 'url(' + auction.Product.ProductMedia[0].media_url + ')'}"
    ></div>
    <!-- info -->
    <div class="card-content" v-if="auction !== undefined">
      <p style="font-weight: 700; font-size: 14px; color: #07d390;" v-if="remain >= 24">ĐANG ĐẤU GIÁ</p>
      <p style="font-weight: 700; font-size: 14px; color: #FD5F54;" v-else>SẮP KẾT THÚC</p>
      <div class="card-title">{{ auction.Product.title }}</div>
      <!-- price -->
      <div class="card-info">
        <p class="card-info-title">Giá hiện tại</p>
        <p class="card-info-content major">{{ format_currency(auction.price_cur) }}</p>
      </div>
      <!-- remaining time -->
      <div class="card-info" v-if="auction !== undefined">
        <p class="card-info-title">Thời gian còn lại</p>
        <p
          class="card-info-content"
          v-if="auction.remain >= 1 && remain >= 24"
        >{{ auction.remain }} ngày</p>
        <p
          class="card-info-content"
          style="color: #FD5F54;"
          v-else
        >{{ format_time(auction.remain_time) }}</p>
      </div>
      <!-- footer info -->
      <div class="columns is-mobile">
        <div class="column">
          <p class="card-info-title">{{ auction.Product.weight }} tạ</p>
        </div>
        <div class="column is-narrow">
          <p class="card-info-title">{{ auction.Product.Address.province }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuctionCard",
  props: ["auction"],
  async mounted() {
    this.remain = this.auction.remain_time.split(":")[0];
  },
  data() {
    return {
      remain: "",
    };
  },
  methods: {
    intoAuction() {
      this.$router.push({
        name: "Auction",
        params: { id: this.auction.id },
      });
    },
    format_time(time) {
      let times = time.split(":");
      return `${times[0]} giờ ${times[1]} phút`;
    },
    format_currency(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    }
  },
};
</script>

<style scoped>
.card-container {
  /* padding: 16px; */
  background-color: white;
  box-shadow: 0 2px 8px #00000019;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  text-align: left;
  transition: 0.25s;
}

.card-container:hover {
  box-shadow: 0 4px 16px #00000019;
}

.card-image {
  width: 100%;
  height: 180px;
  background-size: cover;
  background-position: center;
  padding: 0;
}

.card-content {
  padding: 16px;
}

.card-title {
  font-weight: 700;
  height: 50px;
  overflow: hidden;
}

.card-info {
  padding: 8px 0;
}

.card-info-content {
  font-size: 17px;
  font-weight: 900;
  color: #707070;
}

.alert {
  color: #fd5e53;
}

.major {
  color: #07d390;
}

.card-info-title {
  color: #707070;
  font-size: 15px;
}
</style>