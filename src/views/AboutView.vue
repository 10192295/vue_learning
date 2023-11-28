<template>
  <div class="about">
    <button
      @click="userInfo_2.count = 2"
    >
      {{ userInfo_2.count }}
    </button>
    <br />
    <button
      @click="userInfo.count = 3"
    >{{ countComputed }}</button>
  </div>
</template>

<!-- <template>
  <div>
    {{ countComputed }}
  </div>
</template> -->

<script setup>
import { computed, onMounted, ref } from "vue";

  const count = ref(2)
  // ref解包
  const userInfo = ref({
    count
  })
  const userInfo_2 = {
    count: ref(1)
  }

  const countComputed = computed(() => {
    return userInfo.value.count == 0 ? '改了' : '没改'
  })
  
  onMounted(()  => {
    console.log(count.value)
    console.log(userInfo.value.count === count.value);
    const { count } = userInfo_2
  })
</script>

<style>
@media (min-width: 1024px) {
  .about {
    /* min-height: 100vh;
    display: flex;
    align-items: center; */
  }
}
</style>
