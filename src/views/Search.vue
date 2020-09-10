<template>
  <div class="home">
    <!-- welcome -->
    <div class="welcome">
      <p class="welcome-title">
        Kết quả tìm kiếm cho
        <strong style="color: #01d28e;">
          <i>{{ search }}</i>
        </strong>
      </p>
    </div>

    <div class="container">
      <b-tabs expanded type="is-toggle" v-model="index">
        <b-tab-item label="🍎 Buổi đấu giá">
          <div>
            <!-- 404 -->
            <div class="container" v-if="auctions.length === 0">
              <div class="columns is-centered">
                <div class="column is-narrow">
                  <p style="font-size: 70px; text-align: center;">🤷‍♂️</p>
                  <br />
                  <p
                    style="font-size: 20px; text-align: center;"
                  >Chúng tôi không có thứ bạn đang tìm rồi.</p>
                </div>
              </div>
            </div>

            <!-- tabs -->
            <div class="container">
              <!-- filter -->
              <div class="filters columns is-multiline" v-if="auctions.length > 0">
                <div class="column">
                  <p style="font-weight: 700">Sắp xếp theo:</p>
                </div>
                <div class="column">
                  <b-switch v-model="closing" type="is-green">Sắp kết thúc</b-switch>
                </div>
                <div class="column">
                  <b-switch v-model="hottest" type="is-green">Được xem nhiều</b-switch>
                </div>
              </div>
            </div>
            <!-- grid list -->
            <AuctionGridList
              :auctions="auctions.slice(pageIndex * 20, (pageIndex + 1) * 20)"
              :index="pageIndex"
              :totalPage="pageTotal"
              @prev="prev"
              @next="next"
            ></AuctionGridList>

            <b-loading is-full-page v-model="isLoading"></b-loading>
          </div>
        </b-tab-item>
        <b-tab-item label="👱‍♂️ Người dùng">
          <div>
            <!-- 404 -->
            <div class="container" v-if="users.length === 0">
              <div class="columns is-centered">
                <div class="column is-narrow">
                  <p style="font-size: 70px; text-align: center;">🤷‍♂️</p>
                  <br />
                  <p
                    style="font-size: 20px; text-align: center;"
                  >Chúng tôi không có thứ bạn đang tìm rồi.</p>
                </div>
              </div>
            </div>

            <!-- tabs -->
            <div class="container">
              <br/>
              <br/>
              <!-- grid list -->
              <div class="columns is-multiline">
                <div
                  class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen is-2-fullhd"
                  v-for="user in users.slice(pageIndex * 20, (pageIndex + 1) * 20)"
                  :key="user.id"
                >
                  <div
                    @click="$router.push({ path: `/user/id/${user.id}` })"
                    class="user-box"
                    style="background-color: white; box-shadow: 0 2px 8px #00000016; border-radius: 10px; overflow: hidden; transition: .25s; cursor: pointer;"
                  >
                    <div
                      style="width: 100%; height: 180px; background-size: cover; background-position: center; padding: 0;"
                      :style="{backgroundImage: `url(${user.img_url})`}"
                    ></div>
                    <div class="box-content" style="padding: 16px">
                      <p
                        style="font-size: 16px; font-weight: 900; height: 50px; overflow: hidden"
                      >{{ user.name }}</p>
                      <div class="columns is-mobile">
                        <div class="column">
                          <p>{{ user.Addresses[0].province }}</p>
                        </div>
                        <div class="column is-narrow">
                          <p>⭐ {{ user.rate }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <b-loading is-full-page v-model="isLoading"></b-loading>
          </div>
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: ["search"],
  components: {
    AuctionGridList: () => import("@/components/Auction/AuctionGridList"),
  },
  computed: {
    ...mapState({
      auctions: (state) => state.search.auctions,
      users: (state) => state.search.users,
    }),
  },
  data() {
    return {
      pageIndex: 0,
      pageTotal: 0,
      closing: false,
      hottest: false,
      isLoading: true,
      index: 0,
    };
  },
  watch: {
    closing: function () {
      if (this.closing === true) {
        this.hottest = false;

        this.auctions.sort(function (a, b) {
          if (a.remain_time < b.remain_time) {
            return -1;
          } else if (a.remain_time > b.remain_time) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        this.hottest = true;
      }
    },
    hottest: function () {
      if (this.hottest === true) {
        this.closing = false;

        this.auctions.sort(function (a, b) {
          if (a.views < b.views) {
            return -1;
          } else if (a.views > b.views) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        this.closing = true;
      }
    },
    index: function () {
      this.pageIndex = 0;
      this.pageTotal = 0;

      if (this.index === 1 && this.users.length === 0) {
        this.getu(this.search).then(() => {
          this.pageTotal =
            this.users.length % 20 === 0
              ? this.users.length / 20
              : Math.ceil(this.users.length / 20);
        });
      } else if (this.index === 0) {
        this.geta(this.search).then(() => {
          this.pageTotal =
            this.auctions.length % 20 === 0
              ? this.auctions.length / 20
              : Math.ceil(this.auctions.length / 20);
        });
      }
    },
  },
  methods: {
    ...mapActions("search", ["geta", "getu"]),
    prev() {
      window.scrollTo(0, 0);
      --this.pageIndex;
    },
    next() {
      window.scrollTo(0, 0);
      ++this.pageIndex;
    },
    searchItem() {
      this.isLoading = true;

      if (this.index === 0) {
        this.geta(this.search).finally(() => {
          this.isLoading = false;
        });
      }
    },
  },
  async mounted() {
    this.searchItem();
  },
};
</script>

<style scoped>
.user-box:hover {
  box-shadow: 0 4px 16px #00000036;
}
</style>