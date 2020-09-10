<template>
  <div class="container">
    <b-loading v-model="isLoading" :is-full-page="false"></b-loading>
    <!-- 404 -->
    <div class="container" v-if="isLoading === false && user === null">
      <div class="columns is-centered">
        <div class="column is-narrow">
          <p style="font-size: 70px; text-align: center;">🤷‍♂️</p>
          <br />
          <p style="font-size: 20px; text-align: center;">Chúng tôi không có thứ bạn đang tìm rồi.</p>
        </div>
      </div>
    </div>

    <!-- content -->
    <!-- welcome -->
    <div class="columns is-vcentered is-multiline" v-if="user !== undefined && user !== null">
      <div class="column">
        <div class="columns is-vcentered is-centered is-mobile">
          <div class="column is-narrow">
            <div
              class="image is-64x64 user-avatar"
              :style="{backgroundImage: user.img_url ? `url(${user.img_url})` : `url('https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png')`}"
            ></div>
          </div>
          <div class="column is-narrow">
            <p class="title">{{ user.name }}</p>
            <p class="subtitle">{{ province }}</p>
          </div>
        </div>
      </div>
      <hr />
      <div class="column">
        <div class="columns is-vcentered is-centered is-mobile">
          <div class="column is-narrow">
            <p class="section-title">ĐÁNH GIÁ</p>
            <p class="section-content">★ {{ user.rate }}</p>
          </div>
          <div class="column is-narrow">
            <p class="section-title">THAM GIA</p>
            <p class="section-content" v-if="user.membership > 0">{{ user.membership }} tháng</p>
            <p class="section-content" v-else>Mới tham gia</p>
          </div>
        </div>
      </div>
    </div>

    <!-- auctions -->
    <!-- 404 -->
    <div
      class="container"
      v-if="isLoading === false && user !== undefined && user !== null && auctions.length === 0"
    >
      <div class="columns is-centered">
        <div class="column is-narrow">
          <p style="font-size: 70px; text-align: center;">🤷‍♂️</p>
          <br />
          <p style="font-size: 20px; text-align: center;">Người dùng này không mở buổi đấu giá nào.</p>
        </div>
      </div>
    </div>

    <div class="welcome" v-if="auctions.length > 0">
      <p class="welcome-title">Các buổi đấu giá do người dùng đang mở</p>
    </div>
    <!-- content -->
    <AuctionGridList
      :auctions="auctions.slice(index * 20, (index + 1) * 20)"
      :index="index"
      :totalPage="totalPage"
      @prev="--index"
      @next="++index"
    ></AuctionGridList>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  components: {
    AuctionGridList: () => import("@/components/Auction/AuctionGridList"),
  },
  computed: {
    province: function () {
      if (
        this.user !== undefined &&
        this.user.Addresses !== undefined &&
        this.user.Addresses !== null &&
        this.user.Addresses.length > 0
      ) {
        return this.user.Addresses[0].province;
      } else {
        return null;
      }
    },
    totalPage: function () {
      if (this.auctions.length === 0) {
        return 0;
      } else {
        if (this.auctions.length % 20 > 0) {
          return Math.ceil(this.auctions.length / 20);
        } else {
          return this.auctions.length / 20;
        }
      }
    },
  },
  data() {
    return {
      user: {},
      auctions: [],
      index: 0,
      isLoading: false,
    };
  },
  methods: {
    getUser() {
      this.isLoading = true;

      // get user profile
      axios
        .get(`/user/profile/${this.id}`)
        .then(({ data }) => {
          this.user = data.user;
          this.auctions = data.auctions;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  async mounted() {
    this.getUser();
  },
};
</script>

<style scoped>
.container {
  text-align: left;
  padding: 24px 0;
}

.title {
  font-family: Merriweather;
  font-weight: 900;
  font-size: 19px;
  color: #01d28e;
}

.subtitle {
  font-family: Roboto;
  font-size: 15px;
}

.section-title {
  font-family: Roboto;
  font-size: 13px;
}

.section-content {
  font-family: Roboto;
  font-size: 20px;
  font-weight: 700;
  color: #b88cd8;
}

.user-avatar {
  overflow: hidden;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}
</style>