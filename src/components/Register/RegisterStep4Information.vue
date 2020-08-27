<template>
  <div>
    <form @submit.prevent="submitInformation">
      <p>Hãy cho chúng tôi biết thêm về bạn nhé! 😚</p>
      <br />
      <!-- form -->
      <!-- name -->
      <b-field label="Họ và tên" label-position="on-border">
        <b-input v-model="name" maxlength="255"></b-input>
      </b-field>
      <!-- dob and gender -->
      <div class="columns">
        <div class="column">
          <b-field label="Ngày sinh" label-position="on-border">
            <b-datepicker v-model="dob" locale="en-GB" placeholder="Ngày sinh" trap-focus></b-datepicker>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Giới tính" label-position="on-border">
            <div class="columns is-mobile">
              <div class="column">
                <b-radio v-model="gender" native-value="0">Nữ</b-radio>
              </div>
              <div class="column">
                <b-radio v-model="gender" native-value="1">Nam</b-radio>
              </div>
            </div>
          </b-field>
        </div>
      </div>


      <p>Địa chỉ hiện tại của bạn</p>
      <br />
      <!-- address -->
      <div class="form">
        <b-field>
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
        <!-- district -->
        <b-field>
          <b-autocomplete
            placeholder="Quận/Huyện"
            :loading="isFetchingD"
            :data="dataD"
            field="title"
            maxlength="255"
            :has-counter="false"
            clearable
            expanded
            required
            validation-message="Đừng bỏ trống chứ!"
            @typing="loadDistrict"
            @select="option => district = option"
          >
            <template slot-scope="props">
              <div class="media-content">{{ props.option.title }}</div>
            </template>
            <template slot="empty">Không tìm thấy quận/huyện nào</template>
          </b-autocomplete>
        </b-field>
        <!-- ward -->
        <b-field>
          <b-autocomplete
            placeholder="Phường/Xã"
            :loading="isFetchingW"
            :data="dataW"
            field="title"
            :has-counter="false"
            clearable
            expanded
            required
            maxlength="255"
            validation-message="Đừng bỏ trống chứ!"
            @typing="loadWard"
            @select="option => ward = option"
          >
            <template slot-scope="props">
              <div class="media-content">{{ props.option.title }}</div>
            </template>
            <template slot="empty">Không tìm thấy phường/xã nào</template>
          </b-autocomplete>
        </b-field>
        <!-- address info -->
        <b-field>
          <b-input
            v-model="address"
            placeholder="Số nhà, tên đường/phố, làng/ấp"
            maxlength="255"
            :has-counter="false"
            required
            validation-message="Đừng bỏ trống số nhà bạn chứ!"
            expanded
          ></b-input>
        </b-field>
      </div>

      <br />

      <!-- submit -->
      <br />
      <b-button
        id="sign-up-button"
        native-type="submit"
        label="😜 Xong rồi"
        :disabled="isDisabled"
        :loading="isLoading"
        rounded
        expanded
      ></b-button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import debounce from "debounce";
import axios from "axios";

export default {
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
    isDisabled: function () {
      let cur_date = new Date();

      if (
        (this.name === "" ||
        cur_date.getYear() - this.dob.getYear() < 15 ||
        this.address === "" ||
        Object.keys(this.province).length === 0 ||
        Object.keys(this.district).length === 0 ||
        Object.keys(this.ward).length === 0) && this.isLoading === false
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      // fetching for inputs
      isFetchingP: false,
      isFetchingD: false,
      isFetchingW: false,
      // address
      dataP: [],
      dataD: [],
      dataW: [],
      // for v-model
      province: {},
      district: {},
      ward: {},
      address: "",
      // for data
      name: "",
      dob: new Date(),
      gender: 0,
      // for button
      // isDisabled: false,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions("user", ["editui", "adda"]),
    // btn
    // for address fetch
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
    // load districts
    loadDistrict: debounce(function (district) {
      if (!district.length) {
        this.dataD = [];
        return;
      }

      this.isFetchingD = true;
      axios
        .get(`/address/province/${this.province.id}/district`)
        .then(({ data }) => {
          this.dataD = data
            .map((item) => ({
              id: item.ID,
              title: item.Title,
            }))
            .filter((option) => {
              return (
                option.title
                  .toString()
                  .toLowerCase()
                  .indexOf(district.toLowerCase()) >= 0
              );
            });
        })
        .catch((error) => {
          this.dataD = [];
          throw error;
        })
        .finally(() => {
          this.isFetchingD = false;
        });
    }, 250),
    // load ward
    loadWard: debounce(function (ward) {
      if (!ward.length) {
        this.dataW = [];
        return;
      }

      this.isFetchingW = true;
      axios
        .get(`/address/district/${this.district.id}/ward`)
        .then(({ data }) => {
          this.dataW = data
            .map((item) => ({
              id: item.ID,
              title: item.Title,
            }))
            .filter((option) => {
              return (
                option.title
                  .toString()
                  .toLowerCase()
                  .indexOf(ward.toLowerCase()) >= 0
              );
            });
        })
        .catch((error) => {
          this.dataW = [];
          throw error;
        })
        .finally(() => {
          this.isFetchingW = false;
        });
    }, 250),
    // submit data
    async submitInformation() {
      this.isLoading = true

      let vm = this;
      this.submitAddress()
        .then(() => {
          this.submitProfile().then(() => {
            vm.$emit("next");
          });
        })
        .catch(() => {
          this.isLoading = false
          this.$buefy.toast.open({
            type: "is-danger",
            message: "Chúng mình gặp lỗi rồi, bạn hãy thử lại sau nhé. 😥",
            position: "is-top",
          });
        });
    },
    // submit address
    async submitAddress() {
      return this.adda({
        user_id: this.user.id,
        province: this.province.title,
        district: this.district.title,
        ward: this.ward.title,
        address: this.address,
      });
    },
    // submit profile
    async submitProfile() {
      return this.editui({
        id: this.user.id,
        name: this.name,
        gender: this.gender,
        dob: this.dob,
      });
    },
  },
};
</script>

<style scoped>
</style>