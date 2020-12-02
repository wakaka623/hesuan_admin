<template>
  <div class="multipleChoiceCase" v-if="isShow">
    <div class="container clearfix">
      <div class="choice-item">
        <label>
          <span class="choice-name">{{valls}}</span>
          <el-select v-model="choiceValue" placeholder="请输入关键字" filterable remote reserve-keyword :remote-method="handleRemoteMethod" :loading="loading">
            <el-option v-for="item in choiceList" :key="item" :value="item"></el-option>
          </el-select>
        </label>
      </div>
    </div>
  </div>
  <!-- <div class="operation">
    <el-button type="primary" @click="handleTofinish">确定</el-button>
    <el-button class="cancel" @click="handleClear">取消</el-button>
  </div> -->
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
          // 'customer_number': '客户号'
        }
      }
    },
    keyName: {
      type: String,
      default: 'intermediate'
    },
    valls: {
      type: String,
      default: '居间'
    },
    // choiceList: {           // 条件字段选项列表
    //   type: Array,
    //   default() {
    //     return []
    //   }
    // }
  },
  data() {
    return {
      choiceValue: '',      // 选中的数据
      choiceList: [],
      loading: false,
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
    },

    handelEndLoading() {
      this.loading = false;
    },

    handleRemoteMethod(val) {
      this.loading = true;

      setTimeout(() => {
        this.choiceList.push(val);
        this.loading = false;
      }, 1000);

      this.$emit('remote-method', { val, keyName: this.keyName });
    },
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
