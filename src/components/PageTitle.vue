<template>
  <div class="bar-container">
    <div class="title-bar columns is-vcentered is-mobile" style="padding: 20px;">
      <div class="column is-2">
        <router-link to="/">
          <img src="@/assets/logo.png" style="margin-left: 0; width: auto; height: auto; max-height: 40px;" />
        </router-link>
      </div>
      <div class="column">
        <b-input
          class="search"
          placeholder="🔍 Tìm kiếm quả ngon"
          rounded
          maxlength="255"
          :has-counter="false"
        ></b-input>
      </div>
      <div class="column is-narrow">
        <router-link
          class="router-link"
          to="/login"
          v-if="Object.keys(user).length === 0"
        >👋 Đăng nhập</router-link>
        <router-link class="router-link" to="/user/info" v-else>
          <div class="columns is-vcentered is-centered">
            <div class="column is-narrow">
              <div class="image is-32x32 user-avatar" :style="{backgroundImage: 'url(' + user.img_url + ')'}">
              </div>
            </div>
            <div class="column is-narrow is-hidden-mobile user-name">
              <p>{{ user.name }}</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: ["user"],
};
</script>

<style scoped>
.bar-container {
  margin: 0 auto;
  padding: 0;
  width: 100%;
  position: sticky;
  top: 0px;
  z-index: 1;
  background-color: #ffffff94;
  backdrop-filter: saturate(180%) blur(20px);
}

.title-bar {
  margin: 0 auto;
  transition: 0.12s;
  height: 68px;
  max-width: 1366px;
}

.search {
  max-width: 600px;
  margin: 0 auto;
}

.router-link {
  color: #707070;
}

.router-link-exact-active {
  color: #01d28e;
}

@media (max-width: 1023px) {
  .user-name {
    display: none;
  }
}

.user-avatar {
  transition: 0.25s;
  border: 0px solid #00000000;
  border-radius: 50%;
  overflow: hidden;
  background-size: cover;
  background-position: center;
}

.router-link-exact-active .user-avatar {
  border: 2px solid #01d28e;
  box-shadow: 0 2px 8px #01d28e49;
}
</style>