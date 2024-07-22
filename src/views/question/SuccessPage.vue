<template>
    <el-result
    icon="success"
    title="你的得分"
    :sub-title="score"
    >
    </el-result>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const score = ref(route.params.score);
</script>

<style lang="less" scoped>
</style>