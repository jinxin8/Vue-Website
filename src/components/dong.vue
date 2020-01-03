<template>
  <div>
    <div class="ru" v-on:mouseover="show=!show" >
      <transition name="trans" mode="out-in">
      <!-- 当使用v-if和v-else时当标签相同时要用key来区分相同的标签进行过渡动画效果。如果使用的标签相同但没用key进行区分时，是不显示过渡动画效果的 -->
      <img v-if='show' key="1" class="dong" src="../assets/timgb.jpg">
      <img v-else key="2" class="dong" src="../assets/timgb.jpg">
      </transition>
    </div>
  </div>
</template>

<script >
export default {
    data () {
    return {
      msg: '我是小白',
      price:5,
      show:true
    }
  },
  methods:{
    bain(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.ru{
  position:absolute;
  width:330px;
  top:80px;
  left:37%;
  opacity:0.7;
  /*overflow:hidden;*/
}
img{
  width:100%;
}
.trans-enter-active,.trans-leave-active{
  -webkit-transition: all 4s ease-out;
     -moz-transition: all 4s ease-out;
      -ms-transition: all 4s ease-out;
       -o-transition: all 4s ease-out;
          transition: all 4s ease-out;
}
.trans-enter{
-webkit-transform: translateY(-20px);
   -moz-transform: translateY(-20px);
    -ms-transform: translateY(-20px);
     -o-transform: translateY(-20px);
        transform: translateY(-20px);
  opacity:1;
}
.trans-leave-active{
-webkit-transform: translateY(20px);
   -moz-transform: translateY(20px);
    -ms-transform: translateY(20px);
     -o-transform: translateY(20px);
        transform: translateY(20px);
  opacity:1;
}
</style>
