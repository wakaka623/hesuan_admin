<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRul" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" :disabled="form.username=='admin'?true:false"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input v-model="form.repassword"/>
      </el-form-item>
      <el-form-item label="组别">
        <el-input v-model="form.group" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserMsg,updataUser } from '@/api/admin'
export default {
  data() {
     // <!--验证密码-->
     let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.form.repassword !== "") {
          this.$refs.form.validateField("repassword");
        }
        callback()
      }
    }
    // <!--二次验证密码-->
     let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
      }
    return {
      form: {
        Id:'',
        group: "",
        password: "",
        repassword:"",
        username: ""
      },
      formRul:{
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'change' }
        ],
        repassword:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'change' }
        ]
      }
    }
  },
  created() {
    let id=this.$route.params.id
    getUserMsg(id).then(res=>{
      this.form=res.data;
    })
  },
  methods: {
    onSubmit() {
      updataUser(this.form).then(res=>{
        console.log(res);
        if(res.data.code=='1'){
          this.$message({type:'success',message:res.data.message});
        }else{
          this.$message({type:'errer',message:res.data.message});
        }
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

