<template>
  <div class="app-container">
    <div class="header">
      <el-row :gutter="20">
        <input type="file" class="excel-upload-input" id="excel-upload-input" accept=".xlsx, .xls" @change="handleFileChange">
        <!-- <el-col :span="2"><div class="grid-content bg-purple"><el-input placeholder="标题"></el-input></div></el-col>
        <el-button type="primary">添加</el-button> -->
        <el-button type="primary" @click="handleDownload">导出</el-button>
        <el-button type="primary" @click="handleUpload">导入</el-button>
      </el-row>
    </div>
    <div class="main">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-for="(val, key, index) in tableHeadData" :key="index" :prop="key" width="100" :label="val"></el-table-column>
        <!-- <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';

import axios from 'axios';

import { getTableHeader, getTableDatas, importExcel, downLoadTable } from '@/api/excel';

export default {
  name: 'test',
  data() {
    return {
      // 表格标题
      tableHeadData: {},
      // 表格数据
      tableData: [
        // {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   address: '上海市普陀区金沙江路 1518 弄'
        // }
        // {customer_name: '应吉跃'}
      ],
      // 表格选中的数据
      multipleSelection: []
    }
  },
  computed: {
    },
  methods: {
    autoWidth(str) {
      console.log(str);
      const width = str.length * 1.3;
      return width + '';
    },

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
      const files = e.target.files[0];
      var formData = new FormData();

      formData.append('file', files);



      console.log('开始上传文件');

      importExcel(formData)
        .then(res => {
          console.log(res.data);

          return;
          this.tableHeadData = res.data.splice(0, 1)[0];

          this.tableData = res.data;

        });
    },

    /**
     * 下载文件
     */
    handleDownload() {

      const selectData = [].concat(this.multipleSelection);

      if (selectData.length === 0) {
        Message.error('选择的数据为空!')
        return;
      }

      selectData.unshift(this.tableHeadData);

      // console.log(selectData);

      // 发送ajax
      downLoadTable(selectData)
        .then(res => {
          console.log(res);

          window.open(res.data);

          this.$refs.multipleTable.clearSelection();
        });

    },

    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    }
  },


  mounted() {
    console.log('mounted')
    // 获取表格标题栏
    getTableHeader('ruida_fund_reconciliation')
      .then(res => {
        console.log(res);

        this.tableHeadData = res.data;
      });

    // 获取表格数据
    getTableDatas('ruida_fund_reconciliation')
      .then(res => {
        console.log(res);

        this.tableData = res.data;
      });
  },
}
</script>

<style>
#excel-upload-input{
  display: none;
  z-index: -9999;
}

.main {
  max-height: 500px;
  overflow-y: auto;
}
</style>
