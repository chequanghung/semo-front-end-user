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
            >Đăng nhập vào</p>
            <img src="@/assets/logo.png" style="height: 28px; margin-left: 10px;" />
          </div>

          <!-- form -->
          <div style="margin-top: 24px;">
            <form @submit.prevent="submitLogin">
              <b-field :type="error ? 'is-danger' : ''" :message="error_msg">
                <b-input
                  v-model="phone"
                  placeholder="Số điện thoại"
                  type="is-green"
                  maxlength="10"
                  :has-counter="false"
                ></b-input>
              </b-field>
              <b-field
                :validation-message="password.length > 0 ? '' : 'Hãy nhập mật khẩu của bạn.'"
              >
                <b-input
                  v-model="password"
                  placeholder="Mật khẩu"
                  type="password"
                  maxlength="255"
                  password-reveal
                  :has-counter="false"
                ></b-input>
              </b-field>
              <br />
              <b-button
                native-type="submit"
                label="👋 Đăng nhập"
                :disabled="error === true || password === '' || phone === ''"
                :loading="loading ? true : false"
                type="is-green"
                rounded
                expanded
              ></b-button>
              <br />
              <div style="display: flex; justify-content: center;">
                <router-link to="/reset">Quên mật khẩu</router-link>
              </div>
            </form>

            <hr style="border: 0.25px solid #70707040;" />
            <p
              class="home-section-title"
              style="margin: 0; font-size: 14px; color: #212121; text-align: center;"
            >
              Chưa có tài khoản?
              <router-link to="/register">Hãy đăng kí ngay!</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      phone: "",
      password: "",
      // error message
      error: false,
      error_msg: "",
      // loading
      loading: false,
    };
  },
  mounted() {},
  watch: {
    phone: function () {
      if (this.phone === "") {
        this.error = true;
        this.error_msg = "Hãy điền số điện thoại của bạn.";
      } else if (isNaN(this.phone)) {
        this.error = true;
        this.error_msg = "Số điện thoại đang chứa ký tự không hợp lệ.";
      } else if (!this.phone.startsWith("0")) {
        this.error = true;
        this.error_msg = "Hãy sử dụng số điện thoại mã Việt Nam.";
      } else {
        this.error = false;
        this.error_msg = "";
      }
    },
  },
  methods: {
    ...mapActions("user", ["login"]),

    submitLogin() {
      this.loading = true;

      this.login({
        phone: this.phone,
        password: this.password,
      })
        .then(() => {
          this.$router.push({ path: "/" });

          this.$buefy.toast.open({
            duration: 5000,
            message: "Chào mừng bạn đã trở lại. 😍",
            position: "is-top",
            type: "is-success",
          });
        })
        .catch((error) => {
          this.$buefy.toast.open({
            duration: 5000,
            message: `${error.response.data.message} 😥`,
            position: "is-top",
            type: "is-danger",
          });
        })
        .finally(() => {
          this.loading = false;
        });
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
}

.login-title {
  display: flex;
  align-items: center;
}

.landing-form {
  margin: auto;
  width: 100%;
  max-width: 1920px;
}

.form {
  padding: 40px 24px;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(120%) blur(20px);
  border-radius: 10px;
  box-shadow: 0 2px 8px #00000029;
}
</style>