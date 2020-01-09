<template>
    <div>
        <!-- 按钮 -->
       <el-button type="primary" size="small" @click="toAddHandler">添加</el-button>
       <el-button type="danger" size="small">批量删除</el-button>
       <!-- /按钮 -->
       <!-- /表格 -->
       <el-table :data="categorys.list">
           <el-table-column fixed="left" prop="id" label="编号"></el-table-column>
            <el-table-column fixed="left" prop="name" label="产品名称"></el-table-column>
           <el-table-column prop="num" label="价格"></el-table-column>
            
          
          <el-table-column  label="描述" prop = "icon">
        <template slot-scope="scope" prop = "icon">
          <img :src="scope.row.icon" width="200" height="200">
        </template>
      </el-table-column>
           <el-table-column fixed="right" label="操作">
                <template v-slot="slot">
           <i class="el-icon-delete"  @click.prevent="toDeleteHandler(slot.row.id)"></i>
      <i class="el-icon-edit-outline" @click.prevent="toUpdateHandler(slot.row)" ></i>

              </template>
           </el-table-column>
       </el-table>  
        <!--表格结束-->
        <!-- 分页开始 -->
       <el-pagination 
        layout="prev, pager, next" 
        :total="categorys.total" 
        @current-change="pageChageHandler">
        </el-pagination>
        <!--/分页符-->
              <!--模态框-->
              <!-- <el-dialog
            title="录入信息"
            :open="open"
            width="60%">
          
          <div>
        <p> <strong>订单编号：</strong> {{form.id}} </p>
          </div>
     
              </el-dialog> -->
        <el-dialog
            title="录入信息"
            :visible.sync="visible"
            width="60%">
            {{form}}
              <el-form :model="form" label-width="80px">
        <el-form-item label="产品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
        
    <el-form-item label="描述">
      <el-upload
        class="upload-demo"
        action="http://134.175.154.93:6677/file/upload"
        :file-list="fileList"
        list-type="picture"
        :on-success="uploadSuccessHandler">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    
      </el-upload>

</el-form-item>
      </el-form>

      

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModalHandler">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </span>
    </el-dialog>
    <!-- /模态框 -->

  </div>
</template>

<script>
import request from '@/utils/request'
import querystring from 'querystring'
export default {
  // 用于存放网页中需要调用的方法
  //更新
  methods:{

     uploadSuccessHandler(response){

      let icon = "http://134.175.154.93:8888/"+response.data.groupname+"/"+response.data.id;

        console.log(response);

      this.form.icon = icon;


    },
    pageChageHandler(page){
        // 将params中当前页改为插件中的当前页
        this.params.page = page-1;
        // 加载
        this.loadData();
    },
    //加载栏目信息
    loadCategory(){
      
      let url = "http://localhost:6677/category/findAll"
      request.get(url).then((response)=>{
        // 将查询结果设置到categorys中，this指向外部函数的this
        this.categorys = response.data;
      })
    },
    loadData(){
      this.fileList = []
      let url = "http://localhost:6677/category/query"
      request({
          url,
          method:"post",
          headers:{
              "Content-Type":"application/x-www-form-urlencoded"
          },
          data:querystring.stringify(this.params)
      }).then((response)=>{
          // orders为一个对象，其中包含了分页信息，以及列表信息
          this.categorys = response.data;
      })
    },
    // uploadSuccessHandler(response){
    //   console.log(response)
    // },
    submitHandler(){
      //this.form 对象 ---字符串--> 后台 {type:'category',age:12}
      // json字符串 '{"type":"category","age":12}'
      // request.post(url,this.form)
      // 查询字符串 type=category&age=12
      // 通过request与后台进行交互，并且要携带参数
      this.fileList=[]
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
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用后台接口，完成删除操作
        let url = "http://localhost:6677/category/deleteById?id="+id;
        request.get(url).then((response)=>{
          //1. 刷新数据
          this.loadData();
          //2. 提示结果
          this.$message({
            type: 'success',
            message: response.message
          });
        })
        
        
      })
      
    },
    toUpdateHandler(row){
     
      // 模态框表单中显示出当前行的信息
      this.form = row;
      this.visible = true;
    },
    closeModalHandler(){
      this.visible = false;
    },
    toAddHandler(){
      // 将form变为初始值
      this.form = {}
      this.visible = true;
    }
  },
  // 用于存放要向网页中显示的数据
  data(){
    
    return {
      visible:false,
      fileList:[],
      categorys:[],
      options:[],
      form:{
         type : "category"
      },
      params:{
          page:0,
          pageSize:10
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