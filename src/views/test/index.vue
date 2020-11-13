<template>
  <div class="app-container">
    <BatchCheckbox ref="batchCheckBox" :cities="tabPagesData" @finish="handleBatchCheckFnish" />
    <div class="header">
      <el-row :gutter="20" style="display: flex; justify-content: center;">
        <input type="file" class="excel-upload-input" id="excel-upload-input" accept=".xlsx, .xls" @change="handleFileChange">
        <!-- <el-col :span="2"><div class="grid-content bg-purple"><el-input placeholder="标题"></el-input></div></el-col>
        <el-button type="primary">添加</el-button> -->
        <el-button type="primary" @click="handleDownload">导出</el-button>
        <el-button type="primary" @click="handleUpload">导入</el-button>
        <el-button type="primary" @click="handleBatchUpload">批量导出</el-button>
      </el-row>
    </div>
    <div class="main">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%; margin-bottom: 10px; overflow-y: auto;"
        stripe
        header-row-class-name="table-header-rows"
        header-cell-class-name="table-header-cells"
        cell-class-name="table-cells"
        row-class-name="table-rows"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-for="(val, key, index) in tableHeadData" :key="index" :prop="key" :width="setTableBoxWidth(val)" :label="val"></el-table-column>
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

import { getTableHeader, getTableDatas, importExcel, downLoadTable } from '@/api/excel';

import BatchCheckbox from './components/batch-checkbox.vue';

export default {
  name: 'test',
  components: {
    BatchCheckbox
  },
  data() {
    return {
      tabPagesData: [],    // 表格数据（做分页处理）
      tableHeadData: {},   // 表格标题
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

        // 逢10入一页
        if ((index + 1) % 10 === 0) {
          arr.push(r);
          r = [];
        }
      });

      if (r.length !== 0) {
        arr.push(r);
        r = [];
      }

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
            Message.error('上传失败！');
          }

          document.getElementById('excel-upload-input').value = '';
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
            Message.error(res.data.message);
            return;
          }

          Message.success('导出成功!');

          window.open(res.data.data);

          this.$refs.multipleTable.clearSelection();
        });

    },

    /**
     * 点击批量导出按钮
     * @callback
     * @todo 显示批量导出弹窗
     */
    handleBatchUpload() {
      this.$refs.batchCheckBox.display();
    },

    /**
     * 确定批量导出按钮
     * @callback
     * @todu 导出选中页码的数据
     */
    handleBatchCheckFnish(e) {
      const data = [];
      const pages = e.pages;

      pages.forEach(item => {
        this.tabPagesData[item - 1].forEach(m => {
          data.push(m);
        });
      })

      data.unshift(this.tableHeadData);

      console.log(data);

      // 发送ajax
      downLoadTable(data)
        .then(res => {
          console.log(res);

          if (res.data.code !== '1') {
            Message.error(res.data.message);
            return;
          }

          Message.success('导出成功!');

          window.open(res.data.data);

          // 取消所有页码选中效果
          this.$refs.batchCheckBox.checkedCities = [];
          this.$refs.batchCheckBox.isCheckedBox = 0;
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

    /**
     * 设置单元格宽度
     */
    setTableBoxWidth(val) {
      const num = val.length;
      return (num + 3) * 15 + '';
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

.table-header-cells {
  text-align: center !important;
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #aaa !important;
  padding: 10px 0 !important;
  height: 20px !important;
  color: #333;
}

.table-cells {
  height: 20px !important;
  padding: 0 !important;
  text-align: center !important;
  border-left: 1px solid #f0efef;
}

</style>
