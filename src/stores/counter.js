import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const question = reactive([])
  const length = computed(() => question.length)
  const addQuestion = (obj) => {
    if (length.value === 0) {
      obj.id = 1;
    } else {
      const len = length.value + 1;
      obj.id = len
    }
    question.push(obj);
  }
  return { question, addQuestion, length }
})
