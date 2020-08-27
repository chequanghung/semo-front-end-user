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
              <p class="card-info-content major" :class="{'red': item.Auctions[0].remain_days === 0}">{{ remain }}</p>
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
          <!-- edit for status 0, 1, 2 -->
          <div class="column is-narrow" v-if="item.product_status < 2">
            <b-button type="is-primary" @click="editItem">🖊️ Chỉnh sửa</b-button>
          </div>
          <!-- create auction for status 2 -->
          <div class="column is-narrow" v-if="item.product_status === 2">
            <b-button
              :type="isCreateCollapsed ? 'is-light' : 'is-success'"
              @click="isCreateCollapsed = !isCreateCollapsed"
            >➕ Tạo buổi đấu giá</b-button>
          </div>
          <!-- delete product for status 0, 1, 2 -->
          <div class="column is-narrow" v-if="item.product_status <= 2">
            <b-button type="is-danger" @click="deleteItem">🗑️ Xóa</b-button>
          </div>
          <!-- view auction for status 3 -->
          <div class="column is-narrow" v-if="item.product_status === 3">
            <b-button type="is-success" @click="intoAuction">📑 Xem đấu giá</b-button>
          </div>
          <!-- view affair for status 4, 5 -->
          <div class="column is-narrow" v-if="item.product_status <= 5 && item.product_status >= 4">
            <b-button type="is-success" @click="intoAffair">📑 Xem giao kèo</b-button>
          </div>
          <!-- restore for status 9 -->
          <div class="column is-narrow" v-if="item.product_status === 9">
            <b-button type="is-info" @click="restoreItem">🔄 Khôi phục</b-button>
          </div>
        </div>
      </div>
    </div>

    <!-- collapse for auction creator -->
    <div
      class="tile is-vertical notification is-light"
      v-if="isCreateCollapsed === true && item.product_status === 2"
    >
      <p class="home-section-title">🔨 Tạo buổi đấu giá</p>
      <!-- datetime picker -->
      <b-field label="Ngày kết thúc đấu giá">
        <b-datetimepicker locale="en-GB" v-model="date" required expanded></b-datetimepicker>
      </b-field>
      <!-- submit -->
      <b-button
        style="margin: 0 auto;"
        type="is-primary"
        :disabled="isDisabled"
        @click="createAuction"
      >✅ Tạo buổi đấu giá</b-button>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["item"],
  components: {},
  data() {
    return {
      isCreateCollapsed: false,
      date: "",
      isDisabled: true,
    };
  },
  computed: {
    remain: function () {
      if (this.item.Auctions[0].remain_days > 0) {
        return `${this.item.Auctions[0].remain_days} ngày`;
      } else {
        return moment(this.item.Auctions[0].remain_days).format(
          "hh giờ mm phút"
        );
      }
    },
  },
  watch: {
    isCreateCollapsed: function () {
      this.isCreateCollapsed ? (this.date = new Date()) : (this.date = "");
    },
    date: function () {
      if (this.date !== "") {
        let cur_date = new Date();

        if (this.date.getTime() - cur_date.getTime() > 24 * 3600 * 1000 * 3) {
          this.isDisabled = false;
        } else {
          this.isDisabled = true;
        }
      }
    },
  },
  methods: {
    editItem() {
      this.$emit("edit", this.item);
    },
    deleteItem() {
      this.$emit("delete", this.item);
    },
    createAuction() {
      this.$emit("create", {
        product: this.item,
        date: moment(this.date).format("YYYY-MM-DD hh:mm:ss"),
      });
    },
    intoAuction() {
      this.$emit("auction", this.item)
    },
    intoAffair() {
      this.$emit("affair", this.item)
    },
    restoreItem() {
      this.$emit("restore", this.item);
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
  color: #FD5E53;
}
</style>