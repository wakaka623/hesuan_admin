<template>
  <div class="multipleChoiceCase" v-if="isShow">
    <div class="container clearfix">
      <div class="choice-item" v-for="(v,key) in choiceTitleList" :key="key">
        <label>
          <span class="choice-name">{{v}}</span>
          <el-select v-model="choiceValue[key]" :value-key="key" placeholder="请选择">
            <el-option v-for="item in choiceList[key]" :key="item" :value="item"></el-option>
          </el-select>
        </label>
      </div>
      <div class="operation">
        <el-button type="primary" @click="handleTofinish">确定</el-button>
        <el-button class="cancel" @click="handleClear">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: false,
    choiceTitleList: {      // 条件字段对的标题
      type: Object,
      default() {
        return {
          'intermediate': '居间',
          'customer_number': '客户号'
        }
      }
    },
    choiceList: {           // 条件字段选项列表
      type: Object,
      default() {
        return {
          'intermediate': ['员工', '伍世霞', '陈艳娜'],
          'customer_number': ['10010819', '10010820'],
        }
      }
    }
  },
  data() {
    return {
      choiceValue: {},      // 选中的数据
    }
  },
  methods: {
    handleTofinish() {
      const data = this.choiceValue;

      this.$emit('finish', { data });

      this.choiceValue = {};
    },

    handleClear() {
      this.choiceValue = {};

      this.$emit('clear');
    }
  },
}
</script>

<style>
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.container {
  padding: 10px;
}

.choice-item,
.operation {
  width: 23.4%;
  float: left;
  text-align: right;
  margin-bottom: 10px;
}

.choice-item .choice-name {
  font-weight: 400;
  margin-right: 20px;
  font-size: 14px;
  color: #333;
}
</style>
