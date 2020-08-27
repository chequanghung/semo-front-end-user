<template>
  <div class="cell-container columns is-vcentered is-mobile" @click="edit">
    <div class="column">
      <p class="cell-content">{{ title }}</p>
    </div>
    <div class="column is-narrow">
      <p class="cell-content" v-if="user === undefined">{{ content }}</p>
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

    <!-- collapse -->
    <div class="tile notification is-light">
      
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "content", "user"],
  methods: {
      edit() {
          this.$emit('edit', {
              title: this.title,
              content: this.content,
              user: this.user !== undefined ? this.user : null
          })
      }
  }
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