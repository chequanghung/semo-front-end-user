<template>
  <div class="cell-container" :class="{'editing': editMode}">
    <div class="columns is-vcentered is-mobile">
      <div class="column" @click="edit">
        <p class="cell-content">{{ title }}</p>
      </div>
      <div class="column is-narrow" v-if="editMode === false" @click="edit">
        <!-- content -->
        <p class="cell-content" v-if="user === undefined">{{ content }}</p>
        <!-- user -->
        <div class="columns is-vcentered is-mobile is-variable is-2" style="padding: 0;" v-else>
          <div class="column is-narrow">
            <div
              class="image is-24x24"
              style="border-radius: 50%; background-size: cover; background-position: center;"
              :style="{backgroundImage: 'url(' + user.img_url + ')'}"
            ></div>
          </div>
          <div class="column is-narrow">
            <p class="cell-content">{{ user.name }}</p>
          </div>
        </div>
      </div>
      <div class="column" v-if="editMode === true">
        <div class="columns is-mobile">
          <div class="column">
            <b-field v-if="content !== undefined">
              <b-input v-model="contentEdit" type="number" expanded></b-input>
            </b-field>
            <b-field v-if="date !== undefined">
              <b-datepicker locale="en-GB" v-model="dateEdit"></b-datepicker>
            </b-field>
          </div>
          <div class="column is-narrow">
            <b-button @click="submit">🖊️ Xong</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "content", "user", "date"],
  data() {
    return {
      editMode: false,
      contentEdit: "",
      dateEdit: "",
    };
  },
  mounted() {
    this.content !== undefined ? (this.contentEdit = this.content) : "";
    this.date !== undefined ? (this.date instanceof Date ? this.dateEdit = this.date : this.dateEdit = new Date()) : "";
    this.user !== undefined ? (this.userEdit = this.user) : "";
  },
  methods: {
    edit() {
      this.editMode ? "" : (this.editMode = !this.editMode);
    console.log(this.editMode)
    },
    submit() {
      // check type
      if (this.date) {
        console.log('pk')
        this.submitDate()
      }
      // turn off edit mode
      this.editMode = false
    },
    submitDate () {
      this.$emit('changeDate', this.dateEdit)
    } 
  },
};
</script>

<style scoped>
.cell-container {
  padding: 8px;
  background-color: white;
  border: 1px solid #efefef;
  box-shadow: 0 2px 4px #00000016;
  border-radius: 10px;
  margin: 12px 0;
  cursor: pointer;
}

.edited {
  background-color: #fff7cc;
  box-shadow: 0 2px 4px #fff7cc59;
}

.editing {
  background-color: #f3f3f3;
  box-shadow: 0 2px 4px #00000016;
}

.cell-content {
  font-weight: 500;
}

#edit-btn {
  display: none;
}

.cell-container:hover {
  box-shadow: 0 4px 8px #00000019;
}
</style>