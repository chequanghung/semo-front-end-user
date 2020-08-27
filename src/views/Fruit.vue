<template>
  <div class="home">
    <div class="welcome">
      <p class="welcome-title">
        Những loại quả đang có mặt tại
        <img class="welcome-img" src="../assets/logo.png" />
      </p>
    </div>

    <!-- fruits -->
    <FruitGridList :fruits="fruits.slice(index * 20, (index + 1) * 20)" :notHome="true"></FruitGridList>

    <!-- pagination -->
    <div class="columns is-vcentered is-centered is-mobile">
      <div class="column"></div>
      <div class="column is-narrow">
        <div class="columns is-vcentered is-centered is-mobile">
          <div class="column is-narrow" v-if="index > 0">
            <b-button outlined rounded @click="prev">👈 Trang trước</b-button>
          </div>
          <div class="column is-narrow" v-if="index < pageTotal - 1">
            <b-button outlined rounded @click="next">👉 Trang sau</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
    FruitGridList: () => import("@/components/Fruit/FruitGridList"),
  },
  computed: {
    ...mapState({
      fruits: (state) => state.home.fruits,
    }),
    pageTotal: function() {
        return this.fruits.length % 20 > 0
        ? Math.ceil(this.fruits.length / 20)
        : Math.floor(this.fruits.length / 20);
    }
  },
  data() {
      return {
          index: 0,

      }
  },
  methods: {
      prev() {
          --this.index
      },
      next() {
          ++this.index
      }
  }
};
</script>

<style>
</style>