<template>
  <div>
  <!-- v-if为真时才会被渲染，v-if为真时执行if语句，为假时执行else语句 -->
    <div class="dialog-wrap">
      <div class="dialog-cover" v-if="isShow" @click="closeMyself"> </div>
      <transition name='drop'>
      <div class="dialog-content" v-if="isShow">
        <p class="dialog-close" @click="closeMyself">x</p>
        <slot>empty</slot>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  // 父组件向子组件传递信息用prop，子组件向父组件传递信息用事件
  props:{
    // 声明isShow属性
    isShow:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    closeMyself(){
      this.$emit('on-close')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.drop-enter-active{
  -webkit-transition: all .5s ease;
     -moz-transition: all .5s ease;
      -ms-transition: all .5s ease;
       -o-transition: all .5s ease;
          transition: all .5s ease;
}
.drop-leave-active{
  -webkit-transition: all .3s ease;
     -moz-transition: all .3s ease;
      -ms-transition: all .3s ease;
       -o-transition: all .3s ease;
          transition: all .3s ease;
}
.drop-enter{
  -webkit-transform: scale(0.1);
     -moz-transform: scale(0.1);
      -ms-transform: scale(0.1);
       -o-transform: scale(0.1);
          transform: rotate(180deg) scale(0.1);
}
.drop-leave-active{
  -webkit-transform: scale(0.1);
     -moz-transform: scale(0.1);
      -ms-transform: scale(0.1);
       -o-transform: scale(0.1);
          transform: rotate(180deg) scale(0.1);
}
.dialog-wrap{
  /*position:fixed;绝对定位，相对于游览器窗口进行定位
  position:absolute;绝对定位，相对于第一个父元素进行定位*/
  position:fixed;
  width:100%;
  height:100%;
}
.dialog-cover {
  background: #000;
  opacity: .5;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.dialog-content {
  width: 40%;
  position: fixed;
  max-height: 50%;
  overflow: auto;
  /*background:#fdd;*/
  background-image:url(../assets/t010d0b911ecbeb7b8b.jpg);
  background-size:100% 100%;
  top: 20%;
  left: 50%;
  margin-left: -25%;
  z-index: 10;
  border: 2px solid #464068;
  box-shadow:4px 4px 6px #333;
  padding: 2%;
  line-height: 1.6;
}
.dialog-close {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
.dialog-close:hover {
  color: #0ff;
}
</style>
