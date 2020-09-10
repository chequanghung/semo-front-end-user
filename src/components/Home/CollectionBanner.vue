<template>
  <div class="container">
    <p class="home-section-title">🌱 Mới nè!</p>
    <div>
      <b-carousel
        class="banner"
        animated="slide"
        has-drag
        autoplay
        pause-hover
        :pause-info="false"
        :interval="5000"
        repeat
      >
        <b-carousel-item
          class="banner-item"
          v-for="(banner, i) in banners"
          :key="i"
          :style="{backgroundImage: 'linear-gradient(rgb(0,0,0,0.7), rgb(1,210,142, 0.3)), url(' + banner.img_url+ ')'}"
        >
          <div class="columns is-vcentered is-centered">
            <div class="column is-two-thirds">
              <p class="banner-title">{{ banner.title }}</p>
              <p class="banner-description">{{ banner.description }}</p>
            </div>
          </div>
        </b-carousel-item>
      </b-carousel>
    </div>

    <!-- collection tiles -->

    <div class="tiles columns is-variable is-2 is-multiline">
      <div class="tile column" v-for="(tile, i) in tiles" :key="i">
        <div
          class="tile"
          :style="{backgroundImage: 'linear-gradient(rgb(0,0,0,0.7), rgb(1,210,142, 0.3)), url(' + tile.img_url+ ')'}"
        >
          <p class="tile-title">{{ tile.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "CollectionBanner",
  //   props: ["collections"],
  watch: {
    collections: function () {
      if (this.collections !== undefined) {
        this.banners = this.collections.slice(0, 5);
        this.tiles = this.collections.slice(5, 10);
      }
    },
  },
  data() {
    return {
      banners: [],
      tiles: [],
    };
  },
  computed: {
    ...mapState({
      collections: (state) => state.home.collections,
    }),
  },
  methods: {
    ...mapActions("home", ["populatehc"]),
  },
};
</script>

<style scoped>
.banner {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
}

.banner-item {
  width: 100%;
  height: 400px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  background-size: cover;
  background-position: center;
}

.banner-title {
  color: white;
  font-family: "Merriweather";
  font-size: 32px;
  font-weight: 900;
  text-align: center;
}

.banner-description {
  color: white;
  font-size: 18px;
  text-align: center;
}

.tiles {
  margin-top: 24px;
}

.tile {
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  height: 100px;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 16px;
}

.tile-title {
  color: white;
  font-size: 16px;
  text-align: left;
  font-weight: 900;
}
</style>