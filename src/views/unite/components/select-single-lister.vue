<template>
  <div class="select-lister">
    <div class="choice-container">
      <el-button v-if="!isSelect" type="primary" icon="el-icon-plus" @click="isSelect = true"></el-button>
      <div v-else class="choice-case">
        <div class="choice-item">
          <!-- <div class="choice-title">{{choiceTitle}}</div> -->
          <el-button v-if="tables !== ''" type="primary" plain>{{tables}}<i class="el-icon-close"></i></el-button>
          <el-select v-else v-model="tables" :disabled="disabled" :placeholder="choiceTitle" @change="handleChoiceTables">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
              :disabled="item.disabled">
            </el-option>
          </el-select>
          <div v-if="false" class="choice-list-result">
            <div style="width: 82px;"><el-input style="width: 82px;" :maxlength="8" :placeholder="currentTime"></el-input></div>
            <div style="margin: 0 5px;">-</div>
            <div style="width: 82px;"><el-input style="width: 82px;" :maxlength="8" :placeholder="currentTime"></el-input></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 说明：select-lister组件单选版
 *
 */

export default {
  name: 'select-lister',
  props: {
    choiceTitle: {
      type: String,
      default: '选择导出表'
    },
    isStartSelect: {    // 是否开启组件使用
      type: Boolean,
      default: false,
    },
    disabled: {         // 选择列表是否禁用
      type: Boolean,
      defaule: false
    },
    options: {
      type: Array,
      default() {
        return [    // 选择列表
          {
            value: 'unique_code',
            label: '唯一标识码',
            disabled: false,
          },
        ]
      }
    }
  },
  data() {
    return {
      isSelect: false,       // 是否显示选择列表(false显示 加号按钮)
      tables: '',
      currentTime: '',       // 当前时间yyyymmdd
    }
  },
  methods: {
    /**
     * 设置optionsList值
     */
    setOptions(val) {
      this.options = val;
    },

    /**
     * 设置已选中的值
     */
    setSelected(val) {
      this.tables = val;
    },

    /**
     * 获取已选中的值
     */
    getSelected() {
      return {};
    },

    /**
     * 多项选择列表*选择表格
     * @callback change
     * @todo 显示已选择的项目
     */
    handleChoiceTables(val) {
      this.tables = val;

      this.$emit('selected');
    },

  },

  watch: {

  },

  mounted() {
    this.isSelect = this.isStartSelect;

    this.currentTime = new Date().Format();
  },
}
</script>

<style>
.choice-list-result {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
</style>
