<template>
  <div>
    <form @submit.prevent="submitOTP">
      <p>
        Chúng tôi đã gửi mã xác nhận đến
        <strong>{{ phone }}</strong>.
      </p>
      <p>
        Hãy nhập chính xác đoạn mã
        <strong>6 chữ số</strong> đó nha. 😊
      </p>
      <br />
      <b-field :type="error ? 'is-danger' : ''" :message="error_msg">
        <b-input v-model="otp" placeholder="123 456" maxlength="6" :has-counter="false"></b-input>
      </b-field>
      <br />
      <b-button
        id="sign-up-button"
        native-type="submit"
        label="👉 Tiếp tục"
        :disabled="error === true || otp.length < 6 || disabled === true"
        :loading="loading ? true : false"
        type="is-green"
        rounded
        expanded
      ></b-button>
    </form>

    <hr style="border: 0.25px solid #70707040;" />
    <p
      class="home-section-title"
      style="margin: 0; font-size: 14px; color: #212121; text-align: center;"
    >
      Bạn muốn dùng số điện thoại khác?
      <a @click="$emit('first')">Bấm vào đây để quay lại.</a>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      phone: (state) => state.register.phone,
    }),
  },
  data() {
    return {
      // error message
      error: false,
      error_msg: "",
      // loading
      disabled: false,
      loading: false,
      // otp
      otp: "",
    };
  },
  methods: {
    submitOTP() {
      // start processing
      // disable submit button
      this.disabled = true;
      this.loading = true;

      let vm = this;

      // confirm otp
      window.confirmationResult
        .confirm(this.otp)
        .then(function () {
          // success bubble
          vm.$buefy.toast.open({
            type: "is-success",
            message: `Yê, mã của bạn đúng rồi! 🎉`,
            position: "is-top",
          });
          // move to next
          vm.$emit("next");
        })
        .catch((error) => {
          // error bubble
          switch (error.code) {
            // expired
            case "auth/code-expired":
              this.$buefy.toast.open({
                type: "is-danger",
                message: `Chúng tôi chờ bạn lâu quá. Hãy ấn nút quay lại để nhận mã xác nhận mới nhé. 😴`,
                position: "is-top",
              });
              break;

            // wrong code
            case 'auth/invalid-verification-code':
              this.$buefy.toast.open({
                type: "is-danger",
                message: `Mã này chưa đúng đâu, bạn hãy kiểm tra lại nhé. ❌`,
                position: "is-top",
              });
              break;
          }

          // reset state
          this.disabled = false;
          this.loading = false;
        });
    },
  },
  watch: {
    otp: function () {
      if (this.otp === "") {
        this.error = true;
        this.error_msg = "Hãy điền mã của bạn.";
      } else if (isNaN(this.otp)) {
        this.error = true;
        this.error_msg = "Đoạn mã này chỉ có số thôi nhé.";
      } else {
        this.error = false;
        this.error_msg = "";
      }
    },
  },
};
</script>

<style>
</style>