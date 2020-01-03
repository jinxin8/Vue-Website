<template>
<!-- 左右是浮动布局 -->
  <div class="detail-wrap">
    <div class="detail-left">
      <div class="product-board">
        <img :src="productIcon" >
        <ul> 
          <!-- <li v-for="item in products">{{item.name}}</li> -->
          <!-- 默认的话router-link会自动生成一个a标签，用tag属性指定生成的是li标签,,,当页面定位到当前位置的时候(当跳转的子路由时aaa的时候，aaa的li标签就会被添加一个active的classname，并渲染active的样式)，激活的一个class -->
          <router-link v-for="(items,index) in products" :to="{path:items.path}" tag="li" active-class="active" :key="index">
            {{items.name}}
          </router-link>
        </ul>
      </div>
    </div>
    <div class="detail-right">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products:[
        {
          name:'明星大侦探',
          path:'mingxing',
          active:false
        },
         {
          name:'二十四小时',
          path:'ershisi',
          active:false
        },
         {
          name:'谁的青春不迷茫',
          path:'shuide',
          active:false
        },
         {
          name:'匆匆那年',
          path:'congcong',
          active:false
        }
      ],
      imgMap:{
        '/layout/detail/mingxing':require('../assets/images/1.jpg'),
        '/layout/detail/ershisi':require('../assets/images/2.jpg'),
        '/layout/detail/shuide':require('../assets/images/3.jpg'),
        '/layout/detail/congcong':require('../assets/images/4.jpg')
      }
    }
  },
  computed:{
    productIcon(){
      return this.imgMap[this.$route.path]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.detail-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 20px;
}
.detail-left {
  float: left;
  width: 200px;
  box-shadow:0 0 4px #fff;
  text-align: center;
}
.detail-right {
  float: left;
  box-shadow:0 0 4px #fff;
  width: 980px;
  margin-left: 20px;
}
.product-board {
  background: rgb(10,10,10,.7);
  padding: 20px 0;
  height:100%;
}
.product-board img{
  width:80%;
  height:100%;
  box-shadow:0 0 4px #fff;
}
.product-board ul {
  margin-top: 20px;
}
.product-board li {
  text-align: left;
  padding: 10px 15px;
  color:#fff;
  text-shadow: 0 0 1px #fff;
  cursor: pointer;
}
.product-board li.active,
.product-board li:hover {
  background: #fbb;
  color: #66f;
}
.product-board li a {
  display: block;
}
.sales-board {
  background:rgb(10,10,10,.7);
}
.sales-board-intro h2 {
  font-size: 20px;
  padding: 20px;
  color:#fff;
}
.sales-board-intro p {
/*  background:#fff;*/
  padding: 10px 20px;
  color: #ccc;
  line-height: 1.8;
}
.sales-board-form {
  padding: 30px 20px;
  font-size: 14px;
}
.sales-board-line {
  clear: both;
  padding-bottom: 20px;
}
.sales-board-line-left {
    display: inline-block;
    width: 100px;
    color:#ccc;
}
.sales-board-line-right {
    display: inline-block;
    width: 75%;   
    color:#fff;
}
/*.sales-board-table {
  width: 100%;
  margin-top: 20px;
}*/
/*.sales-board-table th {
  background: #4fc08d;
  color: #fff;
}*/
/*.sales-board-table td {
    border: 1px solid #f0f2f5;
    padding: 15px;
}*/
</style>
