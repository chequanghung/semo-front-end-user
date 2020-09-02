<template>
  <div class="container">
    <br />
    <!-- title -->
    <div class="columns is-variable is-3 is-vcentered">
      <!-- product title -->
      <div class="column is-half">
        <div class="title">
          <!-- fruit -->
          <b-button type="is-success is-light" tag="router-link" :to="'/fruit/' + fruit.id">
            <div style="display: flex; align-items: center;">
              <div
                :style="{backgroundImage: `url(${fruit.icon_url})`}"
                style="height: 24px; width: 24px; margin-right: 12px; border-radius: 50%; background-size: cover; background-position: center;"
              ></div>
              <p>{{fruit.title}}</p>
            </div>
          </b-button>
          <!-- title -->
          <p
            class="auction-title active column"
            style="font-family: Merriweather; font-weight: 900; line-height: 48px;"
          >{{auction.title}}</p>
        </div>
        <!-- user -->
        <div class="user">
          <div class="columns">
            <div class="column">
              <div class="columns" style="margin: 0;">
                <div class="column">
                  <div class="columns is-mobile">
                    <div class="column is-narrow">
                      <div
                        class="image is-24x24"
                        :style="{backgroundImage: 'url(' + user.img_url + ')'}"
                        style="background-size: cover; background-position: center; border-radius: 50%;"
                      ></div>
                    </div>
                    <div class="column">
                      <a class="is-text">{{user.name}} ★ {{user.rate}}</a>
                    </div>
                  </div>
                </div>
                <div
                  class="column"
                  style="overflow-wrap: break-word;"
                  v-if="auction !== undefined"
                >Mở đấu giá từ {{format_date(auction.Auctions[0].date_created)}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- remaining time -->
        <div class="remain" style="margin-top: 28px;">
          <div class="columns is-centered">
            <div class="column">
              <data-block v-if="auction !== undefined">
                <template v-slot:title>THỜI GIAN CÒN LẠI</template>
                <template v-slot:content>
                  <p
                    v-if="auction.Auctions[0].remain_days > 0 && auction.Auctions[0].remain_time.split(':')[0] >= 24"
                  >{{auction.Auctions[0].remain_days}} ngày</p>
                  <p
                    v-else
                    style="color: #FD5F54"
                  >{{ format_time(auction.Auctions[0].remain_time) }}</p>
                </template>
              </data-block>
            </div>
          </div>
        </div>
        <!-- place bid -->
        <div
          class="bid"
          style="margin-top: 40px;"
          v-if="auction.user_id !== userInfo.id && auction.Auctions[0].auction_status === 1"
        >
          <div class="columns is-centered is-vcentered is-mobile">
            <div class="column is-narrow">
              <p class="bidnow">Bạn muốn đấu giá sản phẩm này chứ?</p>
            </div>
            <div class="column is-narrow">
              <b-button class="btn" type="is-green" @click="enterBid" rounded>Trả giá ngay</b-button>
              <!-- enterBid -->
            </div>
          </div>

          <!-- warning -->

          <div class="notification is-light is-warning">
            <div class="columns is-mobile">
              <div class="column is-narrow">
                <p>⚠️</p>
              </div>
              <div class="column">
                <p>Giá tiền chưa bao gồm phí vận chuyển.</p>
              </div>
            </div>
          </div>
        </div>
        <!-- info -->
        <div class="highlights" style="margin-top: 40px;">
          <div class="columns is-centered is-mobile">
            <div class="column">
              <data-block>
                <template v-slot:title>SẢN LƯỢNG</template>
                <template v-slot:content>{{auction.weight}} tạ</template>
              </data-block>
            </div>
            <div class="column">
              <data-block v-if="auction !== undefined">
                <template v-slot:title>GIÁ HIỆN TẠI</template>
                <template v-slot:content>{{numberWithCommas(auction.Auctions[0].price_cur)}}đ</template>
              </data-block>
            </div>
            <div class="column">
              <data-block>
                <template v-slot:title>BƯỚC GIÁ</template>
                <template v-slot:content>{{numberWithCommas(auction.price_step)}}đ</template>
              </data-block>
            </div>
          </div>
        </div>
        <div class="column"></div>
      </div>
      <!-- product media -->
      <div class="column is-half">
        <b-carousel
          has-drag
          autoplay
          pause-hover
          :pause-info="false"
          :interval="3000"
          repeat
          class="banners"
        >
          <b-carousel-item v-for="(item, i) in media" :key="i">
            <div
              class="img"
              :style="{backgroundImage: 'url(' + item.media_url + ')'}"
              style="background-color: white; background-position: center; background-size: cover; height: 440px; border-radius: 10px;"
            ></div>
          </b-carousel-item>
        </b-carousel>
      </div>
    </div>

    <!-- divider -->
    <hr />

    <!-- info -->
    <div class="columns is-variable is-3">
      <!-- product info -->
      <div class="column is-half">
        <p class="home-section-title">📦 Thông tin sản phẩm</p>
        <!-- content -->
        <div class="columns is-multiline" style="margin-top: 24px;">
          <!-- cells -->
          <!-- location -->
          <div class="column is-full is-mobile">
            <data-cell>
              <template v-slot:title>VỊ TRÍ</template>
              <template v-slot:content>{{auction.Address.province}}</template>
            </data-cell>
          </div>
          <!-- fruit pct -->
          <div class="column is-full is-mobile">
            <data-cell>
              <template v-slot:title>TỈ LỆ QUẢ</template>
              <template v-slot:content>{{auction.fruit_pct}}%</template>
            </data-cell>
          </div>
          <!-- sugar pct -->
          <div class="column is-full is-mobile">
            <data-cell>
              <template v-slot:title>NỒNG ĐỘ ĐƯỜNG</template>
              <template v-slot:content>{{auction.sugar_pct}}%</template>
            </data-cell>
          </div>
          <!-- sugar pct -->
          <div class="column is-full is-mobile">
            <data-cell>
              <template v-slot:title>CÂN NẶNG TRUNG BÌNH MỖI QUẢ</template>
              <template v-slot:content>{{auction.weight_avg}}g</template>
            </data-cell>
          </div>
          <!-- sugar pct -->
          <div class="column is-full is-mobile">
            <data-cell>
              <template v-slot:title>ĐƯỜNG KÍNH TRUNG BÌNH MỖI QUẢ</template>
              <template v-slot:content>{{auction.diameter_avg}}cm</template>
            </data-cell>
          </div>
          <!-- sugar pct -->
          <div class="column is-full is-mobile">
            <data-cell>
              <template v-slot:title>GIÁ KHỞI ĐIỂM</template>
              <template v-slot:content>{{numberWithCommas(auction.price_init)}}đ</template>
            </data-cell>
          </div>
          <!-- info -->
          <div class="column is-full is-mobile">
            <p class="cell-title">THÔNG TIN CHI TIẾT</p>
          </div>
          <div class="column is-full is-mobile">
            <p class="cell-title">{{auction.notes}}</p>
          </div>
        </div>
      </div>

      <hr />

      <!-- bids -->
      <div class="column is-half">
        <p class="home-section-title">🔨 Ai đã đấu giá?</p>
        <div style="margin-top: 24px;">
          <b-table class="table" :columns="columns" :data="bids" :mobile-cards="false"></b-table>
        </div>
      </div>
    </div>

    <!-- divider -->
    <hr />

    <!-- similar auctions -->
    <div class="similar" style="margin-top: 40px;">
      <auction-carousel-list :auctions="similar" title="🍑 Sản phẩm tương tự"></auction-carousel-list>
    </div>

    <!-- modals -->
    <!-- instruction modal -->
    <b-modal
      :active.sync="isFirstModal"
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <div style="overflow: hidden;">
        <div class="columns is-centered">
          <div class="column is-two-thirds">
            <div class="instruction-container">
              <b-carousel
                v-model="index"
                class="carousel"
                :autoplay="false"
                :has-drag="true"
                :pause-info="true"
                :pause-hover="true"
                :interval="10000"
                :repeat="false"
              >
                <b-carousel-item v-for="(step, i) in steps" :key="i" style="height: 100%;">
                  <section>
                    <div style="display: flex; flex-flow: column; align-items: center;">
                      <p
                        class="home-section-title"
                        style="text-align: center; margin-top: 40px; margin-bottom: 40px;"
                      >{{step.title}}</p>
                      <p style="font-size: 80px;">{{step.icon}}</p>
                      <p
                        class="cell-title"
                        style="text-align: center; margin-top: 40px; word-wrap: break-word; padding-left: 40px; padding-right: 40px; font-weight: 700; margin-bottom: 40px;"
                      >{{step.description}}</p>
                      <b-button
                        v-if="i === steps.length - 1"
                        rounded
                        type="is-green"
                        style="margin-bottom: 40px;"
                        @click="next"
                      >{{step.button}}</b-button>
                    </div>
                  </section>
                </b-carousel-item>
              </b-carousel>
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <!-- bidding modal -->
    <b-modal
      :active.sync="isBiddingModal"
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-modal
    >
      <div class="card">
        <!-- current info -->
        <div class="columns is-mobile">
          <div class="column">
            <!-- current price -->
            <data-block>
              <template v-slot:title>GIÁ HIỆN TẠI</template>
              <template v-slot:content>{{numberWithCommas(auction.Auctions[0].price_cur)}}đ</template>
            </data-block>
          </div>
          <div class="column">
            <!-- step price -->
            <data-block>
              <template v-slot:title>BƯỚC GIÁ</template>
              <template v-slot:content>{{numberWithCommas(auction.price_step)}}đ</template>
            </data-block>
          </div>
        </div>
        <p
          class="cell-title"
          style="text-align: center; margin-top: 24px; font-size: 17px;"
          v-if="auction !== undefined"
        >{{ auction.Auctions[0].remain_days > 0 && auction.Auctions[0].remain_time.split(':')[0] >= 24 ? auction.Auctions[0].remain_days + ' ngày' : format_time(auction.Auctions[0].remain_time) }} | {{bids.length}} lượt đấu giá</p>

        <!-- break -->
        <hr />

        <!-- place bid -->
        <div style="margin-top: 24px;">
          <form @submit.prevent="placeBid">
            <p class="home-section-title">🤑 Trả giá</p>
            <!-- notification -->
            <b-notification
              type="is-danger"
              has-icon
              aria-close-label="Đóng"
              role="alert"
              :active.sync="error"
              class="error-notification"
            >{{error_msg}}</b-notification>
            <div class="columns is-mobile">
              <div class="column">
                <b-input
                  v-if="auction !== undefined"
                  v-model="amount"
                  type="number"
                  :placeholder="(numberWithCommas(auction.Auctions[0].price_cur + auction.price_step)) + 'đ'"
                ></b-input>
              </div>
              <div
                class="column is-one-third-mobile is-one-quarter-tablet is-one-quarter-desktop is-one-fifth-widescreen"
              >
                <b-button
                  :disabled="amount.length === 0"
                  native-type="submit"
                  type="is-green"
                  expanded
                  rounded
                >Đấu giá</b-button>
              </div>
            </div>
          </form>
          <br />
          <div class="columns is-mobile">
            <div class="column is-narrow">
              <div class="columns is-mobile">
                <div class="column is-narrow">
                  <p class="cell-title" style="padding: 0">👛 Ví của bạn:</p>
                </div>
                <div class="column is-narrow">
                  <p class="active">{{ balance }}</p>
                </div>
              </div>
            </div>
            <div class="column"></div>
            <div class="column is-narrow">
              <router-link to="/user/wallet">NẠP TIỀN</router-link>
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <!-- success modal -->
    <b-modal
      :active.sync="isSuccessModal"
      trap-focus
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-modal
    >
      <div class="card" style="width: fit-content;">
        <div class="columns is-centered is-mobile">
          <div class="column">
            <p style="font-size: 80px; text-align: center;">✔️</p>
            <p class="cell-content">Bạn đã đấu giá thành công!</p>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { mapState } from "vuex";

export default {
  components: {
    DataBlock: () => import("@/components/Auction/View/DataBlock"),
    DataCell: () => import("@/components/Auction/View/DataCell"),
    AuctionCarouselList: () =>
      import("@/components/Auction/AuctionCarouselList"),
  },
  props: ["id"],
  async mounted() {
    // set
    this.refreshData();

    this.interval = setInterval(
      function () {
        this.refreshData();
      }.bind(this),
      10000
    );
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    getImgUrl(value) {
      return `https://picsum.photos/id/43${value}/1230/500`;
    },
    close() {
      this.isComponentModalActive = false;
    },
    async refreshData() {
      axios.put(`/auction/view/${this.id}`).then(() => {
        this.getAuctionInfo();
        this.getAuctionBids();
        this.getAuctionSimilar();
      });
    },
    getAuctionInfo() {
      axios.get(`/auction/id/${this.id}`).then((response) => {
        this.auction = response.data;
        // fruit config
        this.fruit = {
          id: this.auction.fruit_id,
          title: this.auction.Fruit.title,
          icon_url: this.auction.Fruit.icon_url || "",
        };

        // user config
        this.user = {
          id: this.auction.User.id,
          name: this.auction.User.name,
          img_url: this.auction.User.img_url,
          rate: this.auction.User.rate,
        };

        // media config
        this.media = this.auction.ProductMedia;
      });
    },
    getAuctionBids() {
      axios.get(`/auction_bid/auction/${this.id}`).then((response) => {
        this.bids = response.data.map((item) => {
          return {
            ...item,
            amount: new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(item.amount),
            date_created: this.format_date(item.date_created),
          };
        });
      });
    },
    getAuctionSimilar() {
      axios.get(`/auction/similar/${this.id}`).then((response) => {
        this.similar = response.data;
      });
    },
    enterBid() {
      if (Object.keys(this.userInfo).length > 0) {
        if (this.userInfo.bids === undefined) {
          axios
            .get(`/auction_bid/countBid/${this.userInfo.id}`)
            .then(({ data }) => {
              this.userInfo.bids = data.times

              if (data.times === 0) {
                this.isFirstModal = true;
              } else {
                this.isBiddingModal = true;
              }
            })
            .catch(error => {
              this.$buefy.toast.open({
                type: 'is-danger',
                message: `Hình như có gì đó sai sai. Mã lỗi: ${error.response.data} 😖`
              })
            })
        } else {
          this.userInfo.bids === 0 ? this.isFirstModal = true : this.isBiddingModal = true;
        }
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    openBid() {
      this.isFirstModal = false;
      this.isBiddingModal = true;
    },
    placeBid() {
      axios
        .post("/auction_bid/", {
          auction_id: this.id,
          bidder_user_id: this.userInfo.id,
          amount: this.amount,
        })
        .then(() => {
          this.refreshData();
          this.isBiddingModal = false;
          this.amount = "";

          this.userInfo.bids++
          //
          this.isBiddingModal = false;
          this.isSuccessModal = true;

          let vm = this;
          setTimeout(function () {
            vm.isSuccessModal = false;
          }, 2500);
        })
        .catch((error) => {
          let prompt = error.response.data.message;

          if (prompt.startsWith("Unknown column")) {
            prompt = prompt.substr(prompt.indexOf(`'`) + 1);
            prompt = prompt.substr(0, prompt.indexOf(`'`) - 1);
          }
          this.$buefy.toast.open({
            message: `${prompt} 😪`,
            type: "is-danger",
            position: "is-top",
          });
        });
    },
    next() {
      if (this.index === this.steps.length - 1) {
        this.isFirstModal = false;
        this.isBiddingModal = true;
      } else {
        // this.index++;
      }
    },
    format_date(value) {
      return moment(String(value)).format("DD/MM/YYYY, HH:MM:SS");
    },
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    format_time(value) {
      let times = value.split(":");
      return `${times[0]} giờ ${times[1]} phút`;
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.user,
      wallet: (state) => state.wallet.wallet,
    }),

    balance: function () {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(this.wallet.amount);
    },
  },
  data() {
    return {
      interval: null,
      index: 0,
      steps: [
        {
          title: "Đấu giá",
          icon: "💡",
          description:
            "Để bạn đấu giá thành công, hãy xem qua hướng dẫn này nhé! Sẽ không lâu đâu.",
          button: "Được luôn!",
        },
        {
          title: "Điều kiện đấu giá",
          icon: "👛",
          description:
            "Hãy đảm bảo ví semo của bạn có đủ 10% giá trị hiện tại của mặt hàng.",
          button: "Tiếp theo",
        },
        {
          title: "Điều kiện đấu giá",
          icon: "👛 💵",
          description:
            "Mỗi lần đấu giá có phí là 150,000đ. Nếu không còn là người trả giá cao nhất, bạn sẽ không mất phí.",
          button: "Tiếp theo",
        },
        {
          title: "Điều kiện đấu giá",
          icon: "💵",
          description:
            "Lần trả giá hợp lệ phải cao hơn giá trị hiện tại một khoảng hơn hoặc bằng bước giá của sản phẩm.",
          button: "Tiếp theo",
        },
        {
          title: "Bạn đã sẵn sàng rồi!",
          icon: "🤗",
          description:
            "Chúc bạn thành công với semo! Hãy liên lạc với chúng tôi nếu có thắc mắc gì.",
          button: "Trả giá ngay!",
        },
      ],
      // modal attrs
      isFirstModal: false,
      isBiddingModal: false,
      isSuccessModal: false,
      amount: "",
      // error
      error: false,
      error_msg: "",
      // bidders table data
      columns: [
        {
          field: "user_name",
          label: "TÊN NGƯỜI DÙNG",
        },
        {
          field: "amount",
          label: "TRẢ GIÁ",
        },
        {
          field: "date_created",
          label: "THỜI GIAN",
          numeric: true,
        },
      ],
      // data for page
      // fruit
      fruit: {
        id: 0,
        title: "",
        icon_url: "",
      },
      // auction host
      user: {},
      // auction info
      auction: {},
      // product media
      media: [],
      // bidders
      bids: [],
      // similar products
      similar: [],
    };
  },
};
</script>

<style scoped>
.table {
  background-color: #ffffff00;
}

.card {
  border-radius: 10px;
  overflow-x: hidden;
  width: 640px;
  padding: 40px;
  margin: 0 auto;
}

.instruction-container {
  background-color: #ffffff;
  background-image: url("../../assets/BG.png");
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  overflow: hidden;
}

.carousel {
  height: 100%;
  width: 100%;
}

/* .cell-title {
  word-wrap: break-word;
  padding-left: 40px;
  padding-right: 40px;
  font-weight: 700;
} */
</style>