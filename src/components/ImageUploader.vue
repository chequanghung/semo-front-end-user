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
      <img :src="img_url ? img_url : '@/assets/Placeholder-Icon.png'" />
    </b-upload>
    <transition name="slide-fade">
      <p v-if="isDisabled" style="text-align: center;">Đang tải lên ...</p>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import { fb } from "@/firebase";

export default {
  props: ["img_url", "directory"],
  computed: {
    ...mapState({
      img_dir: (state) => state.user.img_dir,
    }),
  },
  data() {
    return {
      isDisabled: false,
      file: {},
    };
  },
  methods: {
    upload() {
      return new Promise((ressolve, reject) => {
        // delete this image from firebase
        this.img_url.startsWith("https://firebasestorage.googleapis.com/")
          ? fb.storage().refFromURL(this.img_url).delete()
          : "";

        // upload image
        // generate name and put img on db
        let uploadTask = fb
          .storage()
          .ref(`${this.img_dir}/${this.directory}/${this.file.name}`)
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
              this.$buefy.toast.open({
                message: `Tải lên thành công.`,
                type: "is-success",
                position: "is-top",
              });
              // change url
              this.img_url = downloadURL;
              this.$emit("set", this.img_url);
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