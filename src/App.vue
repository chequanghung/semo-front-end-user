<template>
  <div id="app">
    <PageTitle class="bar-container" v-if="!isFullpage" :user="user"></PageTitle>
    <PageSubtitle class="bar-container" :menus="menus" v-if="isSubBar"></PageSubtitle>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <transition name="router-view-transition">
      <router-view :key="$route.fullPath" />
    </transition>

    <!-- footer -->
    <div class="columns footer" v-if="!isFullpage">
      <div class="container">
        <div class="columns">
          <div class="column">Thông tin</div>
          <div class="column">Hỏi đáp</div>
          <div class="column">Theo dõi</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";
import moment from 'moment'

export default {
  components: {
    PageTitle: () => import("@/components/PageTitle"),
    PageSubtitle: () => import("@/components/PageSubtitle"),
  },
  watch: {
    $route: function (to, from) {
      this.toggleSubTitle();
      this.toggleFooter();
    },
  },
  data() {
    return {
      menus: [
        {
          title: "🏡 Trang chủ",
          url: "/",
        },
        {
          title: "🎇 Mới nhất",
          url: "/latest",
        },
        {
          title: "🍑 Loại quả",
          url: "/fruit",
        },
        {
          title: "📘 Bộ sưu tập",
          url: "/collection",
        },
      ],
      isSubBar: true,
      isFullpage: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  mounted() {
    // toggle Subtitle and Footer
    this.toggleSubTitle();
    this.toggleFooter();

    // check token
    this.getUserByToken()
  },
  methods: {
    ...mapActions('user', ['getu']),

    toggleSubTitle() {
      if (
        this.$route.fullPath === "/" ||
        this.$route.fullPath === "/latest" ||
        this.$route.fullPath === "/fruit" ||
        this.$route.fullPath === "/collection"
      ) {
        this.isSubBar = true;
      } else {
        this.isSubBar = false;
      }
    },
    toggleFooter() {
      if (
        this.$route.fullPath.indexOf("/register") >= 0 ||
        this.$route.fullPath.indexOf("/login") >= 0 ||
        this.$route.fullPath.indexOf("/create") >= 0
      ) {
        this.isFullpage = true;
      } else {
        this.isFullpage = false;
      }
    },

    getUserByToken() {
      if (localStorage.getItem('token') !== null) {
        this.getu()
        .catch(error => {
          this.$buefy.toast.open({
            type: 'is-danger',
            message: `${error.response.data.message}`
          })
        })
      }
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Roboto:wght@400;500;700;900&display=swap");

/* // app */
#app {
  font-family: "Roboto";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0 auto;
  background-color: #fbfbfb;
  scroll-behavior: smooth;
}

a {
  font-weight: bold;
  color: #01d28e;
}
.router-link-exact-active {
  color: #01d28e;
}

/* // welcome message */
.welcome {
  width: 100%;
  padding: 36px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-title {
  font-size: 23px;
  font-weight: 900;
}

.welcome-img {
  height: 24px;
  margin-left: 10px;
}

/* // home */
/* // section title */
.home-section-title {
  font-weight: 900;
  font-size: 24px;
  color: #b88cd8;
  text-align: left;
  margin-bottom: 16px;
}

/* // container */
.container {
  padding: 0 24px 60px 24px;
  text-align: left;
}

.footer {
  background-color: #fefefe;
}

/* // scrollbar */
/* width */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #70707024;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #01d28e;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #01d28e;
}

/* // transition */
/* // animation for views */
.router-view-transition-enter-active {
  animation: fadeIn 0.25s ease-in;
}

@keyframes fadeIn {
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.router-view-transition-leave-active {
  animation: fadeOut 0.125s ease-in;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #07D390;
$primary-invert: $white;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "green": (#07D390, $white),
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>