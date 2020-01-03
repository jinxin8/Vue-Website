<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <!-- v-model表单的双向绑定    placeholder 属性提供可描述输入字段预期值的提示信息（hint） 在文本框中-->
          <input type="text" v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <!-- vue里有自动提供的验证插件vue-validator,,,这里用自己手动进行验证 -->
        <!-- 验证通过v-model的改变进行验证 ，用计算属性computed-->
        <span class="g-form-error">{{userErrors.errorText}}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密&nbsp&nbsp&nbsp码：</span>
        <div class="g-form-input">
          <input type="text" v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{passwordErrors.errorText}}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin();jian()">登录</a>
        </div>
      </div>
      <p>{{errorText}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usernameModel:'',
      passwordModel:'',
      errorText:'',
      getStr: null,
      getPass:null
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
    onLogin(){
      if(!this.userErrors.status || !this.passwordErrors.status){
        this.errorText='用户名或者密码未通过！！！'
      }else{
        this.errorText=''
        this.$http.get('/api/login')
        .then((res)=>{
          this.$emit('has-log',res.data)
        },(error)=>{
          console.log(error);
        })
      }
    },
    jian(){
      this.getStr = this.usernameModel.toLowerCase();
      this.getPass=parseInt(this.passwordModel);
      this.$emit('jian-event',this.getStr,this.getPass)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
