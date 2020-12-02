<template>
  <div class="batch-checkbox" v-if="isShow" @click="isShow = true">
    <div class="batch-container" @click.stop>
      <div class="batch-title">选择要导出的页码</div>
      <div class="checkbox-wrap">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div class="checkbox-scroll">
          <div class="my-checkbox" v-for="(item, index) in currentPageList" :key="index">
            <label>
              <input type="checkbox" :value="item" @change="handleCheckedChange(item, index)"/>
              <span class="txt">{{item}}</span>
            </label>
          </div>
          <!-- <el-checkbox ref="checkbox"
            :style="checkboxStyle(index)"
            v-for="(item, index) in currentPageList"
            :key="index" border
            :value="dd[index]"
            :true-label="item"
            :false-label="0"
            @change="handleCheckedChange(item, index)">{{item}}</el-checkbox> -->
          <!-- <el-checkbox-group :value="checkedDatas[paginationCurrent - 1]" @change="handleCheckedCitiesChange">
          </el-checkbox-group> -->
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="50"
          :current-page="paginationCurrent"
          :total="pagesCount"
          style="display: flex; justify-content: center;"
          @current-change="handlePageSelectorChange">
        </el-pagination>
      </div>
      <div class="operation">
        <el-button type="primary" @click="handleTofinish">确定</el-button>
        <el-button class="cancel" @click="isShow = false; checkedDatas = []">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui';

export default {
  props: {
    pagesCount: {    // 表格的页数
      type: Number,
      value: 0
    },
  },
  data() {
    return {
      isShow: false,        // 是否显示组件
      checkAll: false,      // 全选按钮是否选中
      isIndeterminate: true,    // 全选按钮的样式
      paginationCurrent: 1,     // 底部页码栏当前选择的页数
      checkedDatas: [[]],         // 选中的页码集 { paginationCurrent: [...], 2: [...] }
      dd:[]
    }
  },
  computed: {
    /**
     * 根据pagesCount和底部栏当前选择的页数显示当前的页数列表
     */
    currentPageList() {
      const arr = [];
      const startPage = ((this.paginationCurrent - 1) * 50) + 1;
      const endPageCurrent = (this.paginationCurrent * 50);
      const endPage = this.pagesCount < endPageCurrent ? this.pagesCount : endPageCurrent;

      for (let i = startPage; i <= endPage; i++) {
        if (i < 10) {
          arr.push('0' + i);
        } else {
          arr.push(i);
        }
      }

      if (!this.checkedDatas[this.paginationCurrent - 1]) {
        this.checkedDatas[this.paginationCurrent - 1] = [];
      }


      return arr;
    },
  },
  methods: {
    /** 展示组件 */
    display() {
      this.isShow = true;
    },

    /**
     * 多选框按钮的样式
     */
    checkboxStyle(index){
      const cStyle = 'margin-bottom: 5px; min-width: 80px'
      return (index % 5 === 0) ? ('margin-left: 0;' + cStyle) : cStyle;
    },

    /**
     * 点击全选按钮
     * @param val 当前全选按钮是否激活
     */
    handleCheckAllChange(val) {
      if (val) {
        this.checkedDatas[this.paginationCurrent - 1] = this.currentPageList;
      } else {
        this.checkedDatas[this.paginationCurrent - 1] = [];
      }

      this.isIndeterminate = false;  // 关闭全选按钮样式
    },

    /**
     * checkBox-group容器监听页码集change事件
     * @param value 当前已选择页码按钮的集合
     * @callback checkBox-group选中回调
     * @todu 改变全选按钮样式
     */
    handleCheckedCitiesChange(value) {
      // console.log(value);
      return;
      let checkedCount = value.length;

      this.checkAll = checkedCount === this.currentPageList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.currentPageList.length;
    },

    handleCheckedChange(value, current) {
      console.log(value);
      return;
      console.log(this.$refs.checkbox[current]);

      if (this.$refs.checkbox[current].isChecked) {
        this.checkedDatas[this.paginationCurrent - 1][current] = value;
        this.dd[current] = value;
      } else {
        this.checkedDatas[this.paginationCurrent - 1][current] = 0;
        this.dd[current] = 0;
      }

      return;

      if (!this.$refs.checkbox[current].isChecked) {
        this.checkedDatas[this.paginationCurrent - 1].push(value);
      } else {
        const index = this.checkedDatas[this.paginationCurrent - 1].indexOf(value);
        this.checkedDatas[this.paginationCurrent - 1].splice(index, 1);
      }
    },

    /**
     * 底部页码选择栏发生改变
     * @callback
     */
    handlePageSelectorChange(current) {
      this.paginationCurrent = current;


      if (!this.checkedDatas[current - 1]) {
        this.isIndeterminate = false;
        this.checkAll = false;
        return;
      }

      if (this.checkedDatas[current - 1].length === this.currentPageList.length) {
        this.checkAll = true;
        this.isIndeterminate = false;
      } else if(this.checkedDatas[current - 1].length > 0) {
        this.checkAll = false;
        this.isIndeterminate = true;
      } else {
        this.checkAll = false;
        this.isIndeterminate = false;
      }
    },

    /**
     * 点击确定
     */
    handleTofinish() {
      // if (!this.isCheckedBox) {
      //   Message.error('当前没有选中页码');
      //   return;
      // }



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
  width: 480px;
  background: #fff;
  border-radius: 5px;
  position: relative;
  top: 15%;
  margin: 0 auto;
  overflow: hidden;
  padding: 20px 0;
}

.checkbox-wrap {
  padding: 20px;
}

.checkbox-scroll {
  width: 500px;
  min-height: 300px;
  max-height: 410px;
  overflow-y: auto;
  margin-top: 15px;
}

.batch-title {
  text-align: center;
  color: #409EFF;
  font-size: 20px;
}

.operation {
  display: flex;
  margin-top: 10px;
  padding: 0 20px;
  flex-direction: row-reverse;
}

.cancel {
  margin-right: 10px;
}

.my-checkbox {
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
