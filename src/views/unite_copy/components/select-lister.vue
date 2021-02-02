<template>
  <div class="select-lister">
    <div class="choice-container">
      <div class="choice-case">
        <div class="choice-item">
          <!-- <div class="choice-title">{{choiceTitle}}</div> -->
          <el-select class="choice-item-select" v-model="tables" :placeholder="choiceTitle" @change="handleChoiceTables">
            <el-option-group
              v-for="group in optionsList"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
                :disabled="item.disabled">
              </el-option>
            </el-option-group>
          </el-select>
          <div class="choice-list-result">
            <el-checkbox v-for="item in choiceTabList" :key="item.value" :value="item.value" :label="item.label" :true-label="item.value" border @change="handleChangeTabCheckBox(item)"></el-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 说明：提供列表多项选择，清晰看到已选择的项目
 * 使用方式
 * 1. 调用组件setOptionsList()方法设置选择列表值
 * 2. getOptionsList() 获取已选中列表
 */

export default {
  name: 'select-lister',
  props: {
    choiceTitle: {
      type: String,
      default: '选择导出表'
    }
  },
  data() {
    return {
      tables: '',
      optionsList: [     // 多选列表
        // {
        //   label: '瑞达',
        //   options: [
        //     {
        //       value: 'ruida_fund_reconciliation',
        //       label: '瑞达资金表',
        //       disabled: false,
        //     },
        //     {
        //       value: 'ruida_transaction',
        //       label: '瑞达成交表',
        //       disabled: false,
        //     },
        //     {
        //       value: 'ruida_cash_in_and_out',
        //       label: '瑞达出入金表',
        //       disabled: false,
        //     }
        //   ]
        // },
      ],
      choiceTabList: [],  // 选中的列表
    }
  },
  methods: {
    /**
     * 设置optionsList值
     */
    setOptionsList(val) {
      this.optionsList = JSON.parse(JSON.stringify(val));
    },

    /**
     * 获取已选中的项目
     * @method
     */
    getOptionsList() {
      return this.choiceTabList;
    },

    /**
     * 多项选择列表*选择表格
     * @callback change
     */
    handleChoiceTables(val) {
      this.tables = '';

      this.optionsList.forEach((item, index) => {
        item.options.forEach((m, i) => {
          if (m.label === val) {
            m.disabled = true;

            this.choiceTabList.push(m);

            this.optionsList[index].options[i] = m;
            // this.optionsList[index].options.splice(i, 1, m);
            // break;
          }
        });
      });
    },

    /**
     * 点击已选中的表格选项
     */
    handleChangeTabCheckBox(val) {
      // 删除这个按钮
      this.choiceTabList.forEach((item, index) => {
        if (item.value === val.value) {
          this.choiceTabList.splice(index, 1);
        }
      });

      // select列表恢复可选状态
      this.optionsList.forEach((item, index) => {
        item.options.forEach((m, i) => {
          if (m.value === val.value) {
            m.disabled = false;

            this.optionsList[index].options.splice(i, 1, m);
            // break;
          }
        });
      });
    },
  },
}
</script>

<style>
.choice-item {
  text-align: center;
}

.choice-item-select {
  margin-bottom: 10px;
}

.choice-case {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}
</style>
