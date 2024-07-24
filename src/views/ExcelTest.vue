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
  </div>
</template>
  
<script setup>
import ExcelJS from 'exceljs'
import { reactive } from 'vue'
const rows = reactive([])
const headers = reactive([])
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
    } catch (error) {
      console.error('Error reading Excel file:', error)
    }
  }

  reader.onerror = (error) => {
    console.error('FileReader error:', error)
  }

  reader.readAsArrayBuffer(file)
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
  