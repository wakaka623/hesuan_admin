<template>
  <div class="form-group" v-if="show">
    <selectLister ref="selecTableList" choiceTitle="选择导出表" />
    <div id="form-wrap" class="form-wrap">
      <div class="form-item" :class="item.label === addoptns ? 'form-item-life' : ''" v-for="(item, index) in options" :key="index">
        <div class="item-label" style="width: 54px;"><div>{{item.label}}: </div></div>
        <div class="item-input-wrap" style="display: flex; align-items: center; flex-wrap: wrap;width: 260px;">
          <div v-for="(m, i) in item.selectData" :key="i" style="display: flex;" :style="(i > 1 ? 'margin-top: 3px;' : '')">
            <div v-if="inputSeparator(item.value, i) == 1" style="align-self: center;margin: 0 5px;">-</div>
            <div v-if="inputSeparator(item.value, i) == 2" style="align-self: flex-end;">，</div>
            <el-input :class="showInputAnimation(item, i)" :style="setInputWidth(item)" placeholder="请输入内容" maxlength="20" @input="handelFormItemInput(index, i, $event)"></el-input>
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end;margin-top: 3px;">
          <el-button type="primary" :disabled="setformAddBtnDisabled(item)" style="padding: 10px;" @click="handleAddInputItem(index, item)"><i class="el-icon-plus"></i></el-button>
          <el-button type="primary" :disabled="setformDelBtnDisabled(item)" style="margin-left: 10px; padding: 10px;" @click="handleDelInputItem(index, item)"><i class="el-icon-delete"></i></el-button>
        </div>
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
        <el-button type="primary" :disabled="isBtnFinish" @click="handleFinish"><i :class="btnFinishIcon(isBtnFinish)"></i>确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import selectLister from './select-lister.vue';

export default {
  components: {
    selectLister
  },
  props: {
    show: {            // 是否展示组件
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      selecTableList: [    // 表格可选择列
        {
          label: '瑞达',
          options: [
            {
              value: 'ruida_client_funds',
              label: '瑞达资金表',
              disabled: false,
            },
            {
              value: 'ruida_transaction',
              label: '瑞达成交表',
              disabled: false,
            },
            {
              value: 'ruida_deposit_and_withdrawal',
              label: '瑞达出入金表',
              disabled: false,
            }
          ]
        },
        {
          label: '三立',
          options: [
            {
              value: 'sanli_client_funds',
              label: '三立客户资金表',
              disabled: false,
            },
            {
              value: 'sanli_transaction',
              label: '三立客户成交表',
              disabled: false,
            }
          ]
        },
        {
          label: '金控',
          options: [
            {
              value: 'jinkong_deposit_and_withdrawal',
              label: '金控出入金表',
              disabled: false,
            },
            {
              value: 'jinkong_client_funds',
              label: '金控资金统计表',
              disabled: false,
            },
            {
              value: 'jinkong_transaction',
              label: '金控交易统计表',
              disabled: false,
            }
          ]
        },
        {
          label: '恒银',
          options: [
            {
              value: 'hengyin_client_funds',
              label: '恒银客户资金表',
              disabled: false,
            },
            {
              value: 'hengyin_transaction',
              label: '恒银客户成交表',
              disabled: false,
            }
          ]
        },
        {
          label: '华鑫',
          options: [
            {
              value: 'huaxin_deposit_and_withdrawal',
              label: '华鑫出入金表',
              disabled: false,
            },
            {
              value: 'huaxin_client_funds',
              label: '华鑫资金对账表',
              disabled: false,
            },
            {
              value: 'huaxin_transaction',
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
      addoptns: '',        // 添加字段model绑定参数
      options: [{          // 字段选项集合
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
        value: 'customer_number',
        label: '客户号',
        disabled: false,
        selectData: [''],
      },
      {
        value: 'customer_name',
        label: '客户姓名',
        disabled: false,
        selectData: [''],
      }],
      newAddInput: {},     // 点击输入框新增按钮时记录的参数
      stayAddList: [       // 待添加字段集合
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
      isBtnFinish: false,  // 确定按钮是否禁用 true: 禁用
    }
  },

  computed: {

  },

  methods: {
    /**
     * @param {object} data
     * @param {Number} index
     * @todo 控制字段输入框旁边的添加按钮是否使用
     */
    setformAddBtnDisabled(data, index) {
      let isDisable = false;

      switch (data.value) {
        case 'unique_code':
        case 'deposit':
        case 'withdrawal':
        case 'deposit_and_withdrawal':
        case 'handling_fee':
        case 'hand_in_fee':
        case 'retention_fee':
        case 'ending_equity':
        case 'total_profit_and_loss':
          // 有两个输入框时禁止
          isDisable = data.selectData.length === 2;
          break;

        default:
          isDisable = data.selectData.length === 4;
          break;
      }

      return isDisable;
    },
    /**
     * @param {object} data
     * @todo 控制字段输入框旁边的删除按钮是否使用
     */
    setformDelBtnDisabled(data) {
      let isDisable = false;

      switch (data.value) {
        case 'unique_code':
        case 'category':
        case 'customer_number':
        case 'customer_name':
          // 有两个输入框时禁止
          isDisable = data.selectData.length === 1;
          break;
      }

      return isDisable;
    },

    /**
     * 确定按钮图标
     */
    btnFinishIcon(val) {
      return val ? 'el-icon-loading' : 'el-icon-download';
    },
    /**
     * 设置输入框宽度
     */
    setInputWidth(data) {
      let style = '';
      if (data.selectData.length > 1) {
        style = 'width: 110px';
      } else {
        style = 'width: 235px';
      }

      return style;
    },
    /**
     * 输入框分割符
     */
    inputSeparator(label, index) {
      if (index % 2 === 0) return 0;
      switch (label) {
        case 'unique_code':
        case 'deposit':
        case 'withdrawal':
        case 'deposit_and_withdrawal':
        case 'handling_fee':
        case 'hand_in_fee':
        case 'retention_fee':
        case 'ending_equity':
        case 'total_profit_and_loss':
          return 1;

        default:
          return 2;
      }
    },
    /**
     * 设置input输入框弹出效果
     */
    showInputAnimation(data, index) {
      if (this.newAddInput.value === data.value && index === data.selectData.length - 1) {
        return 'show-input';
      } else {
        return '';
      }
    },
    /**
     * 设置确定按钮是否奏效
     * @method
     */
    setBtnFinish(val) {
      this.isBtnFinish = val;
    },


    /**
     * 输入值
     * @callback input
     */
    handelFormItemInput(index, i, val) {
      this.options[index].selectData[i] = val;
    },

    /**
     * 添加键输入框
     */
    handleAddInputItem(index, data) {
      this.options[index]['selectData'].push('');

      this.newAddInput = data;
      setTimeout(() => {
        this.newAddInput = {};
      }, 300);
    },
    /**
     * 删除键输入框
     * @param index
     * @param data 当前按钮上字段信息
     * @callback 输入框旁边删除按钮
     */
    handleDelInputItem(index, data) {
      let isBaseField = 0;
      switch (data.value) {
        case 'unique_code':
        case 'category':
        case 'customer_number':
        case 'customer_name':
          isBaseField = 1;
          break;
      }

      // 基础字段只删除输入框(剩一个不会被删除)
      if (isBaseField || data.selectData.length > 1) {
        this.options[index]['selectData'].pop();
      } else if (data.selectData.length === 1) {
      // 额外新增的字段删除0个输入框直接删除字段
        this.options.some((item, index) => {
          if (item.value === data.value) {
            const arr = this.options.splice(index, 1);
            this.stayAddList.unshift(arr[0]);
            return true;
          }
        });
      }
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
        if (item.value === 'customer_name') {
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
     * @callback click
     * @todo 按照选定条件导出数据
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
  width: 24%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 1%;
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

.item-input-wrap .show-input {
  animation: life .25s forwards;
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
