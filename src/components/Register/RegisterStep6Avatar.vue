<template>
  <div>
    <form @submit.prevent="next">
      <p>Hãy chọn một ảnh đẹp nhất để mọi người ghi nhớ đến bạn. 👧👦👩‍🦰👱‍♂️</p>
      <br />
      <div class="columns is-centered is-mobile">
        <div class="column is-half">
          <b-field label="Ảnh đại diện">
            <ImageUploader :img_url="avatar" :directory="dir" @set="updateAvatar"></ImageUploader>
          </b-field>
        </div>
      </div>

      <br />
      <b-button
        native-type="submit"
        label="Đến với semo nào!"
        :disabled="isDisabled"
        :loading="isLoading"
        rounded
        type="is-green"
        expanded
      ></b-button>
      <b-button
        label="Bỏ qua"
        type="is-light"
        @click="next"
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
/* eslint-disable */
import debounce from "debounce";
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    ImageUploader: () => import("@/components/ImageUploader"),
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
    isDisabled: function() {
      return this.avatar === '' ? true : false
    }
  },
  data() {
    return {
      dir: "",
      avatar: "",
    };
  },
  methods: {
    ...mapActions("user", ["addi", "editua"]),
    // load provinces
    updateAvatar(url) {
      this.editua(url).catch(() => {
        this.$buefy.toast.open({
          type: "is-error",
          message: "Úi, hãy thử lại sau nhé. 😪",
        });
      });
    },
    next() {
      this.$router.push({ path: '/' })
    }
  },
  mounted() {
    this.dir = `/user/${this.user.img_dir}/avatar`;
  },
};
</script>

<style scoped>
</style>