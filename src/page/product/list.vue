<template>
    <div>
       <el-button type="primary" size="small" @click="toAddHandler">添加</el-button>
       <el-button type="danger" size="small">批量删除</el-button>
       
       <el-table :data="employees">
           <el-table-column fixed="left" prop="id" label="编号"></el-table-column>
            <el-table-column fixed="left" prop="name" label="产品名称"></el-table-column>
           <el-table-column prop="realname" label=""></el-table-column>
           <el-table-column prop="price" label="价格"></el-table-column>
           <el-table-column prop="status" label="状态"></el-table-column>       
           <el-table-column width=120px prop="categoryId" label="所属产品"></el-table-column>
           <el-table-column fixed="right" label="操作">
                <template v-slot="slot">
                  <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                  <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>

              </template>
           </el-table-column>
       </el-table>  
        <!--分页符-->
       <el-pagination
          layout="prev, pager, next"
           :total="50">
        </el-pagination> 
        <!--/分页符-->
              <!--模态框-->
        <el-dialog
            title="录入员工信息"
            :visible.sync="visible"
            width="60%">
            <el-form :model=form label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="form.name"/>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="form.price"/>
                </el-form-item>
                <el-form-item label="所属产品">
                    <el-dropdown>
                        <el-button  v-model="form.categoryId">
                            请选择<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                    <el-dropdown-menu slot="dropdown"> 
                        <el-dropdown-item>12</el-dropdown-item>
                          <el-dropdown-item>家居洗护</el-dropdown-item>
                          <el-dropdown-item>9357</el-dropdown-item>
                          <el-dropdown-item>洗护服务</el-dropdown-item>
                          <el-dropdown-item>生活急救箱</el-dropdown-item>
                          <el-dropdown-item>yyy</el-dropdown-item>
                          <el-dropdown-item>水果慢羊羊</el-dropdown-item>
                          <el-dropdown-item>wxj</el-dropdown-item>
                          <el-dropdown-item>www</el-dropdown-item>
                          <el-dropdown-item>123</el-dropdown-item>
                          <el-dropdown-item>嗷嗷嗷啊</el-dropdown-item>
                     </el-dropdown-menu>
                    </el-dropdown>
                </el-form-item>
                  <el-form-item label="介绍">
                    <el-input  type="textarea" rows="2" placeholder="请输入内容" v-model="form.description"/>
                </el-form-item>
                 <el-form-item label="产品主图">
                     <el-button type="primary" v-model="form.photo">
                         点击上传<i class="el-icon-upload el-icon--right"></i>
                     </el-button>
                </el-form-item>
                只能上传jpg/png文件，且不超过500kb
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closModleHandler" >取 消</el-button>
                <el-button type="primary" @click="closModleHandler" >确 定</el-button>
            </span>
        </el-dialog>
        <!--/模态框-->
    </div>
</template>
<script>
import request from '@/utils/request'
import querystring from 'querystring'
export default {
    methods:{
        submitHandler(){
            let url = "http://localhost:6677//product/saveOrUpdate"
            request({
                url,
                method:"POST",
                headers:{
                    "Conten-Type":"application/x-form-urlencoded"
                },
                data:querystring.stringfy(this.form)
            })
        },
        loadData(){
            let url = "http://localhost:6677/product/findAll";
            request.get(url).then((response)=>{
                this.employees = response.data;
            }).then((response)=>{
                // 模态框关闭
              this.closeModalHandler();
                 // 刷新
              this.loadData();
                 // 提示消息
              this.$message({
                  type:"success",
                  message:response.message
              })
          })
        },
        toDeleteHandler(id){
            //确认
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
             this.$message({
                type: 'success',
                message: '删除成功!'
             });
            })
        },
        toUpdateHandler(){
            this.visible = true;
        },
       closModleHandler(){
           this.visible = false;
       },
        toAddHandler(){
            this.title = "录入员工信息";
            this.visible = true ;
        }
    },
    data(){
        return {
            title:"录入员工信息",
            visible:false,
            employees:[],
            form:{
                type:"waiter"
            }
        }  
    },
  created(){
        //在页面加载出来的时候加载数据
        this.loadData();
    }
}
</script>
<style scoped>
</style>