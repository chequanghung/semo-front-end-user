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
        @click="next"
      ></b-button>
      <b-button
        label="Bỏ qua"
        type="is-text"
        expanded
        @click="next"
      ></b-button>
    </form>
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
      return this.avatar.length === 0 || this.avatar === '' ? true : false
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
      this.editua(url)
      .then(() => {
        this.avatar = url
      })
      .catch(() => {
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