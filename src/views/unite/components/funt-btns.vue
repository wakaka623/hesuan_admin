<template>
  <div class="header">
    <div class="select-wrap">
      <!-- <selectLister ref="selecTableList" choiceTitle="选择导出表" /> -->
    </div>
    <div class="title-container">
      <div class="title">{{headerTitle}}</div>
      <div class="funt-warp">
        <input type="file" class="excel-upload-input" id="excel-upload-input" accept=".xlsx, .xls" @change="handleFileChange">
        <el-button type="primary" @click="handleUpload">导入</el-button>
        <el-button type="primary" @click="handleDownload">导出</el-button>
        <el-button type="primary" @click="handleMoreDownload">条件导出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import selectLister from './select-lister.vue';

export default {
  components: {
    selectLister,
  },
  props: {
    headerTitle: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      selecTableList: [    // 表格可选择列
        {
          label: '瑞达',
          options: [
            {
              value: 'ruida_fund_reconciliation',
              label: '瑞达资金表',
              disabled: false,
            },
            {
              value: 'ruida_transaction',
              label: '瑞达成交表',
              disabled: false,
            },
            {
              value: 'ruida_cash_in_and_out',
              label: '瑞达出入金表',
              disabled: false,
            }
          ]
        },
        {
          label: '三立',
          options: [
            {
              value: 'sanli_customer_funds',
              label: '三立客户资金表',
              disabled: false,
            },
            {
              value: 'sanli_customer_transaction',
              label: '三立客户成交表',
              disabled: false,
            }
          ]
        },
        {
          label: '金控',
          options: [
            {
              value: 'jinkong_cash_in_and_out',
              label: '金控出入金表',
              disabled: false,
            },
            {
              value: 'jinkong_fund_reconciliation',
              label: '金控资金统计表',
              disabled: false,
            },
            {
              value: 'jinkong_transaction_statistics',
              label: '金控交易统计表',
              disabled: false,
            }
          ]
        },
        {
          label: '恒银',
          options: [
            {
              value: 'hengyin_customer_funds',
              label: '恒银客户资金表',
              disabled: false,
            },
            {
              value: 'hengyin_customer_transaction',
              label: '恒银客户成交表',
              disabled: false,
            }
          ]
        },
        {
          label: '华鑫',
          options: [
            {
              value: 'huaxin_cash_in_and_out',
              label: '华鑫出入金表',
              disabled: false,
            },
            {
              value: 'huaxin_fund_reconciliation',
              label: '华鑫资金对账表',
              disabled: false,
            },
            {
              value: 'huaxin_transaction_statistics',
              label: '华鑫交易统计表',
              disabled: false,
            }
          ]
        },
        {
          label: '创元',
          options: [
            {
              value: 'chuangyuan',
              label: '创元统计表',
              disabled: false,
            }
          ]
        },
        {
          label: '东证',
          options: [
            {
              value: 'dongzheng',
              label: '东证统计表',
              disabled: false,
            }
          ]
        },
      ],
      leng: 1,
    }
  },

  methods: {
    /**
     * 导入
     * @callback input-change
     */
    handleFileChange(e) {
      this.$emit('import', { target: e.target });
    },

    /**
     * 点击导入
     */
    handleUpload() {
      document.getElementById('excel-upload-input').click();
    },

    /**
     * 点击导出
     * @callback
     */
    handleDownload() {
      this.$emit('download');
    },

    /**
     * 批量导出按钮
     * @callback click
     */
    handleMoreDownload() {
      this.$emit('more-down');
    },

    handleStartSeleect() {
      console.log('start')
      this.leng += 1;
    },
  },

  mounted() {
    // this.$refs.selecTableList.setOptionsList(this.selecTableList);  // 选择列表
    // this.$refs.selecColumnList.setOptions(this.selecColumnList);  // 选择字段
    // this.$refs.selectMainColumn.setSelected('唯一标识码');  // 选择字段
  },
}
</script>

<style>
.select-wrap {
  display: flex;
}

.header {
  margin-bottom: 10px;
}

.choice-header-warp {
  display: flex;
  color: #409EFF;
  justify-content: space-around;
}

.title-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.title {
  color: #409EFF;
  font-size: 22px;
}

.title-container .funt-warp {
  position: absolute;
  right: 20px;
}

.select-single {
  margin-left: 20px;
}
</style>
