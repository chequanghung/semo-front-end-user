<template>
  <div class="home">
    <!-- container -->
    <div class="landing-form">
      <!-- title -->
      <div class="columns is-centered" style="text-align: left;">
        <div class="form column is-two-fifths">
          <!-- option title -->
          <div class="login-title">
            <p
              class="home-section-title"
              style="margin: 0; font-size: 28px; color: #212121;"
            >Gia nhập đại gia đình</p>
            <img src="@/assets/logo.png" style="height: 28px; margin-left: 10px;" />
          </div>

          <!-- form -->
          <div style="margin-top: 24px;">
            <transition name="stepper">
              <!-- step 1 -->
              <RegisterStep1Phone v-if="step === 1" @next="next"></RegisterStep1Phone>
              <!-- step 2 -->
              <RegisterStep2OTP v-if="step === 2" @next="next" @first="first"></RegisterStep2OTP>
              <!-- step 3 -->
              <RegisterStep3Password v-if="step === 3" @next="next"></RegisterStep3Password>
              <!-- step 4 -->
              <RegisterStep4Information v-if="step === 4" @next="next"></RegisterStep4Information>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Register",
  components: {
    RegisterStep1Phone: () =>
      import("@/components/Register/RegisterStep1Phone"),
    RegisterStep2OTP: () => import("@/components/Register/RegisterStep2OTP"),
    RegisterStep3Password: () => import('@/components/Register/RegisterStep3Password')
  },
  data() {
    return {
      step: 1,
    };
  },
  methods: {
    ...mapActions("register", ["clear"]),

    next() {
      ++this.step;
    },
    prev() {
      --this.step;
    },
    first() {
      this.clear();
      this.step = 1;
    },
  },
};
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-image: url("https://cdn.shopify.com/s/files/1/0222/9446/2560/articles/a4fb537e5e0b96621896e2f158c60b3f.jpg?v=1576830925");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.25s;
}

.login-title {
  display: flex;
  align-items: center;
}

.landing-form {
  margin: auto;
  width: 100%;
  max-width: 1920px;
  transition: 0.25s;
}

.form {
  padding: 40px 24px;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(120%) blur(20px);
  border-radius: 10px;
  box-shadow: 0 2px 8px #00000029;
}

/* transitions */
.stepper-enter-active {
  transition-delay: 0.45s;
}

.stepper-enter-to {
  animation: slideInRight;
  animation-duration: 0.35s;
}

.stepper-leave-to {
  animation: slideOutLeft;
  animation-duration: 0.25s;
}
</style>