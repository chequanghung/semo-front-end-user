<template>
  <div>
    <form @submit.prevent="submitPassword">
      <p>Đặt mật khẩu cho tài khoản của bạn. 🔑</p>
      <br />
      <b-field label="Mật khẩu mới" label-position="on-border">
        <b-input type="password" v-model="new_password" password-reveal maxlength="255"></b-input>
      </b-field>
      <b-field label="Nhập lại mật khẩu mới" label-position="on-border">
        <b-input type="password" v-model="new_password_conf" password-reveal maxlength="255"></b-input>
      </b-field>

      <div class="tile is-ancestor notification is-light is-vertical">
        <p class="section-title">Điều kiện đặt mật khẩu</p>
        <br />
        <div class="requirement" style="display: flex; align-items: center;">
          <p v-if="isLong === false">❌</p>
          <p v-else>✔️</p>
          <p
            :class="{'failed': isLong === false, 'success': isLong === true}"
            style="margin-left: 12px;"
          >Dài 8 đến 25 ký tự.</p>
        </div>
        <div class="requirement" style="display: flex; align-items: center;">
          <p v-if="isChar === false">❌</p>
          <p v-else>✔️</p>
          <p
            :class="{'failed': isChar === false, 'success': isChar === true}"
            style="margin-left: 12px;"
          >Bao gồm chữ in thường, chữ in hoa và chữ số.</p>
        </div>
        <div class="requirement" style="display: flex; align-items: center;">
          <p v-if="isSimilar === false">❌</p>
          <p v-else>✔️</p>
          <p
            :class="{'failed': isSimilar === false, 'success': isSimilar === true}"
            style="margin-left: 12px;"
          >Khác mật khẩu cũ và nhập lại mật khẩu giống với mật khẩu mới.</p>
        </div>
      </div>

      <br />
      <b-button
        id="sign-up-button"
        native-type="submit"
        label="🙌 Tạo tài khoản"
        :disabled="isDisabled"
        :loading="isLoading"
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
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      new_password: "",
      new_password_conf: "",
      isLong: false,
      isChar: false,
      isSimilar: false,
      isDisabled: true,
      isLoading: false,
    };
  },
  watch: {
    new_password: function () {
      this.new_password.length >= 8 && this.new_password.length <= 25
        ? (this.isLong = true)
        : (this.isLong = false);
      this.new_password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/g)
        ? (this.isChar = true)
        : (this.isChar = false);
      this.new_password === this.new_password_conf
        ? (this.isSimilar = true)
        : (this.isSimilar = false);
      this.isLong === true && this.isChar === true && this.isSimilar === true
        ? (this.isDisabled = false)
        : (this.isDisabled = true);
    },
    new_password_conf: function () {
      this.new_password.length >= 8 && this.new_password.length <= 25
        ? (this.isLong = true)
        : (this.isLong = false);
      this.new_password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/g)
        ? (this.isChar = true)
        : (this.isChar = false);
      this.new_password === this.new_password_conf
        ? (this.isSimilar = true)
        : (this.isSimilar = false);
      this.isLong === true && this.isChar === true && this.isSimilar === true
        ? (this.isDisabled = false)
        : (this.isDisabled = true);
    },
  },
  methods: {
      ...mapActions('register', ['createu']),
      ...mapActions('user', ['login']),
    submitPassword() {
        this.createu(this.new_password)
        .then(({ data }) => {
            // success bubble
            this.$buefy.toast.open({
                type: 'is-success',
                message: `${data.message}`,
            })
            // 
        })
    },
  },
};
</script>

<style>
</style>