<template>
  <div class="app-container" v-loading="loading">
    <multipleChoiceCase :isShow="isShowMultipleChoiceCase"
      :choiceList="remoteChoiceList"
      @finish="handleFinishMultipleChoice"
      @clear="isShowMultipleChoiceCase = false"
      @remote-method="handleChoiceRemoteSearch" />
    <div class="header">
      <el-row :gutter="20" style="display: flex; justify-content: center;">
        <input type="file" class="excel-upload-input" id="excel-upload-input" accept=".xlsx, .xls" @change="handleFileChange">
        <el-button type="primary" @click="handleUpload">导入</el-button>
        <el-button type="primary" @click="handleDownload">导出</el-button>
        <el-button type="primary" @click="handleBatchUpload">条件导出</el-button>
      </el-row>
    </div>
    <div class="main">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
        style="width: 100%; margin-bottom: 10px; overflow-y: auto;"
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
        :current-page="currentPage"
        :total="tabPagesCount"
        style="display: flex; justify-content: center;"
        @current-change="handleCurPageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
/**
 * 创建新表:
 * 1、更改vue实例name属性
 * 2、更改TABLE_NAME常量——》【数据库对应表名】
 * 3、数据库创建完毕记得 【修改数据库引擎为innodb（兼容事务回滚）】
 */

import { Message } from 'element-ui';

import { getTableHeader, getTableDatas, importExcel, downLoadTable, downChoiceTable, searchKeyValue } from '@/api/excel';

import multipleChoiceCase from '@/components/multiple-choice-case/index.vue';

/** 当前表连接的数据库表名 */
const TABLE_NAME = 'hengyin_customer_transaction';

export default {
  name: 'customer-transaction',  // 恒银客户成交表
  components: {
    multipleChoiceCase,
  },
  data() {
    return {
      loading: true,
      // tabPagesData: [],      // 表格页码集  表格数据（做分页处理）
      tableHeadData: {},     // 表格标题
      tableData: [],         // 表格数据（当前页码）
      currentPage: 1,        // 当前页数
      tabPagesCount: 0,      // 表格页码总数 （10条数据分1页）
      multipleSelection: [], // 当前页码表格选中的数据
      isShowMultipleChoiceCase: false,   // 显示 multipleChoiceCase 组件
      remoteChoiceList: [],              // 远程搜索关键字列表
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
     * @param page 页码 （10条数据分1页）
     */
    handleGetTableDatas(page = 1) {
      this.loading = true;
      getTableDatas(TABLE_NAME, page)
        .then(res => {
          console.log(res);
          const data = res.data;

          this.loading = false;

          if (data.code !== '1') {
            Message.error(data.message);
            return;
          }

          this.tableData = data.data;
          this.tabPagesCount = data.pages_count;
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
     * 导入
     */
    handleFileChange(e) {
      const files = e.target.files[0];
      var formData = new FormData();

      formData.append('library', TABLE_NAME);
      formData.append('file', files);

      console.log('开始上传文件');

      importExcel(formData)
        .then(res => {
          console.log(res.data);

          if (res.data.code === '1') {
            Message.success('导入成功, 本次导入' + res.data.count + '条数据');
          } else {
            Message.error('失败！' + res.data.message);
          }

          document.getElementById('excel-upload-input').value = '';
          // 重新获取表格数据
          this.handleGetTableDatas();
        }).catch(err => {
          console.log(err);
        })
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
      this.isShowMultipleChoiceCase = !this.isShowMultipleChoiceCase;
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
      // this.tableData = this.tabPagesData[current - 1];
      this.handleGetTableDatas(current);
    },

    /**
     * 设置单元格宽度
     */
    setTableBoxWidth(val) {
      const num = val.length;

      if (val === '唯一标识码') return '200';

      return (num + 3) * 15 + '';
    },


    /**
     * 条件导出关键字
     * @callback remote-method
     * @todo 输入关键字返回完整对应可选值
     */
    handleChoiceRemoteSearch(e) {
      const val = e.val;
      const key = e.keyName;

      // this.remoteChoiceList = [val];
      console.log(e);

      searchKeyValue(TABLE_NAME, {
        [key]: val
      }).then(res => {
        console.log(res);
      })
    },

    /**
     * 确定批量导出按钮
     * @callback click
     */
    handleFinishMultipleChoice(e) {
      console.log(e);
      const data = e.data;
      const keys = Object.keys(data);

      if (!data || keys.length === 0) {
        Message.error('请选择条件');
        return;
      }


      this.loading = true;

      downChoiceTable(TABLE_NAME, data)
        .then(res => {
          this.loading = false;

          if (res.data.code === '1') {
            window.open(res.data.url);
            Message.success(res.data.message);
          } else {
            Message.error(res.data.message);
          }
        });
    }
  },
  mounted() {
    // 获取表格标题栏
    getTableHeader(TABLE_NAME)
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

.header {
  margin-bottom: 10px;
}

.table-header-cells {
  text-align: center !important;
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #aaa !important;
  padding: 10px 0 !important;
  height: 50px !important;
  color: #333;
}

.table-cells {
  height: 50px !important;
  padding: 0 !important;
  text-align: center !important;
  border-left: 1px solid #f0efef;
  border-right: 1px solid #f0efef;
}

</style>
