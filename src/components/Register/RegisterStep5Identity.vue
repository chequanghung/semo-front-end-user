<template>
  <div>
    <form @submit.prevent="submitIdentity">
      <p>Để giao dịch qua semo, hay cho chúng tôi thông tin pháp lý (chứng minh nhân dân/căn cước) của bạn.</p>
      <p>Đừng lo, thông tin này sẽ được giữ hoàn toàn bí mật. 🔒.</p>
      <br />
      <div class="columns is-centered is-mobile">
        <div class="column is-half">
          <b-field label="Mặt trước thẻ*">
            <ImageUploader :img_url="front" :directory="dir" @set="updateFront"></ImageUploader>
          </b-field>
        </div>
        <div class="column is-half">
          <b-field label="Mặt sau thẻ*">
            <ImageUploader :img_url="back" :directory="dir" @set="updateBack"></ImageUploader>
          </b-field>
        </div>
      </div>

      <b-field label="Họ và tên trên thẻ*" label-position="on-border">
        <b-input v-model="name" placeholder="Họ tên" maxlength="255"></b-input>
      </b-field>
      <b-field
        :type="error ? 'is-danger' : ''"
        :message="err_msg"
        label="Số chứng minh nhân dân/căn cước*"
        label-position="on-border"
      >
        <b-input v-model="number" placeholder="Số chứng minh/căn cước" required maxlength="12"></b-input>
      </b-field>
      <b-field label="Ngày cấp*" label-position="on-border">
        <b-datepicker v-model="date" locale="en-GB" placeholder="Ngày cấp" required trap-focus></b-datepicker>
      </b-field>
      <br />
      <b-field label="Nơi cấp*" label-position="on-border">
        <!-- province -->
        <b-autocomplete
          placeholder="Tỉnh/Thành phố"
          :loading="isFetchingP"
          :data="dataP"
          field="title"
          maxlength="255"
          :has-counter="false"
          clearable
          expanded
          required
          validation-message="Đừng bỏ trống chứ!"
          @typing="loadProvince"
          @select="option => province = option"
        >
          <template slot-scope="props">
            <div class="media-content">{{ props.option.title }}</div>
          </template>
          <template slot="empty">Không tìm thấy tỉnh/thành phố nào</template>
        </b-autocomplete>
      </b-field>

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
/* eslint-disable */
import debounce from "debounce";
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    ImageUploader: () => import("@/components/ImageUploader"),
  },
  watch: {
    isDisabled: function() {
      console.log(this.isDisabled)
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
    
    isDisabled: function () {
      let cur_date = new Date();
      if ((this.front === "" ||
        this.back === "" ||
        this.name === "" ||
        this.number === "" ||
        cur_date.getTime() < this.date.getTime() ||
        Object.keys(this.province).length === 0) &&
        this.isLoading === false) {
          return true
        } else {
          return false
        }
    },
    error: function () {
      if (isNaN(this.number)) {
        this.err_msg = "Bạn chỉ được nhập số ở đây thôi! 😧";
        return true;
      } else {
        this.err_msg = "";
        return false;
      }
    },
  },
  data() {
    return {
      dir: "",
      front: "",
      back: "",
      name: "",
      number: "",
      date: new Date(),
      isFetchingP: false,
      dataP: [],
      province: {},
      isLoading: false,
      err_msg: "",
    };
  },
  methods: {
    ...mapActions("user", ["addi"]),
    // load provinces
    loadProvince: debounce(function (province) {
      if (!province.length) {
        this.dataP = [];
        return;
      }

      this.isFetchingP = true;
      axios
        .get("/address/province")
        .then(({ data }) => {
          this.dataP = data.LtsItem.map((item) => ({
            id: item.ID,
            title: item.Title,
          })).filter((option) => {
            return (
              option.title
                .toString()
                .toLowerCase()
                .indexOf(province.toLowerCase()) >= 0
            );
          });
        })
        .catch((error) => {
          this.dataP = [];
          throw error;
        })
        .finally(() => {
          this.isFetchingP = false;
        }, 250);
    }),
    submitIdentity() {
      this.isLoading = true;
      console.log(this.user.id)
      this.addi({
        user_id: this.user.id,
        front_img_url: this.front,
        back_img_url: this.back,
        name: this.name,
        number: this.number,
        date_dist: this.date,
        province_dist: this.province.title,
      })
        .then(() => {
          this.$emit("home");

          this.$buefy.toast.open({
            type: "is-success",
            message: "Cảm ơn bạn. 😋",
          });
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    updateFront(url) {
      this.front = url;
    },
    updateBack(url) {
      this.back = url;
    },
  },
  mounted() {
    this.dir = `/user/${this.user.img_dir}/identity`;
  },
};
</script>

<style scoped>
</style>