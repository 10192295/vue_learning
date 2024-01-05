<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Login</span>
      </div>
    </template>
    <div>
      <el-form
        ref="ruleFormRef"
        :model="userInfo"
        :rules="rules"
        status-icon
    >
        <el-form-item label="用户名" prop="name">
            <el-input v-model="userInfo.name" placeholder="输入用户名" :prefix-icon="UserFilled"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="userInfo.password" placeholder="输入密码" :prefix-icon="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)"
                >Submit</el-button
            >
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
      </el-form>
    </div>
    <template #footer>Back to home page</template>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from '../stores/user'
  const userInfo = ref({
    name: '',
    password: ''
  })
  const ruleFormRef = ref()
  const validName = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input the user name'))
    } else {
        callback()
    }
  }
  const validPassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        callback()
    }
  }
  const rules = ref({
    name: [{ validator: validName, trigger: 'blur' }],
    password: [{ validator: validPassword, trigger: 'blur' }]
  })
  const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
        console.log('submit!')
        subLogin()
        } else {
        console.log('error submit!')
        return false
        }
    })
  }
  const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
  }
  const subLogin = () => {
    const { login } = useUserStore()
    login(userInfo)
  }
</script>

<style scoped>
.card-header {
    text-align: center;
}
</style>