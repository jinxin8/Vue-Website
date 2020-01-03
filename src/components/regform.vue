<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" v-model="usernameModel" placeholder="请输入注册用户名">
        </div>
          <span class="g-form-error">{{userErrors.errorText}}</span>  
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密&nbsp&nbsp&nbsp码：</span>
        <div class="g-form-input">
          <input type="text" v-model="passwordModel" placeholder="请输入注册密码">
        </div>
          <span class="g-form-error">{{passwordErrors.errorText}}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="myopen">注册</a>
        </div>
      </div>
    </div>
    <my-dialog :is-show="isShow" @on-close="myopen">注册成功！</my-dialog>
  </div>
</template>

<script>
import MyDialog from './dialog'
export default {
  components:{
    MyDialog
  },
  // 父组件向子组件传递信息用prop，子组件向父组件传递信息用事件
  // props:{
  //   // 声明isShow属性
  //   isShow:{
  //     type:Boolean,
  //     default:false
  //   }
  // },
  data () {
    return {
      usernameModel:'',
      passwordModel:'',
      errorText:'',
      isShow:false
    }
  },  
  computed:{
    userErrors(){
      let errorText,status
      // 进行正则匹配判断，当不匹配时返回错误信息，匹配时不返回
      if(/@/g.test(this.usernameModel)){
        status=false
        errorText='不能包含@'
      }else{
        status=true
        errorText=''
      }
      // 判断是否是第一次进入，进入之后userFlag设为true之后就进不去if循环,userFlag没有在页面渲染所以不用在data中声明
      if(!this.userFlag){
        errorText=''
        this.userFlag=true
      }
      return{
        status,
        errorText
      }
    },
    passwordErrors(){
      let errorText,status
      // 正则表达式^$开头和结尾,\w={A-Z,a-z,0-9},{1,6},位数是1到6位
      if(!/^\w{1,6}$/g.test(this.passwordModel)){
        status=false
        errorText='密码不是1-6位'
      }else{
        status=true
        errorText=''
      }
      if(!this.passFlag){
        errorText=''
        this.passFlag=true
      }
      return {
        status,
        errorText
      }
    }
  },
  methods:{
    closeMyself(){
      this.$emit('on-close')
    },
    myopen(){
      this.isShow=!this.isShow
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
