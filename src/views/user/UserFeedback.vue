<template>
  <div class="container">
    <br />
    <br />
    <div class="columns is-mobile is-vcentered">
      <div class="column is-narrow">
        <b-button type="is-danger" outlined @click="$router.go(-1)">👈 Quay lại</b-button>
      </div>
      <div class="column">
        <p class="home-section-title" style="margin: 0;">⭐ Đánh giá</p>
      </div>
      <div class="column is-narrow">
          <p v-if="!isLoading">{{ feedbacks.length }} đánh giá | ★ {{ user.rate }}</p>
      </div>
    </div>

    <div v-if="isLoading" class="tile is-ancestor is-vertical">
      <div class="tile is-parent" v-for="i in media" :key="i">
        <div class="tile is-child box">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <b-skeleton circle width="64px" height="64px"></b-skeleton>
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <b-skeleton active></b-skeleton>
                  <b-skeleton height="80px"></b-skeleton>
                </p>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item">
                    <span class="icon is-small">
                      <b-skeleton></b-skeleton>
                    </span>
                  </a>
                  <a class="level-item">
                    <span class="icon is-small">
                      <b-skeleton></b-skeleton>
                    </span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
        </div>
      </div>
    </div>

    <div class="tile is-ancestor" v-if="isLoading === false">
      <div class="tile is-parent is-vertical" v-if="feedbacks.length > 0">
        <div
          class="tile is-child box"
          v-for="fb in feedbacks.slice(index * 6, (index + 1) * 6)"
          :key="fb.id"
        >
          <div class="columns is-mobile">
            <!-- avatar -->
            <div class="column is-narrow">
              <div
                style="margin: 0; width: 64px; height: 64px; border-radius: 50%; background-size: cover; background-position: center;"
                :style="{backgroundImage: `url(${fb.User.img_url})`}"
                @click="$router.push({ name: 'UserView', params: { id: fb.User.id }})"
              ></div>
            </div>
            <!-- content -->
            <div class="column">
              <div class="columns is-mobile is-vcentered" style="margin: 0">
                <div class="column is-narrow">
                  <p
                    style="font-weight: 700; color: #01d28e; font-size: 20px;"
                    @click="$router.push({ name: 'UserView', params: { id: fb.User.id }})"
                  >{{ fb.User.name }}</p>
                </div>
                <div class="column">
                  <b-rate disabled v-model="fb.rate"></b-rate>
                </div>
                <div class="column is-narrow">
                  <p>{{ formatDate(fb.date_created) }}</p>
                </div>
              </div>
              <br />
              <div class="columns" style="padding-top: 0">
                <div class="column" style="padding-top: 0">
                  <div class="column" style="padding-top: 0">
                    <p>{{ fb.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- navigation -->
        <div class="columns is-mobile">
          <div class="column">
            <b-button @click="--index" v-if="index > 0">👈 Trang trước</b-button>
          </div>
          <div class="column">
            <b-button @click="++index" v-if="index < totalIndex - 1">👉 Trang sau</b-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 404 -->
    <div v-else>
      <div class="columns is-centered">
        <div class="column is-narrow">
          <p style="font-size: 70px; text-align: center;">🤷‍♂️</p>
          <br />
          <p
            style="font-size: 20px; text-align: center;"
          >Ở đây chưa có gì, tham gia giao kèo và đối tác sẽ góp ý cho bạn.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  computed: {
    ...mapState({
      feedbacks: (state) => state.user.feedbacks,
      user: state => state.user.user
    }),
    totalIndex: function () {
      return this.feedbacks.length % 6 === 0
        ? this.feedbacks.length / 6
        : Math.ceil(this.feedbacks.length / 6);
    },
  },
  data() {
    return {
      isLoading: true,
      media: 3,
      index: 0,
    };
  },
  methods: {
    ...mapActions("user", ["getfs"]),

    formatDate(date) {
      return moment(date).format("HH:mm DD-MM-YYYY");
    },
  },
  async mounted() {
    this.isLoading = true;

    this.getfs().then(() => {
      this.isLoading = false;
    });
  },
};
</script>

<style scoped>
</style>