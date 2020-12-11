<template>
  <div class="app-container" v-loading="loading">
    <div class="header">
      <formGroup :show="showFormGroup" @clear="showFormGroup=false" @finish="handleChoiceDownLoad" />
      <funtBtns :headerTitle="headerTitle" @import="handleToImport" @download="handleToDownload" @more-down="handleMoreDown" />
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
 * 1、路由文件添加新路径 component指向该文件
 * 2、路径path填写数据库对应表名，name值会动态根据path变更
 * 3、页面每个请求会根据name值查找对应数据库表
 */

import { Message } from 'element-ui';

import { getTableHeader, getTableDatas, importExcel, downLoadTable } from '@/api/excel';

import formGroup from './components/form-group.vue';
import funtBtns from './components/funt-btns.vue';

import { switchTitle } from './showViewTools.js';

export default {
  name: '',  // path值路由名动态变更
  components: {
    formGroup,
    funtBtns,
  },
  data() {
    return {
      loading: true,
      showFormGroup: false,  // 展示formGroup组件
      headerTitle: '',
      // tabPagesData: [],      // 表格页码集  表格数据（做分页处理）
      tableHeadData: {},     // 表格标题
      tableData: [],         // 表格数据（当前页码）
      currentPage: 1,        // 当前页数
      tabPagesCount: 0,      // 表格页码总数 （10条数据分1页）
      multipleSelection: [], // 当前页码表格选中的数据
      isShowMultipleChoiceCase: true,   // 显示 multipleChoiceCase 组件
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
     * @param page 页码 （10条数据分1页） 0起始页
     */
    handleGetTableDatas(page = 0) {
      this.loading = true;
      getTableDatas(this.name, page)
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
     * 导入
     */
    handleToImport(e) {
      const files = e.target.files[0];
      var formData = new FormData();

      formData.append('library', this.name);
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
     * 导出
     */
    handleToDownload() {
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
     * 确定条件导出
     * @callback click
     * @todo 按照选中条件下载数据
     */
    handleChoiceDownLoad(e) {
      console.log(e);
    },

    /**
     * 条件导出按钮
     * @callback click
     * @todo 显示条件表单
     */
    handleMoreDown() {
      this.showFormGroup = !this.showFormGroup;
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
      this.handleGetTableDatas(current - 1);
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

      //...
    }
  },

  created() {
    this.name = this.$route.name;
  },

  mounted() {
    this.headerTitle = switchTitle(this.name);

    // 获取表格标题栏(键值)
    getTableHeader(this.name)
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
