<template>
  <div class="block-container columns">
      <div class="block-title">
          <slot name="title"></slot>
      </div>
      <div class="block-content">
          <slot name="content"></slot>
      </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.block-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
}
.block-title {
    font-family: 'Roboto';
    font-size: 15px;
    color: #707070;
    margin: 16px;
}
.block-content {
    font-family: 'Roboto';
    font-size: 23px;
    color: #01D28E;
    font-weight: 900;
}
</style>