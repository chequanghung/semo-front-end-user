<template>
  <div class="card-container">
    <div class="columns is-vcentered is-mobile">
      <div class="column is-narrow">
        <div
          class="product-thumbnail image is-96x96"
          :style="{backgroundImage: 'url(' + item.ProductMedia[0].media_url + ')'}"
        ></div>
      </div>
      <div class="column">
        <p class="card-title">{{ item.title }}</p>
        <div class="columns is-mobile">
          <!-- price -->
          <div class="column">
            <div class="card-info">
              <p class="card-info-title">Giá hiện tại</p>
              <p class="card-info-content major">{{ item.price_cur }}</p>
            </div>
          </div>
          <div class="column" v-if="item.product_status === 3">
            <div class="card-info">
              <p class="card-info-title">Thời gian còn lại</p>
              <p
                class="card-info-content major"
                :class="{'red': info.remain_time.split(':')[0] <= 23}"
              >{{ remain }}</p>
            </div>
          </div>
        </div>
        <!-- brief info -->
        <p class="card-info-title">{{ item.weight }} tạ | {{ item.Address.province }}</p>
      </div>
    </div>

    <div class="columns is-vcentered is-mobile">
      <div class="column">
        <p class="card-info-subtle">{{ item.date_created }}</p>
      </div>
      <div class="column is-narrow">
        <div class="columns is-variable is-1 is-mobile">
          <!-- view auction for status 3 -->
          <div class="column is-narrow" v-if="item.product_status === 3">
            <b-button type="is-green" @click="intoAuction">📑 Xem đấu giá</b-button>
          </div>
          <!-- view affair for status 4, 5 -->
          <div class="column is-narrow" v-if="item.product_status <= 5 && item.product_status >= 4">
            <b-button type="is-green" @click="intoAffair">📑 Xem giao kèo</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from "moment";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      item: {},
    };
  },
  async mounted() {
    this.item = this.info.Product;
  },
  computed: {
    remain: function () {
      let times = this.info.remain_time.split(":");
      if (times[0] >= 24) {
        return `${this.info.remain_days} ngày`;
      } else {
        return `${times[0]} giờ ${times[1]} phút`;
      }
    },
  },
  methods: {
    intoAuction() {
      this.$emit("auction", this.info);
    },
    intoAffair() {
      this.$emit("affair", this.info);
    },
  },
};
</script>

<style scoped>
.card-container {
  background-color: white;
  box-shadow: 0 2px 8px #00000016;
  padding: 16px;
  border-radius: 10px;
  transition: 0.25s;
}

.card-container:hover {
  box-shadow: 0 4px 16px #00000016;
}

.card-title {
  font-weight: 800;
  font-size: 18px;
  height: 60px;
}

.product-thumbnail {
  border-radius: 10px;
  background-size: cover;
  background-position: center;
}

.card-info {
  padding: 8px 0;
}

.card-info-title {
  color: #707070;
  font-size: 15px;
}

.card-info-content {
  font-size: 17px;
  font-weight: 900;
  color: #707070;
}

.card-info-subtle {
  font-size: 12px;
}

.red {
  color: #fd5e53;
}
</style>