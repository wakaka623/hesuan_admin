<template>
  <div class="form-group" v-if="show">
    <selectLister ref="selecTableList" choiceTitle="选择导出表" />
    <div id="form-wrap" class="form-wrap">
      <div class="form-item" :class="item.label === addoptns ? 'form-item-life' : ''" v-for="(item, index) in options" :key="index">
        <div class="item-label"><div style="white-space: nowrap;">{{item.label}}: </div></div>
        <div class="item-input-wrap" style="display: flex; align-items: center; flex-wrap: wrap;width: 260px;">
          <!-- <el-input name="d" :style="setInputWidth(item.value)" placeholder="请输入内容"></el-input> -->
          <div v-for="(m, i) in item.selectData" :key="i" style="display: flex;" :style="(i > 1 ? 'margin-top: 3px;' : '')">
            <div v-if="(i % 2) && item.value == 'unique_code'" class="" style="align-self: center;margin: 0 5px;">-</div>
            <div v-if="(i % 2) && item.value != 'unique_code'" class="" style="align-self: flex-end;">，</div>
            <el-input name="d" :style="setInputWidth(item.value)" placeholder="请输入内容" data-type="123999" maxlength="20" @input="handelFormItemInput(index, i, $event)"></el-input>
          </div>

          <!-- <div v-if="index === 1" style="display: flex;">
            <div class="" style="align-self: flex-end;">，</div>
            <el-input name="d" :style="setInputWidth(item.value)" placeholder="请输入内容"></el-input>
          </div>
          <div v-if="index === 1" style="display: flex; margin-top: 3px;">
            <el-input name="d" :style="setInputWidth(item.value)" placeholder="请输入内容"></el-input>
          </div> -->
          <!-- <div v-if="item.value === 'unique_code'" style="margin: 0 5px;">-</div>
          <el-input v-if="item.value === 'unique_code'" name="d" :style="setInputWidth(item.value)" placeholder="请输入内容"></el-input> -->
          <div :style="setInputWidth(item.value)" style="display: flex; justify-content: flex-end;margin-top: 3px;">
            <el-button type="primary" :disabled="item.selectData.length == 4" style="margin-left: 10px; padding: 10px;" @click="handleAddInputItem(index)"><i class="el-icon-plus"></i></el-button>
            <el-button type="primary" :disabled="item.selectData.length == 1" style="margin-left: 10px; padding: 10px;" @click="handleDelInputItem(index)"><i class="el-icon-delete"></i></el-button>
          </div>
        </div>
      </div>
      <div class="form-item" v-if="stayAddList.length > 0">
        <!-- <div class="item-label" style="color: rgb(64, 158, 255);">添加字段: </div>
        <el-select class="stay-input" v-model="addoptns" placeholder="添加键" @change="handleAddOption">
          <el-option
            v-for="item in stayAddList"
            :key="item.value"
            :label="item.label"
            :value="item.label"
            :disabled="item.disabled">
          </el-option>
        </el-select> -->
      </div>
    </div>
    <div class="bottom-tools">
      <div style="position: absolute; left: 0; display: flex; align-items: center;">
        <div class="item-label" style="color: rgb(64, 158, 255);">添加字段: </div>
        <el-select class="stay-input" v-model="addoptns" placeholder="添加键" @change="handleAddOption">
          <el-option
            v-for="item in stayAddList"
            :key="item.value"
            :label="item.label"
            :value="item.label"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </div>
      <div class="btn-wrap" style="margin-left: -20px;">
        <el-button @click="handleClear">取消</el-button>
        <el-button type="primary" @click="handleFinish"><i class="el-icon-download"></i>确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import selectLister from './select-lister.vue';

export default {
  components: {
    selectLister
  },
  props: {
    show: {    // 是否展示组件
      type: Boolean,
      default: false
    }
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
      addoptns: '',
      options: [{
        value: 'unique_code',
        label: '唯一标识码',
        disabled: false,
        selectData: [''],
      },{
        value: 'category',
        label: '类别',
        disabled: false,
        selectData: [''],
      },{
        value: 'customer_name',
        label: '客户号',
        disabled: false,
        selectData: [''],
      },
      {
        value: 'customer_number',
        label: '客户姓名',
        disabled: false,
        selectData: [''],
      }],
      stayAddList: [
        {
          value: 'deposit',
          label: '入金',
          disabled: false,
          selectData: [''],
        },
        {
          value: 'withdrawal',
          label: '出金',
          disabled: false,
          selectData: [''],
        },
        {
          value: 'deposit_and_withdrawal',
          label: '出入金',
          disabled: false,
          selectData: [''],
        },
        {
          value: 'handling_fee',
          label: '手续费',
          disabled: false,
          selectData: [''],
        },
        {
          value: 'hand_in_fee',
          label: '上交手续费',
          disabled: false,
          selectData: [''],
        },
        {
          value: 'retention_fee',
          label: '留存手续费',
          disabled: false,
          selectData: [''],
        },
        {
          value: 'total_profit_and_loss',
          label: '总盈亏',
          disabled: false,
          selectData: [''],
        },
        {
          value: 'ending_equity',
          label: '期末权益',
          disabled: false,
          selectData: [''],
        },
      ],

    }
  },

  computed: {

  },

  methods: {
    /**
     * 设置输入框宽度
     */
    setInputWidth(val) {
      let style = '';
      switch (val) {
        // case 'unique_code':
        //   style = 'width: 100px;';
        //   break;
        case '':

          break;
        case '':

          break;

        default:
          style = 'width: 120px;';
          break;
      }

      return style;
    },

    /**
     * 输入值
     */
    handelFormItemInput(index, i, val) {
      this.options[index].selectData[i] = val;
    },

    /**
     * 添加键输入框
     */
    handleAddInputItem(index) {
      this.options[index]['selectData'].push('');
    },
    /**
     * 删除键输入框
     */
    handleDelInputItem(index) {
      this.options[index]['selectData'].pop();
    },

    /**
     * 选择字段
     * @callback change
     * @todo 给界面添加字段
     */
    handleAddOption(val) {
      let data = {};

      this.stayAddList.some((item) => {
        if (item.label === val) {
          this.options.push(item);
          data = item;
          return true;
        }
      });

      for (let i = 0; i < this.stayAddList.length; i++) {
        const item = this.stayAddList[i];

        if (data.value === item.value) {
          this.stayAddList.splice(i, 1);
          break;
        }
      }

      setTimeout(() => {
        this.addoptns = '';
      }, 300);


      // this.$emit('add', { value: data });
    },

    /**
     * 取消按钮
     * @callback click
     */
    handleClear() {
      let dels = [];
      const len = this.options.length;
      for (let i = 0; i < len; i++) {
        const item = this.options[i];

        // 客户姓名后全移除
        if (item.value === 'customer_number') {
          dels = this.options.splice(i + 1, len-1-i);
          break;
        }
      }

      for (let i = dels.length - 1; i >= 0; i--) {
        const item = dels[i];

        this.stayAddList.unshift(item);
      }

      this.$emit('clear');
    },

    /**
     * 确定按钮
     */
    handleFinish() {
      const options = this.options;
      const tableList = this.$refs.selecTableList.getOptionsList();

      this.$emit('finish', { tableList, options });
    },
  },

  watch: {
    show(val) {
      setTimeout(() => {
        // 设置可导出表
        val && this.$refs.selecTableList.setOptionsList(this.selecTableList);
      }, 100);
    }
  },

  mounted() {

  },
}
</script>

<style>
.show {

}
.hide {

}

.form-group {
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
}

.form-wrap {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}

.form-item {
  width: 23%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 2%;
  margin-bottom: 25px;
}

@keyframes life {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.form-item-life {
  animation: life .25s forwards;
}

.item-label {
  color: #222;
  font-weight: 700;
  margin-right: 10px;
  font-size: 15px;
}

.bottom-tools {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding-right: 20px;
  padding: 20px;
  border-top: 1px dashed #72b4f7;
  position: relative;
}

</style>
