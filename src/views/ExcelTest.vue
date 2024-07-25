<template>
  <div>
    <input type="file" @change="handleFileUpload" />
    <table v-if="rows.length">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
    <el-popconfirm  v-if="rows.length" title="核对完毕了吗?" @confirm="handleSubmit">
      <template #reference>
        <el-button type="primary">提交</el-button>
      </template>
    </el-popconfirm>
    <el-button type="primary" v-else @click="generateExcel">
      下载模板
    </el-button>
  </div>
</template>
  
<script setup>
import ExcelJS from 'exceljs'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '../stores/counter'
const rows = reactive([])
const headers = reactive([])
const ques = reactive([])
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = async (e) => {
    try {
      const buffer = e.target.result
      const workbook = new ExcelJS.Workbook()
      await workbook.xlsx.load(buffer)
      const worksheet = workbook.worksheets[0]

      if (!worksheet) {
        console.error('No worksheet found')
        return
      }

      worksheet.eachRow((row, rowNumber) => {
        const cells = row.values.slice(1)
        if (rowNumber === 1) {
          headers.push(...cells)
        } else {
          rows.push(cells)
        }
      })

      console.log('Headers:', headers)
      console.log('Rows:', rows)
      rows.forEach((item) => {
        const [title, text, optionA, optionB, optionC, optionD, correctAnswers] = item
        const options = [
          { optionId: 'A', text: optionA, flag: false },
          { optionId: 'B', text: optionB, flag: false },
          { optionId: 'C', text: optionC, flag: false },
          { optionId: 'D', text: optionD, flag: false }
        ]
        const correctAnswersStr = correctAnswers.split('')
        const content = { text, options, correctAnswers: correctAnswersStr }
        const obj = { title, content }
        ques.push(obj)
      })
    } catch (error) {
      console.error('Error reading Excel file:', error)
    }
  }

  reader.onerror = (error) => {
    console.error('FileReader error:', error)
  }

  reader.readAsArrayBuffer(file)
}
const router = useRouter()
const handleSubmit = () => {
  const { addQuestion } = useCounterStore()
  ques.forEach((item) => {
    addQuestion(item)
  })
  router.push({ name: 'question' })
}

import { saveAs } from 'file-saver';
const generateExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sample Sheet');

  // 添加标题行
  worksheet.columns = [
    { header: '标题', key: 'title', width: 30 },
    { header: '题目', key: 'text', width: 30 },
    { header: '选项A', key: 'optionA', width: 30 },
    { header: '选项B', key: 'optionB', width: 30 },
    { header: '选项C', key: 'optionC', width: 30 },
    { header: '选项D', key: 'optionD', width: 30 },
    { header: '正确答案', key: 'correctAnswers', width: 30 },
  ];

  // 添加数据行
  worksheet.addRow({ title: '标题1', text: '选择数字', optionA: 25, optionB: 30, optionC: 35, optionD: 40, correctAnswers: 'A' });

  // 添加样式
  worksheet.getRow(1).font = { bold: true };

  // 生成 XLSX 文件
  const buffer = await workbook.xlsx.writeBuffer();

  // 保存文件
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'sample.xlsx');
}
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
</style>
  