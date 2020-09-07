<template>
  <div class="container">
    <br />
    <div class="columns">
      <div class="column">
        <b-button type="is-danger" outlined @click="back">👈 Quay lại</b-button>
      </div>
    </div>
    <div class="columns">
      <!-- product -->
      <div class="column is-5 is-mobile">
        <div class="tile is-ancestor">
          <div class="tile is-vertical is-parent">
            <div class="tile is-child box">
              <p class="home-section-title">🛒 Người mua</p>
              <div class="columns is-mobile is-vcentered">
                <div
                  class="column is-narrow"
                  v-if="affair !== undefined && affair.buyer !== undefined"
                >
                  <div
                    :style="{backgroundImage: 'url(' + affair.buyer.img_url + ')'}"
                    style="border-radius: 50%; width: 48px; height: 48px; background-size: cover; background-position: center"
                  ></div>
                </div>
                <div class="column" v-if="affair !== undefined && affair.buyer !== undefined">
                  <p class="home-section-title" style="margin-bottom: 0">{{ affair.buyer.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <AffairProductCard :affair="affair" :product="product"></AffairProductCard>
          </div>
        </div>
      </div>
      <!-- status, contract entry, chats and functions -->
      <div class="column is-7">
        <div class="tile is-ancestor">
          <!-- SELLER POPS -->
          <div class="tile is-vertical is-parent">
            <div class="tile is-child box">
              <b-carousel
                has-drag
                animated="slide"
                :autoplay="false"
                style="overflow: visible !important;"
              >
                <!-- highlighting info -->
                <b-carousel-item style="overflow: visible !important;">
                  <!-- status -->
                  <p class="home-section-title">🧾 Thông tin</p>
                  <!-- buyer deposit -->
                  <div class="columns is-mobile" v-if="product">
                    <div class="column">
                      <p class="sub-title">TIỀN CỌC NGƯỜI MUA</p>
                    </div>
                    <div class="column is-narrow">
                      <p class="title">{{ buyer_deposit }}</p>
                    </div>
                  </div>
                  <!-- transportation -->
                  <div class="columns is-mobile" v-if="product">
                    <div class="column">
                      <p class="sub-title">NGÀY VẬN CHUYỂN</p>
                    </div>
                    <div class="column is-narrow">
                      <p class="title">{{ date_shipment }}</p>
                    </div>
                  </div>
                  <!-- buyer transaction -->
                  <div class="columns is-mobile" v-if="product">
                    <div class="column">
                      <p class="sub-title">NGÀY THANH TOÁN</p>
                    </div>
                    <div class="column is-narrow">
                      <p class="title">{{ date_payment }}</p>
                    </div>
                  </div>
                </b-carousel-item>
                <!-- buyer deposit popup -->
                <b-carousel-item
                  style="overflow: visible !important;"
                  v-if="user.id === affair.buyer_user_id"
                >
                  <!-- status -->
                  <p
                    class="home-section-title"
                    v-if="deposit !== undefined && deposit.user_status === 0"
                  >🤝 Trả tiền cọc cho giao kèo</p>
                  <p class="home-section-title" v-else>💚 Tuyệt! Bạn đã hoàn thành tiền cọc rồi!</p>
                  <br />
                  <!-- content -->
                  <div
                    class="columns is-centered"
                    v-if="deposit !== undefined && deposit.user_status === 0"
                  >
                    <div class="column is-narrow">
                      <p
                        class="card-title"
                        style="margin-top: 12px; font-weight: 700;"
                      >Còn: {{ elapsed }} phút</p>
                    </div>
                  </div>
                  <!-- price -->
                  <div class="columns is-mobile">
                    <div class="column">
                      <p>SỐ TIỀN CỌC</p>
                      <p class="deposit-content">{{ money }}</p>
                    </div>
                    <div class="column is-narrow">
                      <p>NGÀY THANH TOÁN</p>
                      <p class="deposit-content">{{ date }}</p>
                    </div>
                  </div>
                  <!-- button -->
                  <div class="columns is-mobile">
                    <div class="column">
                      <p
                        style="font-weight: 700;"
                        v-if="deposit !== undefined && deposit.user_status === 1"
                      >✅ Đã nộp tiền cọc</p>
                    </div>
                    <div class="column is-narrow">
                      <b-button
                        type="is-warning"
                        v-if="deposit !== undefined && deposit.user_status === 0"
                        @click="payDep"
                      >💵 Thanh toán</b-button>
                    </div>
                  </div>
                </b-carousel-item>
                <!-- shipment -->
                <b-carousel-item
                  style="overflow: visible !important;"
                  v-if="user.id !== contract.shipment_user_id && (contract.contract_status === 1 || contract.contract_status === 3) && contract.shipment_date !== null"
                >
                  <!-- status -->
                  <p class="home-section-title">🚚 Xác nhận đã vận chuyển</p>
                  <p>Nếu đối tác của bạn đã vận chuyển, hãy bấm nút xác nhận ở dưới.</p>
                  <br />
                  <div class="columns is-mobile">
                    <div class="column"></div>
                    <div class="column is-narrow">
                      <b-button type="is-green" @click="ship">✅ Tôi đã nhận hàng!</b-button>
                    </div>
                  </div>
                </b-carousel-item>
                <!-- payment -->
                <b-carousel-item
                  style="overflow: visible !important;"
                  v-if="contract.payment_date !== null && contract.shipment_user_id !== null"
                >
                  <!-- status -->
                  <p class="home-section-title">💵 Xác nhận thanh toán</p>
                  <p
                    v-if="user.id === affair.buyer_user_id && (contract.contract_status === 1 || contract.contract_status === 2)"
                  >Hãy chuyển tiền cho người bán thật sớm nhé!</p>
                  <p
                    v-if="user.id === affair.seller_user_id && (contract.contract_status === 1 || contract.contract_status === 2)"
                  >Hãy bấm nút xác nhận dưới đây ngay khi bạn đã nhận được tiền từ đối tác nhé!</p>
                  <p
                    v-if="contract.contract_status === 3 || contract.contract_status === 4 || contract.contract_status === 5"
                  >Thanh toán đã hoàn tất.</p>
                  <br />
                  <!-- total -->
                  <div class="columns is-mobile">
                    <div class="column">
                      <p>TỔNG TIỀN</p>
                      <p class="deposit-content">{{ formatCurrency(totalTransactionFee) }}</p>
                    </div>
                  </div>
                  <!-- notes -->
                  <div
                    class="notification is-light is-info"
                    v-if="contract.shipment_user_id !== null"
                  >
                    <!-- if buyer is in charge of shipment -->
                    <p
                      v-if="contract.shipment_user_id === affair.buyer_user_id && contract.shipment_late_fee !== null"
                    >➖ Giảm {{ formatCurrency(contract.shipment_late_fee) }} tiền vận chuyển.</p>
                    <p
                      v-if="contract.shipment_user_id !== affair.buyer_user_id && contract.shipment_late_fee !== null"
                    >➕ Gồm {{ formatCurrency(contract.shipment_late_fee) }} tiền vận chuyển.</p>
                    <p
                      v-if="Date.parse(contract.payment_date) - Date.now() < 0 && contract.payment_date !== null"
                    >➕ Gồm {{ formatCurrency(contract.payment_late_fee) }} phí thanh toán muộn.</p>
                  </div>
                  <!-- button and msg -->
                  <div class="columns is-mobile">
                    <div class="column">
                      <p
                        v-if="contract.contract_status === 1 || contract.contract_status === 2"
                      >Người bán chưa nhận được tiền</p>
                    </div>
                    <div class="column is-narrow">
                      <b-button
                        type="is-green"
                        v-if="user.id === affair.seller_user_id && (contract.contract_status === 1 || contract.contract_status === 2)"
                        @click="pay"
                      >✅ Tôi đã nhận tiền!</b-button>
                    </div>
                  </div>
                </b-carousel-item>
              </b-carousel>
            </div>
          </div>
          <!-- contract -->
          <div class="tile is-vertical is-parent">
            <div class="tile is-child box">
              <!-- status -->
              <p class="home-section-title">📋 Hợp đồng</p>
              <p>CHỈNH SỬA CUỐI CÙNG</p>
              <p class="home-section-content">{{ date }}</p>
              <br />
              <div class="columns is-mobile is-vcentered">
                <div class="column">
                  <p v-if="isUpdatePending">⚠️ Có cập nhật</p>
                </div>
                <div class="column is-narrow">
                  <b-button
                    :type="isUpdatePending === true ? 'is-warning' : 'is-green'"
                    @click="intoContract"
                  >👁️ Xem</b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tile is-ancestor">
          <div class="tile is-vertical is-parent">
            <div class="tile is-child box">
              <p class="home-section-title">💬 Trò chuyện</p>
              <!-- content -->
              <div class="chat-content" ref="chats">
                <div class="columns is-mobile" v-for="(chat, i) in affair_chats" :key="i">
                  <div class="column is-two-thirds" v-if="chat.sender_user_id !== user.id">
                    <div>
                      <div class="bubble" style="width: fit-content">
                        <p style="width: fit-content;">{{ chat.content }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="column"></div>
                  <div
                    class="column is-two-thirds"
                    style="float: right;"
                    v-if="chat.sender_user_id === user.id"
                  >
                    <div style="float: right;">
                      <div class="bubble you" style="width: fit-content">
                        <p
                          style="word-break: break-all; width: fit-content; text-align: right;"
                        >{{ chat.content }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- input -->
              <br />
              <form @submit.prevent="sendMsg" v-if="contract.contract_status !== 5">
                <div class="columns is-mobile is-vcentered">
                  <div class="column">
                    <b-input v-model="message" placeholder="Nhắn cho đối tác của bạn gì đó ..."></b-input>
                  </div>
                  <div class="column is-narrow">
                    <b-button
                      type="is-green"
                      rounded
                      icon-left="send"
                      :disabled="isDisabled"
                      @click="sendMsg"
                    >Gửi</b-button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- function -->
        <div
          class="tile is-ancestor"
          v-if="contract.contract_status === 4 && user.id === affair.buyer_user_id"
        >
          <div class="tile is-vertical is-parent">
            <div class="tile is-child box">
              <p class="home-section-title">⚙️ Chức năng</p>
              <!-- complete affair -->
              <div class="columns is-mobile">
                <div class="column"></div>
                <div class="column is-narrow">
                  <b-button type="is-green" @click="finish">✅ Hoàn thành giao kèo</b-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tile is-ancestor" v-if="contract.contract_status === 5">
          <div class="tile is-vertical is-parent">
            <div class="tile is-child box">
              <p
                class="home-section-title"
                style="margin: 0; text-align: center;"
              >🎉 Giao kèo đã hoàn thành!</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      :active.sync="isRate"
      trap-focus
      aria-role="dialog"
      aria-modal
      destroy-on-hide
      style="width: auto;"
    >
      <AffairRatingModal style="margin: auto;" @close="isRate = false"></AffairRatingModal>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  beforeDestroy() {
    clearInterval(this.interval);
  },
  components: {
    AffairProductCard: () => import("@/components/Affair/AffairProductCard"),
    AffairRatingModal: () => import("@/components/Affair/AffairRatingModal"),
  },
  computed: {
    ...mapState({
      affair: (state) => state.affair.affair,
      product: (state) => state.affair.product,
      contract: (state) => state.affair.contract,
      update: (state) => state.affair.update,
      chats: (state) => state.affair.chats,
      user: (state) => state.user.user,
    }),

    totalTransactionFee: function () {
      let baseAmount = this.product.price_cur;

      // if the buyer is in charge of shipping
      if (this.contract.shipment_user_id === this.affair.buyer_user_id) {
        baseAmount -= this.contract.shipment_late_fee || 0;
      } else {
        baseAmount += this.contract.shipment_late_fee || 0;
      }

      // if the transaction is late behind payment deadline
      if (Date.parse(this.contract.payment_date) - Date.now() > 0) {
        baseAmount += this.contract.payment_late_fee || 0;
      }

      return baseAmount;
    },

    deposit: function () {
      return this.affair.Deposit;
    },

    money: function () {
      if (this.affair !== undefined && this.affair.Deposit !== undefined) {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(this.affair.Deposit.amount);
      } else {
        return null;
      }
    },
    deadline: function () {
      return Date.parse(this.affair.Deposit.date_created) + 1000 * 60 * 60 * 48;
    },
    elapsed: function () {
      let deadline = moment(this.deadline);
      let now = moment(new Date());
      let diff = now.diff(deadline);

      return moment.utc(diff).format("HH giờ mm");
    },
    warning: function () {
      return this.deadline - new Date().getTime() <= 1000 * 60 * 60 * 24
        ? true
        : false;
    },
    deadlineDate: function () {
      return moment(this.deadline + 1000 * 60 * 60 * 48).format("DD-MM-YYYY");
    },

    date: function () {
      if (this.affair !== undefined && this.affair.AffairContract !== undefined)
        return moment(this.contract.date_updated)
          .tz("Asia/Ho_Chi_Minh")
          .format("HH:mm DD/MM/YYYY");
      else return null;
    },

    buyer_deposit: function () {
      if (this.deposit !== undefined) {
        return this.deposit.user_status === 0
          ? "Chưa hoàn thành"
          : "Đã hoàn thành";
      } else {
        return "Chưa hoàn thành";
      }
    },

    date_shipment: function () {
      return this.contract.shipment_date !== null
        ? this.contract.contract_status === 2 ||
          (this.contract.contract_status === 4 &&
            this.contract.contract_status !== 9)
          ? "Hoàn thành"
          : moment(this.contract.shipment_date)
              .tz("Asia/Ho_Chi_Minh")
              .format("DD-MM-YYYY")
        : "Chưa thỏa thuận";
    },

    date_payment: function () {
      return this.contract.payment_date !== null
        ? this.contract.contract_status === 3 ||
          (this.contract.contract_status === 4 &&
            this.contract.contract_status !== 9)
          ? "Hoàn thành"
          : moment(this.contract.payment_date)
              .tz("Asia/Ho_Chi_Minh")
              .format("DD-MM-YYYY")
        : "Chưa thỏa thuận";
    },

    isDisabled: function () {
      return this.message.length === 0 ? true : false;
    },

    isUpdatePending: function () {
      if (
        Object.keys(this.update).length > 0 &&
        this.contract.date_updated < this.update.date_updated
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      message: "",
      affair_chats: [],
      interval: null,
      isRate: false,
      // isDisabled: true
    };
  },
  methods: {
    ...mapActions("affair", [
      "populate",
      "getcs",
      "addcs",
      "close",
      "changec",
      "completea",
    ]),
    ...mapActions("wallet", ["payd"]),

    formatCurrency(currency) {
      return currency !== null
        ? new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(currency)
        : new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(0);
    },
    intoContract() {
      clearInterval(this.interval);
      this.$router.push({
        name: "Contract",
        params: { id: this.affair.AffairContract.id },
      });
    },
    sendMsg() {
      // alert("ok");
      this.addcs({
        affair_id: this.affair.id,
        sender_user_id: this.user.id,
        content: this.message,
        date_created: moment(new Date()).format("YYYY-DD-MM HH:mm:ss"),
      })
        .then(() => {
          this.message = "";
        })
        .finally(() => {
          let vm = this;
          // scroll to bottom of the chat section
          setTimeout(function () {
            let chatWindow = vm.$refs.chats;
            chatWindow.scrollTop = chatWindow.scrollHeight;
          }, 500);
        });
    },
    back() {
      clearInterval(this.interval);

      this.close();
      this.$router.go(-1);
    },
    // ship
    ship() {
      this.changec({
        id: this.contract.id,
        status: "SHIP",
      })
        .then(() => {
          this.$buefy.toast.open({
            type: "is-success",
            message: "Tuyệt! 😍",
          });
        })
        .catch((error) => {
          this.$buefy.toast.open({
            type: "is-danger",
            message: `${error.data.message}`,
          });
        });
    },
    // pay
    pay() {
      this.changec({
        id: this.contract.id,
        status: "PAY",
      })
        .then(() => {
          this.$buefy.toast.open({
            type: "is-success",
            message: "Tuyệt! 😍",
          });
        })
        .catch((error) => {
          this.$buefy.toast.open({
            type: "is-danger",
            message: `${error.data.message}`,
          });
        });
    },
    // pay deposit
    payDep() {
      this.payd({
        id: this.affair.Deposit.id,
        amount: this.affair.Deposit.amount,
      })
        .then((response) => {
          this.$buefy.toast.open({
            type: "is-success",
            message: `${response.data.message}`,
          });

          this.deposit.user_status = 1;
        })
        .catch((error) => {
          this.$buefy.toast.open({
            type: "is-danger",
            message: `${error.message}`,
          });
        });
    },
    // finish
    finish() {
      this.isRate = true;

      this.completea().then(() => {
        this.$buefy.toast.open({
          type: "is-success",
          message: "Chúc mừng bạn đã hoàn thành giao kèo! 😍",
        });
      });
    },
  },
  async mounted() {
    // console.log(this.affair);
    let vm = this;

    this.interval = setInterval(
      function () {
        vm.populate(this.$route.params.id)
          .then(() => {
            vm.getcs();

            // scroll to bottom of the chat section
            setTimeout(function () {
              let chatWindow = vm.$refs.chats;
              chatWindow.scrollTop = chatWindow.scrollHeight;
            }, 500);
          })
          .catch((error) => {
            console.info(error);

            vm.$buefy.toast.open({
              type: "is-danger",
              message: "Oh no!",
            });
          });
      }.bind(this),
      4000
    );
  },
  watch: {
    chats: function () {
      this.affair_chats = this.chats;
    },
    affair: function () {
      if (this.affair.affair_status === 2) {
        clearInterval(this.interval);
      }
    },
  },
};
</script>

<style scoped>
.home-section-content {
  color: #b88cd8;
  font-size: 20px;
  font-weight: 700;
}

.chat-content {
  height: 480px;
  overflow-y: scroll;
  padding: 0 12px;
  scroll-behavior: smooth;
}

.bubble {
  color: #707070;
  background-color: #ececec;
  border-radius: 20px 20px 20px 20px;
  padding: 8px 16px;
}

.you {
  color: white;
  background-color: #01d28e;
}

.title {
  font-family: "Roboto";
  color: #01d28e;
  font-weight: 700;
  font-size: 18px;
}

.sub-title {
  font-family: "Roboto";
  color: #707070;
  font-weight: 500;
}

.deposit-section-title {
  color: #b88cd8;
  font-weight: 900;
  font-size: 18px;
}

.not {
  color: #07d390;
}

.deposit-content {
  font-weight: 900;
  font-size: 24px;
}
</style>