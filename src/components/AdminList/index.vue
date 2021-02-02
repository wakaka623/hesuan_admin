<template>
<div>
    <el-table
    v-if="tableColShow"
    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    style="width: 100%">
    <el-table-column
      label="ID"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.Id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.username }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="密码"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.password}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="组别"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.group }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="管理员类别"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.is_admin }}</span>
      </template>
    </el-table-column>
    
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row.Id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          :disabled="scope.row.username=='admin'?true:false"
          @click="handleDelete(scope.row.Id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      class="paging"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]" 
      :page-size="pagesize"         
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">   
  </el-pagination>
  </div>
</template>

<script>
import { getUser,delUser } from '@/api/admin'
export default {
    data(){
        return{
            tableData: [{
            Id: '',
            username: '',
            password:'',
            token:'',
            group:'',
            is_admin:''
            }
          ],
          tableColShow:false,
          currentPage:1, //初始页
          pagesize:10,    //    每页的数据
          // userList: []
        }
    },
    created() {
    this.getUserList()
  },
    methods:{
      // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
              this.pagesize = size;
              console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
              this.currentPage = currentPage;
              console.log(this.currentPage)  //点击第几页
        },
        handleEdit(id) {
          // console.log(id);
        this.$router.push('/admin/edit/'+id)
      },
        handleDelete(id) {
        delUser(id).then(res=>{
          if(res.data.code=='1'){
            this.$message({type:'success',message:res.data.message})
            this.$router.go(0)
          }else{
            this.$message({type:'error',message:res.data.message})
          }
        })

      },
      getUserList(){
       let user =this.$cookies.get('user')
       let data={
         'user':user
       }
       getUser(data).then(res=>{
         if(res.data.code=='1'){
           this.tableData=res.data.data
           this.tableColShow=!this.tableColShow
         }else{
           this.$message({type:'error',message:res.data.message})
         }
       })
      }

    }
}
</script>

<style scoped>
.paging{
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 50px;
}

</style>