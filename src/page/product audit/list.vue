<template>
    <div>
       <el-button type="primary" size="small" @click="toAddHandler">添加</el-button>
       <el-button type="danger" size="small">批量删除</el-button>
       
       <el-table :data="products">
           <el-table-column fixed="left" prop="id" label="编号"></el-table-column>
            <el-table-column fixed="left" prop="name" label="产品名称"></el-table-column>
           <el-table-column prop="price" label="价格"></el-table-column>


           <el-table-column prop="decripation" label="描述">
            
           </el-table-column>


           <el-table-column width=120px prop="categoryId" label="所属产品"></el-table-column>
        <el-table-column label="操作">
        <template v-slot="slot">
          <i class="el-icon-delete"  @click.prevent="toDeleteHandler(slot.row.id)"></i>
      <i class="el-icon-edit-outline" @click.prevent="toUpdateHandler(slot.row)" ></i>
      <a href=""  @click.prevent="topen" >详情</a>
        </template>
        </el-table-column>
    
       </el-table>  
        <!--分页符-->
 
              <!--模态框-->
        <el-dialog
            title="录入产品信息"
            :visible.sync="visible"
            width="60%"> 
            ---{{form}}

            <el-form :model="form" label-width="80px">
                <el-form-item label="产品名称">
                   <el-input v-model="form.name"/>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input  v-model="form.price"/>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.description"/>
                </el-form-item>
                <el-form-item label="所属产品">
                     <el-input v-model="form.categoryId"/>
                </el-form-item>       
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

        topen() {
        this.$alert('没有更多了', '告知', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
        loadData(){
      let url = "http://localhost:6677/product/findAll"
      request.get(url).then((response)=>{
        // 将查询结果设置到customers中，this指向外部函数的this
        this.products = response.data;
      })
    },
    submitHandler(){
      //this.form 对象 ---字符串--> 后台 {type:'customer',age:12}
      // json字符串 '{"type":"customer","age":12}'
      // request.post(url,this.form)
      // 查询字符串 type=customer&age=12
      // 通过request与后台进行交互，并且要携带参数
      let url = "http://localhost:6677/product/saveOrUpdate";
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
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        let url ="http://localhost:6677/product/deleteById?id="+id;
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
      this.form=row;
      this.visible =true;
    },
    closeModalHandler(){
      this.visible = false;
    },
    toAddHandler(){
      this.form = {
        type:"product"
      }
      this.visible = true;
    }
  },
  // 用于存放要向网页中显示的数据
  data(){
    return {
      visible:false,
      products:[],
      form:{
        type:"product"
      }
    }
  },
  created(){
    // this为当前vue实例对象
    // vue实例创建完毕 
    this.loadData()

  }
}
</script>

<style scoped>
 
</style>