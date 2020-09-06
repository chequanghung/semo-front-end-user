<template>
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
</template>

<script>
export default {
  data() {
    return {
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
    };
  },
  methods: {
    next() {
      if (this.index === this.steps.length - 1) {
        this.$emit('close')
      } else {
        // this.index++;
      }
    },
  },
};
</script>

<style scoped>
.instruction-container {
  background-color: #ffffff;
  background-image: url("../assets/BG.png");
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  overflow: hidden;
}
</style>