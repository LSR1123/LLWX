<template>
  <div>
    {{params}}
    <!-- 选项卡 -->

    <!-- /选项卡 -->
    <!-- 表格 -->
    <el-table :data="orders.list">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column width="200" prop="orderTime" label="下单时间"></el-table-column>
      <el-table-column prop="total" label="总价"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="customerId" label="顾客ID"></el-table-column>
      <el-table-column prop="waiterId" label="员工ID"></el-table-column>
      <el-table-column prop="addressId" label="地址ID"></el-table-column>
  

    </el-table>
    <!-- /表格结束 -->
    <!-- 分页开始 -->
    <el-pagination 
        :hide-on-single-page="true"
        layout="prev, pager, next" 
        :total="orders.total" 
        @current-change="pageChageHandler">
        </el-pagination>
    <!-- /分页结束 -->
    <!-- 模态框 -->
    

  </div>
</template>

<script>
import request from '@/utils/request'
import querystring from 'querystring'
export default {
  // 用于存放网页中需要调用的方法
  methods:{
    // 加载员工信息
    loadEmployees(){
      let url = "http://localhost:6677/waiter/findAll";
      request.get(url).then(response=>{
        this.employees = response.data;
      })
    },
    // 加载订单信息
    loadData(){
      let url = "http://localhost:6677/order/findById?id="+id
      request({
          url,
          method:"get",
          headers:{
              "Content-Type":"application/x-www-form-urlencoded"
          },
          data:querystring.stringify(this.form)
      }).then((response)=>{
          // orders为一个对象，其中包含了分页信息，以及列表信息
          this.orders = response.data;
      })
    },
    
    // 去派单，将模态框打开，然后选择员工作为派单对象
  },
  // 用于存放要向网页中显示的数据
  data(){
    return {
      visible:false,
      orders:{},
      form:{},  // 当前订单
      employees:[],
      waiterId:null // 选中的员工
    }
  },
  created(){
    // this为当前vue实例对象
    // vue实例创建完毕 
    this.loadData();
    // 加载员工信息
    this.loadEmployees();
  }
}
</script>

<style scoped>
 
</style>