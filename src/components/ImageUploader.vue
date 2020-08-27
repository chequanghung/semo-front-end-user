<template>
  <div class="uploader-container">
    <b-upload
      type="is-green"
      drag-drop
      :disabled="isDisabled"
      v-model="file"
      accept="image/*"
      @input="upload"
    >
      <img :src="media_url.length > 0 ? media_url : require('@/assets/Placeholder-Icon.png')" />
    </b-upload>
    <transition name="slide-fade">
      <p v-if="isDisabled" style="text-align: center;">Đang tải lên ...</p>
    </transition>
    <div
      class="columns is-centered is-vcentered"
      v-if="index !== undefined"
      style="margin-top: 8px;"
    >
      <div class="column">
        Ảnh số
        <Strong>{{ (no + 1) }}</Strong>
      </div>
      <div class="column is-narrow">
        <b-button type="is-danger" @click="deleteImage">🗑️ Xóa</b-button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import { fb } from "@/firebase";

export default {
  props: ["no", "index", "img_url", "directory", "distributed"],
  mounted() {
    // avoid mutating prop
    this.img_url !== undefined
      ? (this.media_url = this.img_url)
      : (this.media_url =
          "https://files.scottshar.es/Share%20Sheets/app-icons/Placeholder-Icon.png");
    // used in product screen
    if (this.distributed !== undefined) {
      this.file = this.distributed;
      this.upload();
    }
  },
  computed: {
    ...mapState({
      img_dir: (state) => state.user.img_dir,
    }),
  },
  data() {
    return {
      isDisabled: false,
      file: {},
      media_url: "",
    };
  },
  methods: {
    deleteImage() {
      // delete image from firebase
      this.media_url !== undefined &&
      this.media_url !== null &&
      this.media_url.startsWith("https://firebasestorage.googleapis.com/")
        ? fb.storage().refFromURL(this.media_url).delete()
        : "";

      this.media_url = null;

      if (this.index === undefined) {
        this.$emit("set", this.media_url);
      } else {
        this.$emit("set", {
          index: this.index,
          media_url: this.media_url,
        });
      }
    },
    upload() {
      return new Promise((ressolve, reject) => {
        // delete this image from firebase
        this.media_url !== undefined &&
        this.media_url !== null &&
        this.media_url.startsWith("https://firebasestorage.googleapis.com/")
          ? fb.storage().refFromURL(this.media_url).delete()
          : "";

        // upload image
        // generate name and put img on db
        let uploadTask = fb
          .storage()
          .ref(`${this.directory}/${this.file.name}`)
          .put(this.file);

        //   upload progress
        uploadTask.on(
          "state_changed",
          () => {
            this.isDisabled = true;
          },
          (error) => {
            this.$buefy.toast.open({
              message: `${error}`,
              type: "is-danger",
              position: "is-top",
            });
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              if (this.index === undefined) {
                this.$buefy.toast.open({
                  message: `Tải lên thành công.`,
                  type: "is-success",
                  position: "is-top",
                });
              }
              // change url
              this.media_url = downloadURL;
              // set img src with this url
              if (this.index === undefined) {
                this.$emit("set", this.media_url);
              } else {
                this.$emit("set", {
                  index: this.index,
                  media_url: this.media_url,
                });
              }
              this.isDisabled = false;
              //   empty file
              this.file = {};
            });
          }
        );
      });
    },
  },
};
</script>

<style scoped>
img:hover {
  box-shadow: 0 4px 16px #00000029;
  transition: 0.25s;
}

img {
  border-radius: 4px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>