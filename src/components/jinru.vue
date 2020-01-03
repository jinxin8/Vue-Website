<template>
  <div as>
    <router-view></router-view>
    <div class="jin">
      <router-link :to="{path:'/layout'}">
        <dong></dong>
      </router-link>
    </div>
  </div>
</template>

<script>
import Dong from './dong'
export default {
  components:{
    Dong
  },
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
<style>
body {
  margin: 0;
  padding: 0;
}
.as{
  margin:0;
  padding:0;
  overflow:hidden;
}
.jin{
  position:relative;
  height:659px;
  background-image:url(../assets/b4.jpg);
  background-size:100% 100%;
  overflow:hidden;
}
</style>
