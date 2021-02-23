<template>
  <div class="app-container" v-loading="loading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <!-- <el-form-item label="开始时间">
          <el-input v-model="formInline.date1" placeholder="开始时间"></el-input>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="formInline.date2" placeholder="结束时间"></el-input>
        </el-form-item> -->
        <el-form-item label="搜索区间" required>
        <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择开始日期" v-model="formInline.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
        <el-form-item prop="date2">
          <el-date-picker type="date" placeholder="选择结束日期" v-model="formInline.date2" style="width: 100%;"></el-date-picker>
        </el-form-item>
        </el-col>
        </el-form-item>
        <el-form-item label="客户账户">
          <el-input v-model="formInline.account" placeholder="客户账号"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名">
          <el-input v-model="formInline.customerame" placeholder="客户姓名"></el-input>
        </el-form-item>
        <el-form-item label="组别" v-if="isShowSearchGroup">
          <el-input v-model="formInline.searchGroup" placeholder="组别"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    <div class="header">
      <formGroup ref="formGroup" :show="showFormGroup" @clear="showFormGroup=false" @finish="handleChoiceDownLoad" />
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
        @sort-change="changeSort"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-for="(val, key, index) in tableHeadData" :key="index" :prop="key" :width="setTableBoxWidth(val)" :label="val"  sortable="custom" show-overflow-tooltip=""></el-table-column>
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
    <!-- <el-table
      :data="[]"
      border
      style="width: 100%">
      <el-table-column
        v-for="(item, index) in totalClumn"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        width="180">
      </el-table-column>
    </el-table> -->
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

import { getTableHeader, getTableDatas, importExcel, downLoadTable, mergeExport } from '@/api/excel';

import formGroup from './components/form-group.vue';
import funtBtns from './components/funt-btns.vue';

import { checkSameTable, isFinsTest } from '@/utils/utils.js';
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
      remoteChoiceList: [], // 远程搜索关键字列表
      isShowSearchGroup:true,//是否显示组搜索
      sortField:'',//排序字段
      sortType:false,//控制正序还是反序
      formInline: {
          date1:'',
          date2:'',
          account:'',
          customerame:'',
          searchGroup:''
        },              
      // totalClumn: [],     // 合计表标题栏
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
  created(){
    
    this.handleGetTableDatas()
     
  },
  methods: {
    //监听排序
    changeSort(val){
      this.sortType=!this.sortType
      this.sortField = val.prop
      this.handleGetTableDatas()
    },
    /**
     * 搜索
     */
     onSubmit() {
        this.handleGetTableDatas()
      },
      /**
       * 重置搜索
       */
      onReset(){
        this.formInline.date1=''
        this.formInline.date2=''
        this.formInline.account=''
        this.formInline.customerame=''
        this.formInline.searchGroup=''
        this.handleGetTableDatas()

      },
    /**
     * 获取表格数据
     * @param page 页码 （10条数据分1页） 0起始页
     */
    handleGetTableDatas(page = 0) {
      let group=window.sessionStorage.getItem('group')
      let isadmin=window.sessionStorage.getItem('isadmin')
      this.loading = true;
      getTableDatas(this.name, page,group,isadmin,this.formInline.date1,this.formInline.date2,this.formInline.account,this.formInline.customerame,this.formInline.searchGroup,this.sortField,this.sortType)
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
    // handleSplitTableData(tabData) {
    //   let r = [];
    //   const arr = [];

    //   tabData.forEach((item, index) => {
    //     r.push(item);

    //     // 逢10入一页
    //     if ((index + 1) % 30 === 0) {
    //       arr.push(r);
    //       r = [];
    //     }
    //   });

    //   if (r.length !== 0) {
    //     arr.push(r);
    //     r = [];
    //   }

    //   this.tabPagesData = arr;
    // },

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
     * 获取条件导出的数据
     * @method
     */
    getChoiceTables(tableNames, options) {
      const selectData = {};
      const selectColumns = {};

      const isTest = options.some(item => {
        // 去除首尾空格
        item.selectData.forEach((m, i) => {
          item.selectData[i] = m.trim();
        })

        // 对字段内容值验证
        let condition = item.value === 'unique_code' ? item.value : 'default';
        const result = isFinsTest[condition](item);
        if (!result) return true;

        selectColumns[item.value] = item.label;

        selectData[item.value] = item.selectData;
      });

      if (isTest) return;

      // console.log('tableNames: ');
      // console.log(tableNames);
      // console.log('selectData: ');
      // console.log(selectData);
      // console.log('selectColumns: ');
      // console.log(selectColumns);

      this.$refs.formGroup.setBtnFinish(true);   // 禁用'确定'按钮

      mergeExport(tableNames, selectColumns, selectData)
        .then(res => {
          this.$refs.formGroup.setBtnFinish(false);
          console.log(res);
          if (res.data.code === '1') {
            window.open(res.data.url);
          } else {
            Message.error(res.data.message);
          }
        }).catch(() => {
          Message.error('操作失败，请重试');
        });
    },

    /**
     * 确定条件导出
     * @callback click
     * @todo 按照选中条件下载数据
     */
    handleChoiceDownLoad(e) {
      console.log(e);
      const tableNames = [];

      if (e.tableList.length === 0) {
        Message.error('未选中表');
        return;
      }


      // 表名集赋值
      const _index = e.tableList[0]['value'].indexOf('_');
      const tabType = e.tableList[0]['value'].substr(_index + 1);
      let isSameTable = false;
      e.tableList.forEach((item, index) => {
        tableNames.push(item.value);
        if (index !== 0 && checkSameTable[tabType](item.value)) isSameTable = true;
      });

      if (!isSameTable) {
        // Message.success('同类型');
        this.getChoiceTables(tableNames, e.options);
      } else {
        this.$confirm('选择的表属于不同类型，是否继续？', '提示', {
          type: 'warning'
        }).then(() => {  // 确定
          this.getChoiceTables(tableNames, e.options);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });
        });
      }
    },

    /**
     * 条件导出按钮
     * @callback click
     * @todo 显示条件表单组件
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
      const num = val.length+3;
      if (val === '唯一标识码') return '200';
      return (num + 3) * 15 + '';
    },

  },

  created() {
    this.name = this.$route.name;
  },

  mounted() {

    this.headerTitle = switchTitle(this.name);
    let group=window.sessionStorage.getItem('group')
    let isadmin=window.sessionStorage.getItem('isadmin')
    // 获取表格标题栏(键值)
    getTableHeader(this.name,group,isadmin)
      .then(res => {
        console.log(res);

        this.tableHeadData = res.data;
      });

      // 获取表格数据
    this.handleGetTableDatas();
    // let isadmin=window.sessionStorage.getItem('isadmin')
    if(isadmin=='0'){
      this.isShowSearchGroup=!this.isShowSearchGroup

    }
    
    // let str=this.name;//截取后4位
    // let name=str.substring(str.length-12)
    // // 获取表格总计栏标题
    // switch (name) {
    //   case 'client_funds':
    //     this.totalClumn = setClientFundsTotal()
    //     break;
    //   case '_transaction':
    //     this.totalClumn = setTransactionTotal()
    //     break;  
    //   default:
    //     break;
    // }
  },
}
</script>

<style>
#excel-upload-input{
  display: none;
  z-index: -9999;
}

.main {
  padding-right: 20px;
}

.main /deep/ .el-table {
  font-size: 12px;
}

.main /deep/ .table-header-cells,
.main /deep/ .table-cells {
  height: auto !important;
  padding: 5px 0 !important;
}

.main /deep/ .el-table--medium td,
.main /deep/ .el-table--medium th {
  padding: 5px 0 !important;
}
.main /deep/ .el-table td,
.main /deep/ .el-table th {
  padding: 0 !important;
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
.demo-form-inline{
  display: flex;
  justify-content: flex-start;
  /* padding-bottom: -10px; */
}
.el-col-2 {
    width: 4.33333%;
}
</style>
