<template>
  <h1>news</h1>
  <span>{{ showInfo }}</span>
  <button @click="$emit('emit-check')">Check tab</button>
</template>

<script setup>
  defineProps(['showInfo'])
  defineEmits(['emit-check'])
</script>

<style>

</style>