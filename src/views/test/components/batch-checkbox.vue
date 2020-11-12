<template>
  <div class="batch-checkbox">
    <div class="batch-container">
      <div class="batch-title">选择要导出的页码</div>
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="leng" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="(m, i) in leng" :label="i" :key="i">{{i + 1}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    leng: {
      type: Number,
      value: 0
    }
  },
  data() {
    return {
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true
    }
  },
  methods: {
    /**
     * 点击全选按钮
     */
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },

    /**
     * 点击单个按钮
     */
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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
  z-index: 999999999;
}

.batch-container {
  width: 400px;
  height: 300px;
  background: #fff;
  border-radius: 4px;
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
</style>
