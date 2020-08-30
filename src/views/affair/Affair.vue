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
          <div class="tile is-parent">
            <AffairProductCard :affair="affair" :product="product"></AffairProductCard>
          </div>
        </div>
      </div>
      <!-- status, contract entry, chats and functions -->
      <div class="column">
        <div class="tile is-ancestor">
          <!-- seller to ship -->
          <div class="tile is-vertical is-parent">
            <div class="tile is-child box">
              <!-- status -->
              <p class="home-section-title"></p>
            </div>
          </div>
          <div class="tile is-vertical is-parent">
            <div class="tile is-child box">
              <!-- status -->
              <p class="home-section-title">📋 Hợp đồng</p>
              <p>CHỈNH SỬA CUỐI CÙNG</p>
              <p class="home-section-content">{{ date }}</p>
              <br />
              <div class="columns is-mobile">
                <div class="column"></div>
                <div class="column is-narrow">
                  <b-button type="is-primary" @click="intoContract">👁️ Xem</b-button>
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
              <div class="chat-content">
                <div class="columns is-mobile" v-for="(chat, i) in affair_chats" :key="i">
                  <div class="column is-narrow" v-if="chat.sender_user_id !== user.id">
                    <div class="bubble">
                      <p>{{ chat.content }}</p>
                    </div>
                  </div>
                  <div class="column"></div>
                  <div class="column is-narrow" v-if="chat.sender_user_id === user.id">
                    <div class="bubble you">
                      <p>{{ chat.content }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- input -->
              <br />
              <form @submit.prevent="sendMsg">
                <div class="columns is-mobile is-vcentered">
                  <div class="column">
                    <b-input v-model="message" placeholder="Nhắn cho đối tác của bạn gì đó ..."></b-input>
                  </div>
                  <div class="column is-narrow">
                    <b-button
                      type="is-primary"
                      rounded
                      :disabled="isDisabled"
                      @click="sendMsg"
                    >✈️ Gửi</b-button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";

export default {
  beforeDestroy() {
      this.close()
  },
  components: {
    AffairProductCard: () => import("@/components/Affair/AffairProductCard"),
  },
  computed: {
    ...mapState({
      affair: (state) => state.affair.affair,
      product: (state) => state.affair.product,
      chats: (state) => state.affair.chats,
      user: (state) => state.user.user,
    }),

    date: function () {
      if (this.affair !== undefined && this.affair.AffairContract !== undefined)
        return moment(this.affair.AffairContract.date_updated).format(
          "hh:mm DD/MM/YYYY"
        );
      else return null;
    },

    isDisabled: function () {
      return this.message.length === 0 ? true : false;
    },
  },
  data() {
    return {
      message: "",
      affair_chats: [],
      interval: null,
      // isDisabled: true
    };
  },
  methods: {
    ...mapActions("affair", ["populate", "getcs", "addcs", "close"]),

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
      }).then(() => {
        this.message = "";
      });
    },
    back() {
      this.$router.go(-1);
    },
  },
  async mounted() {
    // console.log(this.affair);
    this.populate(this.$route.params.id).then(() => {
      this.getcs(0);
      this.affair_chats = this.chats;

      // this.interval = setInterval(
      // function () {
      // }.bind(this),
      // 5000
      // );
    });
  },
  watch: {
    chats: function () {
      this.affair_chats = this.chats;
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
}

.bubble {
  color: #707070;
  background-color: #ececec;
  border-radius: 20px 20px 20px 4px;
  padding: 8px 16px;
}

.you {
  color: white;
  background-color: #01d28e;
  border-radius: 20px 20px 4px 20px;
}
</style>