<template>
  <div class="batch-checkbox" v-if="isShow" @click="isShow = false">
    <div class="batch-container" @click.stop>
      <div class="batch-title">选择要导出的页码</div>
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox ref="checkbox" :style="checkboxStyle(index)" v-for="(item, index) in cities" :label="item" :key="index" border >{{checkboxText(index)}}</el-checkbox>
      </el-checkbox-group>
      <div class="operation">
        <el-button type="primary" @click="handleTofinish">确定</el-button>
        <el-button class="cancel" @click="isShow = false">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';

export default {
  props: {
    cities: {                // 页码对应的数组
      type: Array,
      value: []
    }
  },
  data() {
    return {
      isShow: false,        // 是否显示组件
      checkAll: false,
      checkedCities: [],
      // cities: [['上海'], ['北京'], ['广州'], ['深圳']],
      isIndeterminate: true,  // 全选按钮的样式
      isCheckedBox: false,   // 当前是否有选中页码
    }
  },
  methods: {
    /** 展示组件 */
    display() {
      this.isShow = true;
    },

    /**
     * 每个多选框显示的文本
     */
    checkboxText(index) {
      const big = index + 1 < 10;
      return big ? ('0' + (index + 1)) : (index + 1);
    },
    /**
     * 多选框的样式
     */
    checkboxStyle(index){
      const cStyle = 'margin-bottom: 5px;'
      return (index % 5 === 0) ? ('margin-left: 0;' + cStyle) : cStyle;
    },

    /**
     * 点击全选按钮
     */
    handleCheckAllChange(val) {
      // return;
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
      this.isCheckedBox = true;
    },

    /**
     * 点击单个按钮
     */
    handleCheckedCitiesChange(value) {
      // return;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      this.isCheckedBox = checkedCount > 0 && checkedCount <= this.cities.length;
    },

    /**
     * 点击确定
     */
    handleTofinish() {
      if (!this.isCheckedBox) {
        Message.error('当前没有选中页码');
        return;
      }



      const arr = [];

      this.$refs.checkbox.forEach((item, index) => {
        if (item.isChecked) {
          arr.push(index + 1);
        }
      });

      this.$emit('finish', { pages: arr });

    },
  }
}
</script>

<style>
.batch-checkbox {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .6);
  z-index: 9;
}

.batch-container {
  width: 440px;
  min-height: 300px;
  background: #fff;
  border-radius: 5px;
  position: relative;
  top: 20%;
  margin: 0 auto;
  padding: 20px;
}

.batch-title {
  text-align: center;
  color: #409EFF;
  font-size: 20px;
  margin-bottom: 20px;
}

.operation {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 10px;
}

.cancel {
  margin-right: 10px;
}
</style>
