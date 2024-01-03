<template>
  <div>
    <h1>todos</h1>
    <div>
        <div>
          <el-icon><CirclePlusFilled /></el-icon>
          <el-input minlength="100" v-model="todoThings" @change="handleInput"></el-input>
        </div>
        <div v-for="item in todoArray" :key="item.index">
          {{ item.name  }}
        </div>
    </div>
  </div>
  <template>TODO</template>
</template>

<script setup>
import { ref } from "vue";

const todoThings = ref('')
const todoArray = ref([
  { name: 'play', done: false },
  { name: 'study', done: false },
  { name: 'exercise', done: false }
])

function handleInput() {
  todoArray.value.push({
    name: todoThings,
    done: false
  })
  todoThings.value = ''
}
</script>

<style>
</style>