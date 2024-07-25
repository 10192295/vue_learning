<template>
  <h1 class="title">导入</h1>
  <div class="content">
    <el-form
      label-width="auto"
      style="max-width: 600px; display: inline-block;"
      ref="formRef"
      :model="form"
      :rules="rules"
      status-icon
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="题目" prop="text">
        <el-input v-model="form.text" />
      </el-form-item>
      <el-form-item label="选项A" prop="optionA"> <el-input v-model="form.optionA" /></el-form-item
      ><el-form-item label="选项B" prop="optionB"> <el-input v-model="form.optionB" /></el-form-item
      ><el-form-item label="选项C" prop="optionC"> <el-input v-model="form.optionC" /></el-form-item
      ><el-form-item label="选项D" prop="optionD">
        <el-input v-model="form.optionD" />
      </el-form-item>
      <el-form-item label="正确答案" prop="correctAnswers">
        <!-- <el-input v-model="form.correctAnswers" /> -->
        <el-select v-model="form.correctAnswers" placeholder="选择正确答案">
          <el-option label="A" value="A" />
          <el-option label="B" value="B" />
          <el-option label="C" value="C" />
          <el-option label="D" value="D" />
        </el-select>
      </el-form-item>
      <div>
        <el-button type="primary" @click="submitForm(formRef)"> 添加 </el-button>
        <el-button @click="resetForm(formRef)">重置</el-button>
        <el-button type="primary" @click="submit"> go </el-button>
        <el-button type="primary" @click="handleWrite"> 使用模板填写 </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '../../stores/counter'
import { ElMessage } from 'element-plus'

const { addQuestion } = useCounterStore()
const formRef = ref()
const form = reactive({
  id: '',
  title: '',
  text: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',
  correctAnswers: ''
})
const router = useRouter()
const submit = () => {
  router.push({ name: 'question' })
}

const handleWrite = () => {
  router.push({ name: 'excel' })
}

const rules = reactive({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  text: [{ required: true, message: '请输入题目', trigger: 'blur' }],
  optionA: [{ required: true, message: '请输入内容A', trigger: 'blur' }],
  optionB: [{ required: true, message: '请输入内容B', trigger: 'blur' }],
  optionC: [{ required: true, message: '请输入内容C', trigger: 'blur' }],
  optionD: [{ required: true, message: '请输入内容D', trigger: 'blur' }],
  correctAnswers: [{ required: true, message: '请输入正确答案', trigger: 'blur' }]
})
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const { title, text, optionA, optionB, optionC, optionD, correctAnswers } = form
      const options = [
        { optionId: 'A', text: optionA, flag: false },
        { optionId: 'B', text: optionB, flag: false },
        { optionId: 'C', text: optionC, flag: false },
        { optionId: 'D', text: optionD, flag: false }
      ]
      const correctAnswersStr = correctAnswers.split('')
      const content = { text, options, correctAnswers: correctAnswersStr }
      const obj = { title, content }
      addQuestion(obj)
      ElMessage({
        message: '添加成功',
        type: 'success'
      })
      resetForm(formEl);
    } else {
      ElMessage({
        message: '添加失败',
        type: 'error'
      })
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="less" scoped>
.title, .content {
    text-align: center;
    margin-bottom: 20px;
}
</style>