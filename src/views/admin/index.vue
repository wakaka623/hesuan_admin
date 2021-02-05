<template>
<div>
<div class="register">
    <el-button class="thirdparty-button" type="primary" @click="showDialog=true" :disabled='this.disable==false?true:false'>{{'添加用户'}}</el-button>
    <el-dialog class="dialog" title="用户信息：管理员类别(1为超级管理员,2为部门经理，0为部门主任)" :visible.sync="showDialog" append-to-body>
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
        <el-form-item label="管理员类别">
          <el-select v-model="regForm.reAdmin" clearable placeholder="请选择管理员类别" @change="getRole($event)" class="select">
                <el-option
                v-for="item in select1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组别">
          <el-select v-model="regForm.regroup" filterable
            placeholder="请选择组别" :loading="loading" @change="getList($event)" class="select">
                <el-option
                v-for="item in select2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="组别" prop="regroup">
          <el-input v-model="regForm.regroup"></el-input>
        </el-form-item>
        <el-form-item label="管理员类别" prop="reAdmin">
          <el-input v-model="regForm.reAdmin"></el-input>
        </el-form-item> -->
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
   // 管理员权限和组别二级联动
      let select1=[
        {value:'2',label:'经理'},
        {value:'0',label:'主任'}
      ]
      let group=[
        {pro:'2',label:'01'},
        {pro:'2',label:'02'},
        {pro:'2',label:'03'},
        {pro:'2',label:'04'},
        {pro:'2',label:'05'},
        {pro:'2',label:'06'},
        {pro:'2',label:'07'},
        {pro:'2',label:'08'},
        {pro:'2',label:'09'},
        {pro:'0',label:'0101'},
        {pro:'0',label:'0102'},
        {pro:'0',label:'0103'},
        {pro:'0',label:'0104'},
        {pro:'0',label:'0201'},
        {pro:'0',label:'0202'},
        {pro:'0',label:'0203'},
        {pro:'0',label:'0301'},
        {pro:'0',label:'0302'},
        {pro:'0',label:'0303'},
        {pro:'0',label:'0304'},
        {pro:'0',label:'0401'},
        {pro:'0',label:'0402'},
        {pro:'0',label:'0403'},
        {pro:'0',label:'0404'},
        {pro:'0',label:'0501'},
        {pro:'0',label:'0601'},
        {pro:'0',label:'0602'},
        {pro:'0',label:'0603'},
        {pro:'0',label:'0701'},
        {pro:'0',label:'0702'},
        {pro:'0',label:'0703'}
      ]
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
            this.$ref.regForm.validateField("repassword");
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
        ]
      },
        showDialog: false,
        passwordType1:"password",
        passwordType2:"password",
        disable:false,
        select1: select1,
        loading: false,
        select2:[]
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
        },
        getRole (prov) {
          let roles = []
          this.select2= []
          for (var val of group) {
            if (prov===val.pro) {
              console.log(val)
              roles.push({ label: val.label, value: val.label })
              console.log(roles)
            }
            this.select2 = roles
          }
          
        },
        getList (opt) {
          console.log(opt)
        }
    }
  }
</script>

<style scoped>
.register{
    display: flex;
    justify-content: flex-end;
    transform: translate(-10%);
    margin-top: 8px;
    padding-bottom: 8px;
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
.select{
  width: 100%;

}


</style>