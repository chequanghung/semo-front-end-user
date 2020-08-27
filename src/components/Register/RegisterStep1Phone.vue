<template>
  <div>
    <form @submit.prevent="submitPhone">
      <p>Sử dụng số điện thoại của bạn</p>
      <br />
      <b-field :type="error ? 'is-danger' : ''" :message="error_msg">
        <b-input v-model="phone" placeholder="0912 345 678" maxlength="10" :has-counter="false"></b-input>
      </b-field>
      <br />
      <b-button
        id="sign-up-button"
        native-type="submit"
        label="👉 Tiếp tục"
        :disabled="error === true || phone.length < 10 || disabled === true"
        :loading="loading ? true : false"
        rounded
        expanded
      ></b-button>
    </form>

    <hr style="border: 0.25px solid #70707040;" />
    <p
      class="home-section-title"
      style="margin: 0; font-size: 14px; color: #212121; text-align: center;"
    >
      Đã có tài khoản tại semo?
      <router-link to="/login">Bấm vào đây để đăng nhập.</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { fb } from "@/firebase";
import * as firebase from "firebase/app";

export default {
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
  mounted() {
    this.initRecaptcha();
  },
  data() {
    return {
      phone: "",
      // error message
      error: false,
      error_msg: "",
      // loading
      disabled: false,
      loading: false,
      // firebase thingies
      appVerifier: {},
    };
  },
  methods: {
    ...mapActions("register", ["setp"]),

    initRecaptcha() {
      let vm = this;

      // firebase thingies
      fb.auth().languageCode = "vi";
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "sign-up-button",
        {
          size: "invisible",
          callback: function () {},
          "expired-callback": function () {
            vm.$buefy.snackbar.open({
              message:
                "Chờ bạn lâu quá nên mình ngủ rồi. Bấm tải lại trang để đánh thức chúng mình nhé. 😴",
              type: "is-warning",
              position: "is-top",
              indefinite: true,
              actionText: "Tải lại",
              onAction: () => {
                vm.$router.go();
              },
            });
          },
        }
      );
      //
      this.appVerifier = window.recaptchaVerifier;
    },

    submitPhone() {
      // start processing
      // disable submit button
      this.disabled = true;
      this.loading = true;

      // let vm = this;

      // save into vuex
      this.setp(this.phone)
        .then(({ data }) => {
          if (!data.existed) {
            // convert to firebase format
            let fbFormatPhone = `+84${this.phone.substr(1, 9)}`;

            // start firebase auth
            let appVerifier = this.appVerifier;

            let vm = this

            fb.auth()
              .signInWithPhoneNumber(fbFormatPhone, appVerifier)
              .then(function (confirmationResult) {
                window.confirmationResult = confirmationResult;
                // done sending otp
                vm.$buefy.toast.open({
                  type: "is-success",
                  message: `Được rồi, hãy kiểm tra điện thoại của bạn nhé. 📱`,
                  position: "is-top",
                });
                // clear this phone
                vm.phone = "";
                // move to next page
                vm.$emit("next");
              })
              .catch((error) => {
                switch (error.code) {
                  case "auth/too-many-requests":
                    this.$buefy.toast.open({
                      type: "is-danger",
                      message: `Bạn đã thử nhập số điện thoại này quá nhiều lần rồi. Hãy chọn số khác nhé. 😣`,
                      position: "is-top",
                    });
                    break;

                  default:
                    this.$buefy.toast.open({
                      type: "is-danger",
                      message: `Ối xin lỗi, bị lỗi rồi, tại chúng mình đấy. 😥`,
                      position: "is-top",
                    });
                    //
                    this.$buefy.snackbar.open({
                      type: "is-danger",
                      message: `Hãy gửi lỗi này tới chúng mình để được trợ giúp nhé: ${error.message}`,
                      position: "is-top",
                    });
                    break;
                }
                // return normal state for submit button
                this.disabled = false;
                this.loading = false;
                this.$router.go()
              });
          } else {
            this.$buefy.toast.open({
              type: "is-danger",
              message: `Số điện thoại này đã được đăng ký rồi. 😥`,
              position: "is-top",
            });

            // return normal state for submit button
            this.disabled = false;
            this.loading = false;
          }
        })
        .catch((error) => {
          this.$buefy.toast.open({
            type: "is-danger",
            message: `${error.response.data.message}`,
            position: "is-top",
          });
          // return normal state for submit button
          this.disabled = false;
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
</style>