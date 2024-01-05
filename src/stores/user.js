import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
  const userAuth = ref(null)
  function login(userData) {
    userAuth.value = userData
    localStorage.user = userData
  }
  return { userAuth, login }
})