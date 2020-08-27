<template>
  <div class="cell-container columns is-mobile is-vcentered">
    <div class="cell-title column is-narrow">
      <slot name="title"></slot>
    </div>
    <div class="column"></div>
    <div class="cell-content column is-narrow">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.cell-title {
    font-family: 'Roboto';
    font-size: 15px;
    color: #707070;
}

.cell-content {
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: 900;
    color: #01D28E;
}
</style>