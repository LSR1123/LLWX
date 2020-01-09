<template>
  <div>
    <P>订单时间：{{this.$route.query.orderTime}}</P>
    <P>订单总数：{{this.$route.query.total}}</P>
   <P> 订单状态：{{this.$route.query.status}}</P>
    <P>顾客ID：{{this.$route.query.customerId}}</P>
    <P>雇员ID：{{this.$route.query.waiterId}}</P>
    <P>地址ID：{{this.$route.query.addressId}}</P>

  </div>
</template>

<script>
export default {
  created(){
    console.log(this.$route.query)
  }
}
</script>