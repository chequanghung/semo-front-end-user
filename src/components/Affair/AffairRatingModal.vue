<template>
  <div class="card-container">
    <p class="home-section-title">⭐ Đánh giá đối tác</p>
    <!-- content -->
    <!-- buyer info -->
    <div class="columns is-centered is-mobile is-vcentered" style="margin: 0;">
      <div class="column is-narrow">
        <div
          style="width: 40px; height: 40px; border-radius: 50%; background-size: cover; background-position: center;"
          :style="{backgroundImage: `url(${affair.seller.img_url})`}"
        ></div>
      </div>
      <div class="column is-narrow">
        <p class="home-section-title">{{ affair.seller.name }}</p>
      </div>
    </div>

    <hr style="margin: 8px 0 24px 0;"/>

    <!-- rate -->
    <p
      class="section-title"
      style="text-align: center; font-size: 18px; font-weight: 700;"
    >Đánh giá đối tác của bạn</p>
    <b-rate style="display: flex; justify-content: center; margin-top: 8px;" v-model="rate"></b-rate>

    <br/>

    <!-- description -->
    <p
      class="section-title"
      style="text-align: center; font-size: 18px; font-weight: 700;"
    >Hãy cho đối tác của bạn ý kiến</p>
    <b-field style="margin-top: 12px;">
        <b-input placeholder="Hãy đóng góp ý kiến cho tôi ..." expanded maxlength="255" v-model="description"></b-input>
    </b-field>

    <!-- button -->
    <b-button type="is-green" @click="feedback" expanded>✈️ Gửi phản hồi</b-button>
    <b-loading :is-full-page="false" v-model="isLoading"></b-loading>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      affair: (state) => state.affair.affair,
      user: (state) => state.user.user,
    }),
  },
  data() {
    return {
      rate: 0,
      description: '',
      isLoading: false,
    };
  },
  methods: {
      ...mapActions ('affair', ['createf']),

      feedback () {
          this.isLoading = true

          this.createf({
              rater_user_id: this.user.id,
              rated_user_id: this.affair.seller.id,
              rate: this.rate,
              description: this.description,
          })
          .then(({ data }) => {
              this.$buefy.toast.open({
                  type: 'is-success',
                  message: `${data.message}`
              })

              this.$emit('close')
          })
          .catch(() => {
              this.$buefy.toast.open({
                  type: 'is-danger',
                  message: 'Úi, gặp lỗi rồi. Bạn thử lại sau nhé. 😪'
              })
          })
          .finally(() => {
              this.isLoading = false
          })
      },
  }
};
</script>

<style scoped>
.card-container {
  max-width: 640px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px #00000016;
  padding: 40px 24px;
}
</style>