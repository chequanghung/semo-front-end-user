<template>
  <div class="container">
    <div class="columns is-vcentered is-multiline">
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
          <div class="column is-narrow" style="cursor: pointer;" @click="viewFeedbacks">
            <p class="section-title">ĐÁNH GIÁ</p>
            <p class="section-content">★ {{ user.rate }}</p>
          </div>
          <div class="column is-narrow">
            <p class="section-title">THAM GIA</p>
            <p class="section-content" v-if="user.membership > 0">{{ user.membership }} tháng</p>
            <p class="section-content" v-else>Mới tham gia</p>
          </div>
          <div class="column is-narrow">
            <b-button type="is-danger" @click="logOut">🚪 Đăng xuất</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UserTitle",
  computed: {
    ...mapState({
      user: (state) => state.user.user,
      address: (state) => state.user.address,
    }),
    province: function () {
      if (this.address.length > 0) {
        return this.address[0].province;
      } else {
        return null;
      }
    },
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.go();
    },
    viewFeedbacks() {
      this.$router.push({ path: '/user/feedback' })
    },
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