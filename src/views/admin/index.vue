<template>
<div>
<div class="register">
    <el-button class="thirdparty-button" type="primary" @click="showDialog=true" :disabled='this.disable==false?true:false'>{{'添加用户'}}</el-button>
    <el-dialog class="dialog" title="用户信息" :visible.sync="showDialog" append-to-body>
      <el-form :model="regForm" ref="reForm" :rules="regFormRul">
        <el-form-item label="账号" prop="reusername">
          <el-input v-model="regForm.reusername"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="pwd1">
          <el-input v-model="regForm.password" :type="passwordType1"></el-input>
          <span class="show-pwd1" @click="showPwd1">
          <svg-icon icon-class="eye" />
        </span>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword" class="pwd2">
          <el-input v-model="regForm.repassword" :type="passwordType2" ></el-input>
          <span class="show-pwd2" @click="showPwd2">
          <svg-icon icon-class="eye" />
        </span>
        </el-form-item>
        <el-form-item label="组别" prop="regroup">
        <el-input v-model="regForm.regroup"></el-input>
        </el-form-item>
        <el-form-item label="管理员类别" prop="reAdmin">
          <el-input v-model="regForm.reAdmin"></el-input>
        </el-form-item>
        <el-button type="primary" @click="reg">确定</el-button>
      </el-form>
    </el-dialog>
</div>
<admin-list></admin-list>
</div>
</template>

<script>
import { getRegister } from '@/api/admin'
import AdminList from '@/components/AdminList'

  export default {
    components:{
      'admin-list':AdminList
    },
    data() {
      // <!--验证密码-->
     let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.regForm.repassword !== "") {
          this.$refs.regForm.validateField("repassword");
        }
        callback()
      }
    }
    // <!--二次验证密码-->
     let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
      }
      return {
        regForm:{
        reusername:'',
        password:'',
        repassword:'',
        regroup:'',
        reAdmin:''
        
      },
      regFormRul:{
        reusername: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'change' }
        ],
        repassword:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'change' }
        ],
        regroup:[
          { required: true, message: '请入组别', trigger: 'blur' },
          // { pattern:/(?<!\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])*(?!\d)/, message:'请填写正确的部门，总监为两位数，经理为四位数',trigger:'blur'}
        ],
        reAdmin:[
            { required: true, message: '管理员类别不能为空', trigger: 'blur' },
            { pattern:/^[0-2]{1}$/,message:'管理员类别只能为0,1,2，1为超级管理员,2部门总监，3部门经理',trigger:'blur'}
        ]
      },
        showDialog: false,
        passwordType1:"password",
        passwordType2:"password",
        disable:false
      }
    },
  created() {
    let user=this.$cookies.get('user');
    if(user=='admin'){
      this.disable=!this.disable
    }
  },
    methods: {
        reg(){
        getRegister(this.regForm.reusername,this.regForm.password,this.regForm.regroup,this.regForm.reAdmin)
          .then(res => {
            console.log(res);
            if(res.data.code==0){
              this.$message({type:'error',message:res.data.message});
            }
            else{
              this.$message({type:'success',message:res.data.message});
              this.showDialog=false
             window.location.reload()
            }
          })
        },
        showPwd1(){
          if (this.passwordType1 === 'password') {
            this.passwordType1 = ''
          } else {
            this.passwordType1 = 'password'
          }
          },
      showPwd2(){
        if (this.passwordType2 === 'password') {
          this.passwordType2 = ''
        } else {
          this.passwordType2 = 'password'
        }
      }
    }
  }
</script>

<style scoped>
.register{
    display: flex;
    justify-content: flex-end;
    transform: translate(-6%);
    margin-top: 5px;
}
.pwd1,.pwd2{
  position: relative;
}
.show-pwd1{
  position: absolute;
  right: 5px;
}
.show-pwd2{
  position: absolute;
  right: 5px;
}

</style>