<template>
  <div class="container">
    <br />
    <div class="columns">
      <!-- product -->
      <div class="column is-5 is-mobile">
        <div class="columns">
          <AffairProductCard :affair="affair" :product="product"></AffairProductCard>
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
              <div class="chat-content"></div>
              <!-- input -->
              <br />
              <div class="columns is-mobile is-vcentered">
                <div class="column">
                  <b-input v-model="message" placeholder="Nhắn cho đối tác của bạn gì đó ..."></b-input>
                </div>
                <div class="column is-narrow">
                  <b-button type="is-primary" rounded :disabled="isDisabled" @click="sendMsg">✈️ Gửi</b-button>
                </div>
              </div>
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
  components: {
    AffairProductCard: () => import("@/components/Affair/AffairProductCard"),
  },
  computed: {
    ...mapState({
      affair: (state) => state.affair.affair,
      product: (state) => state.affair.product,
      chats: (state) => state.affair.chats,
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
      // isDisabled: true
    };
  },
  methods: {
    ...mapActions("affair", ["populate"]),

    intoContract() {
      this.$router.push({
        name: "Contract",
        params: { id: this.affair.AffairContract.id },
      });
    },
    sendMsg() {
      alert("ok");
    },
  },
  async mounted() {
    this.populate(this.$route.params.id);
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
}
</style>