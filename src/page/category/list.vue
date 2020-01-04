<template>
    <div>
        <!-- 按钮 -->
       <el-button type="primary" size="small" @click="toAddHandler">添加</el-button>
       <el-button type="danger" size="small">批量删除</el-button>
       <!-- /按钮 -->
       <!-- /表格 -->
       <el-table :data="categorys">
           <el-table-column fixed="left" prop="id" label="编号"></el-table-column>
            <el-table-column fixed="left" prop="name" label="产品名称"></el-table-column>
           <el-table-column prop="num" label="价格"></el-table-column>
           <el-table-column prop="icon" label="描述"></el-table-column>
           <el-table-column width=120px prop="parentId" label="所属产品"></el-table-column>
           <el-table-column fixed="right" label="操作">
                <template v-slot="slot">
                  <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                  <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>
                  <a href="" @click.prevent="toUpdateHandler(slot.row)">详情</a>

              </template>
           </el-table-column>
       </el-table>  
        <!--表格结束-->
        <!-- 分页开始 -->
       <!-- <el-paginationlayout="prev, pager, next" :total="50"> </el-pagination>  -->
        <!--/分页符-->
              <!--模态框-->
        <el-dialog
            title="录入员工信息"
            :visible.sync="visible"
            width="60%">
              <el-form :model="form" label-width="80px">
        <el-form-item label="栏目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input  v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="父栏目">
          <el-input v-model="form.parentId"></el-input>
        </el-form-item>
      </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="closModleHandler" >取 消</el-button>
                <el-button size="small" type="primary" @click="closModleHandler" >确 定</el-button>
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
       loadData(){
      let url ="http://localhost:6677/category/findAll"
      request.get(url).then((response)=>{
        // 将查询结果设置到customers中，this指向外部函数的this
        this.categorys = response.data;
      })
    },
    submitHandler(){
      //this.form 对象 ---字符串--> 后台 {type:'customer',age:12}
      // json字符串 '{"type":"customer","age":12}'
      // request.post(url,this.form)
      // 查询字符串 type=customer&age=12
      // 通过request与后台进行交互，并且要携带参数
      let url = "http://localhost:6677/category/saveOrUpdate";
      request({
        url,
        method:"POST",
        headers:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
        data:querystring.stringify(this.form)
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
                let url = "http://localhost:6677/category/deleteByld?id="+id;
             request.get(url).then((response)=>{
        this.loadData();
          this.$message({
                  type: 'success',
                  message: response.message
        });
          
        })
       
      })
      
    },
        toUpdateHandler(row){
            this.form =row;
            this.visible = true;
        },
       closModleHandler(){
           this.visible = false;
       },
        toAddHandler(){
          this.form = {
        type:"category"
      }
      this.visible = true;
    }
  },
    data(){
        return {
            title:"录入员工信息",
            visible:false,
            categorys:[],
            form:{
                type:"category"
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