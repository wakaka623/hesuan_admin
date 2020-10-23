<template>
  <div class="app-container">
    <div class="header">
      <el-row :gutter="20">
        <input type="file" class="excel-upload-input" id="excel-upload-input" accept=".xlsx, .xls" @change="handleFileChange">
        <el-col :span="2"><div class="grid-content bg-purple"><el-input placeholder="标题"></el-input></div></el-col>
        <el-button type="primary">添加</el-button>
        <el-button type="primary">删除</el-button>
        <el-button type="primary" @click="handleUpload">导入</el-button>
      </el-row>
    </div>
    <div class="main">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="日期" width="120"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { importExcel } from '@/api/excel';
import axios from 'axios';

export default {
  name: 'test',
  data() {
    return {
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: []
    }
  },
  methods: {
    /**
     * 点击导入
     */
    handleUpload() {
      document.getElementById('excel-upload-input').click();
    },
    /**
     * 上传文件
     */
    handleFileChange(e) {
      // console.log(this.files);
      console.log(e);
      const files = e.target.files[0];
      var formData = new FormData();

      formData.append('username', 'Chris');
      console.log(formData);
      console.log(formData.entries());

      formData.append('key1', 'value1');
      formData.append('excel', files);
      formData.append('key2', 'value2');


      console.log('上传文件');
      console.log(formData.getAll());

      axios({
        url: '/api/import/excel',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'post',
        data: {
          formData
        }
      })

      return;
      importExcel(formData)
        .then(res => {
          console.log(res);
        });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style>
#excel-upload-input{
  display: none;
  z-index: -9999;
}
</style>
