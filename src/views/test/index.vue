<template>
  <div class="app-container">
    <div class="header">
      <el-row :gutter="20" style="display: flex; justify-content: center;">
        <input type="file" class="excel-upload-input" id="excel-upload-input" accept=".xlsx, .xls" @change="handleFileChange">
        <!-- <el-col :span="2"><div class="grid-content bg-purple"><el-input placeholder="标题"></el-input></div></el-col>
        <el-button type="primary">添加</el-button> -->
        <el-button type="primary" @click="handleDownload">导出</el-button>
        <el-button type="primary" @click="handleUpload">导入</el-button>
      </el-row>
    </div>
    <div class="main">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%; height: 550px; overflow-y: auto;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-for="(val, key, index) in tableHeadData" :key="index" :prop="key" width="100" :label="val"></el-table-column>
        <!-- <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column> -->
      </el-table>
      <el-pagination 
        background
        layout="prev, pager, next"
        :page-size="1"
        :total="tabPagesData.length"
        style="display: flex; justify-content: center;"
        @current-change="handleCurPageChange">
      </el-pagination>
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
      tabPagesData: [],    // 表格数据（做分页处理）
      // 表格标题
      tableHeadData: {},
      // 表格展示数据
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
    /**
     * 返回表格数据总页数
     */
    getTabDataLeng: function() {
      return this.tabPagesData.length * 10;
    }
  },
  methods: {
    /**
     * 获取表格数据
     */
    handleGetTableDatas() {
      getTableDatas('ruida_fund_reconciliation')
        .then(res => {
          console.log(res);
          const data = res.data;

          this.handleSplitTableData(data);

          this.tableData = this.tabPagesData[0];
        });
    },

    /**
     * 对表格数据分页
     */
    handleSplitTableData(tabData) {
      let r = [];
      const arr = [];

      tabData.forEach((item, index) => {
        r.push(item);

        // 逢5入一页
        if ((index + 1) % 5 === 0) {
          arr.push(r);
          r = [];
        }
      });

      this.tabPagesData = arr;
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

      formData.append('library', 'ruida_fund_reconciliation');
      formData.append('file', files);

      console.log('开始上传文件');

      importExcel(formData)
        .then(res => {
          console.log(res.data);

          if (res.data === '1') {
            Message.success('上传成功');
          } else {
            Message.error('上传是失败！');
          }

          // document.getElementById('excel-upload-input').value = '';
          // 重新获取表格数据
          this.handleGetTableDatas();
        });
    },

    /**
     * 点击导出
     * @callback
     */
    handleDownload() {

      const selectData = [].concat(this.multipleSelection);

      if (selectData.length === 0) {
        Message.error('请先选择数据!')
        return;
      }

      selectData.unshift(this.tableHeadData);

      // console.log(selectData);

      // 发送ajax
      downLoadTable(selectData)
        .then(res => {
          console.log(res);

          if (res.data.code !== '1') {
            Message.error('导出失败!');
            return;
          }

          Message.success('导出成功!');

          window.open(res.data.data);

          this.$refs.multipleTable.clearSelection();
        });

    },

    /**
     * 选中表格索引
     * @callback
    */
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },

    /**
     * 当前页码发生改变
     * @callback
     */
    handleCurPageChange(current) {
      this.tableData = this.tabPagesData[current - 1];
    },
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
    this.handleGetTableDatas();
  },
}
</script>

<style>
#excel-upload-input{
  display: none;
  z-index: -9999;
}

/* .main {
  max-height: 500px;
  overflow-y: auto;
} */
</style>
