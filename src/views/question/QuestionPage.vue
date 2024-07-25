<template>
  <div v-if="empty">
    <el-empty description="当前没有题目">
      <el-button
        type="primary"
        @click="
          () => {
            router.push({ name: 'export' })
          }
        "
        >去添加题目</el-button
      >
      <el-button @click="handleUseTemplate">使用模板</el-button>
    </el-empty>
  </div>
  <div v-else>
    <h1>{{ currentQuestion?.title }}</h1>
    <h2 class="content-text">{{ currentQuestion?.content?.text || '' }}</h2>
    <h3
      v-for="(item, idx) in currentQuestion?.content?.options || []"
      :key="idx"
      :class="['select-item', item.flag ? 'selected' : 'unselect']"
      @click="handleClick(item, idx)"
    >
      {{ `${item.optionId}: ${item.text}` }}
    </h3>
    <div class="pew-button">
      <el-button-group>
        <el-button type="primary" :icon="ArrowLeft" @click="handlePrevious">上一题</el-button>
        <el-button type="primary">{{ `当前第${currentIndex}题` }}</el-button>
        <el-button type="primary" @click="handleNext">
          下一题<el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
      </el-button-group>
    </div>
    <div class="button-group">
      <ButtonGroup v-for="(item, index) in buttonOptions" :key="index" :button-prop="item" />
    </div>
    <div class="foot-button">
      <el-countdown prefix="还有" suffix="自动交卷" :value="counter" @finish="handleSubmit" />
      <el-button type="primary" size="large" :disabled="!submitButton" @click="handleSubmit"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import ButtonGroup from './components/ButtonGroup.vue'

const router = useRouter()
const { question, length } = useCounterStore()

// 定义一个 ref 来存储问题数组
const questionArray = ref([])
// 定义一个 ref 来存储当前问题的索引
const index = ref(0)
const score = ref(0)
// const options = computed(() => {
//   const arr = []
//   for (let index of questionArray.value.keys()) {
//     arr.push(index)
//   }
//   return arr
// })
const counter = ref(Date.now() + 1000 * 60 * 60 * 2)

// 使用 computed 获取当前显示的问题
const currentQuestion = computed(() => {
  return questionArray.value[index.value] || {}
})

const empty = computed(() => {
  return questionArray.value.length === 0
})

const currentIndex = computed(() => {
  return index.value + 1
})

const submitButton = computed(() => {
  return index.value === questionArray.value.length - 1
})

const handleClick = (item, id) => {
  currentQuestion.value.content.options[id].flag = !currentQuestion.value.content.options[id].flag
}

const handlePrevious = () => {
  if (index.value === 0) {
    ElMessage({
      message: '已经是第一题了',
      type: 'warning'
    })
  } else {
    index.value--
  }
}

const handleNext = () => {
  if (submitButton.value) {
    ElMessage({
      message: '已经是最后一题了',
      type: 'warning'
    })
  } else {
    index.value++
  }
}

const handleSubmit = () => {
  const array = questionArray.value
  array.forEach((item) => {
    const {
      content: { correctAnswers, options }
    } = item
    let selected = []
    options.forEach((item) => {
      if (item.flag) {
        selected.push(item.optionId)
      }
    })
    if (arraysEqual(selected, correctAnswers)) {
      score.value++
    }
  })
  router.push({ name: 'success', params: { score: score.value } })
}

const handleUseTemplate = () => {
  questionArray.value = [
    {
      id: '1',
      title: '题目1',
      content: {
        text: 'Which of the following is a programming language?',
        options: [
          { optionId: 'a', text: 'HTML', flag: false },
          { optionId: 'b', text: 'CSS', flag: false },
          { optionId: 'c', text: 'JavaScript', flag: false },
          { optionId: 'd', text: 'HTTP', flag: false }
        ],
        correctAnswers: ['c']
      }
    },
    {
      id: '2',
      title: '题目2',
      content: {
        text: 'Which of the following is a programming language?',
        options: [
          { optionId: 'a', text: 'HTML', flag: false },
          { optionId: 'b', text: 'CSS', flag: false },
          { optionId: 'c', text: 'JavaScript', flag: false },
          { optionId: 'd', text: 'HTTP', flag: false }
        ],
        correctAnswers: ['a']
      }
    },
    {
      id: '3',
      title: '题目3',
      content: {
        text: 'Which of the following is a programming language?',
        options: [
          { optionId: 'a', text: 'HTML', flag: false },
          { optionId: 'b', text: 'CSS', flag: false },
          { optionId: 'c', text: 'JavaScript', flag: false },
          { optionId: 'd', text: 'HTTP', flag: false }
        ],
        correctAnswers: ['b']
      }
    }
  ]
}

const arraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false
  return arr1.every((element) => arr2.includes(element))
}
import { testApi } from '../../api'
// 使用 onMounted 来初始化问题数组
onMounted(() => {
  testApi({
    params: questionArray.value
  }).then((res) => {
    console.log(res)
  })
  console.log(length, question)
  questionArray.value = question
})
let buttonOptions = reactive([])
watch(
  questionArray,
  (newValue, oldValue) => {
    console.log(newValue, oldValue)
    buttonOptions = []
    for (let [index, item] of newValue.entries()) {
      const { content: {options} } = item
      const arr = options.find((item) => item.flag)
      const obj = {
        index,
        checked: (arr && arr.length !== 0) ? true : false
      }
      console.log(obj);
      buttonOptions.push(obj)
    }
  },
  { immediate: true, deep: true }
)
</script>

<style lang="less" scoped>
/* 可以在这里添加你的样式 */
.content-text {
  margin: 10px;
}
.select-item {
  padding: 10px;
}
.selected {
  background-color: aqua;
  border: 1px, solid, red;
}
.unselect {
  border: 1px, solid, black;
}
.pew-button {
  margin-top: 20px;
  text-align: right;
}
.foot-button {
  position: fixed;
  bottom: 5vh;
}
.button-group {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  align-content: start;
}
</style>
