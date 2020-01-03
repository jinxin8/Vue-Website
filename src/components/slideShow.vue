<!-- 父组件向子组件传递信息用props，子组件向父组件传递信息用事件(onchange) -->
<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].src" alt="">
        </transition>
      </a>
    </div>
   <div class="slide-ti"> 
    <h2>{{slides[nowIndex].title}}</h2>
   </div>
    <ul class="slide-pages">
        <li @click="goto(prevIndex)">&lt;</li>
        <li v-for="(item,index) in slides" @click="goto(index)">
          <a :class="{on:index===nowIndex}">{{index+1}}</a>
        </li>
        <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    slides:{
      type:Array,
      default:[]
    },
    inv:{
      type:Number,
      default:2000
    }
  },
  data () {
    return {
     nowIndex:0,
     isShow:true
    }
  },
  // 计算属性,computed里的属性关联到data里现有的属性，会根据data里的属性变化就行更改
  computed:{
    prevIndex(){
      if(this.nowIndex===0){
        return this.slides.length-1
      }else{
        return this.nowIndex-1
      }
    },
    nextIndex(){
      if(this.nowIndex===this.slides.length-1){
        return 0
      }else{
        return this.nowIndex+1
      }
    }
  },
  methods:{
    goto (index){
      this.isShow=false
      setTimeout(()=>{
        this.isShow=true
        this.nowIndex=index
        // 监听幻灯片的切换，每换一张图片都要触发一次事件
        this.$emit('onchange',index)
      },10)
    },
    // 幻灯片切换
    runInv(){
      this.invId=setInterval(()=>{
        this.goto(this.nextIndex)
      },this.inv)
    },
    // 清空轮播
    clearInv(){
      clearInterval(this.invId)
    }
  },
  mounted(){
    this.runInv()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.slide-trans-enter-active{
  -webkit-transition: all .5s;
     -moz-transition: all .5s;
      -ms-transition: all .5s;
       -o-transition: all .5s;
          transition: all .5s;
}
.slide-trans-enter{
  -webkit-transform: translateX(100%);
     -moz-transform: translateX(100%);
      -ms-transform: translateX(100%);
       -o-transform: translateX(100%);
          transform: translateX(100%);
}
.slide-trans-old-leave-active{
  -webkit-transition: all .5s;
     -moz-transition: all .5s;
      -ms-transition: all .5s;
       -o-transition: all .5s;
          transition: all .5s;
  -webkit-transform: translateX(-100%);
     -moz-transform: translateX(-100%);
      -ms-transform: translateX(-100%);
       -o-transform: translateX(-100%);
          transform: translateX(-100%);
}
.slide-show{
  position:relative;
  margin:15px 15px 15px 0;
  box-shadow:0 0 4px #fff;
  width:92.5%;
  height:345px;
  overflow:hidden;
}
.slide-ti{
  position:absolute;
  width:100%;
  height:100%;
  color:#f66;
  background:#000;
  opacity:.5;
  bottom:0;
  height:40px;
  text-align:left;
  padding-left:15px;
}
.slide-show h2{
  position:absolute;
  top:13px;
}
.slide-img{
  width:100%;
}
.slide-img img{
  position:absolute;
  top: 0;
  width: 100%;
  height:100%;
}
.slide-pages{
  position:absolute;
  bottom:13px;
  right:15px;
}
.slide-pages li {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  color: #f66;
}
.slide-pages li .on {
  /*text-decoration: underline;*/
  border-bottom:1px solid #ff0;
}
</style>
