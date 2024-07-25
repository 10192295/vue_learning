<template>
  <div :class="['button-block', buttonProp.checked ? 'button-checked' : 'button-check']">
    {{ buttonProp.index }}
  </div>
</template>
<script setup>
defineProps({
  buttonProp: {
    type: Object,
    default() {
      return {}
    }
  }
})
</script>

<style lang="less" scoped>
.button-block {
  border: 2px solid black;
  display: inline-block;
  margin: 5px;
  padding: 5px;
  width: 50px;
  height: 40px;
  text-align: center;
}
.button-checked {
  background-color: aqua;
}
.button-check {
  background-color: antiquewhite;
}
</style>
  