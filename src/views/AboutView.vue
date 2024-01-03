<template>
  <div :class=calssObject>
    <div>
      <h1>异步组件</h1>
      <asyncComponent></asyncComponent>
    </div>
    <button
      @click="userInfo.count1 = 2"
    >
      {{ userInfo.count1 }}
    </button>
    <br />
    <div>{{ props.info }}</div>
    <button
      @click="userInfo.count1 = 3"
    >{{ countComputed }}</button>
  </div>
  <a href="/" @click.stop="routerClick">点击停止</a>
  <input v-model.number="userInput" @change="handleChange" @input="handleInput" />
  <news-component></news-component>
  <slot name="aboutView" :about-info="userInfo"></slot>
</template>

<script setup>
import { computed, defineAsyncComponent, onMounted, ref, watch } from "vue";
import NewsComponent from "@/components/NewsComponent.vue";

  const count = ref(2)

  const asyncComponent = defineAsyncComponent({
    loader: () => import('../components/HelloWorld.vue'),
    loadingComponent: NewsComponent,
    delay: 2000
  })
  // ref解包
  const userInfo = ref({
    count1: 0
  })
  // defineProps(['info', 'styleObject'])
  const props = defineProps({
    title: String,
    info: String
  })
  defineEmits(['emit-handle-click'])
  // const userInfo_2 = {
  //   count
  // }
  const userInput = ref('')

  const countComputed = computed(() => {
    return userInfo.value.count1 == 0 ? '改了' : '没改'
  })

  const calssObject = computed(() => ({
    'count': count
  }))
 
  function handleChange() {
    console.log("change function: " + userInfo.value)
  }
  function handleInput() {
    console.log("input function: " + userInput.value)
  }

  watch(userInfo, (newCount, oldCount) => {
    console.log(newCount, oldCount)
  },
    { immediate: true }
  )
  
  onMounted(()  => {
    // console.log(count.value)
    // console.log(userInfo.value.count === count.value)
    // const { count } = userInfo_2
  })

  const routerClick = () => {
    console.log('ting');
  }
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
