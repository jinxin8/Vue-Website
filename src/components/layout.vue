<template>
  <div class="aa" @click="resetComponent">
  <div class="bb">
    <div class="app-head">
      <div class="app-head-inner">
        <router-link :to="{path:'/layout'}">
          <img src="../assets/9a.jpg">
        </router-link>
        <div class="head-nav">
          <ul class="nav-list">
              <li>{{ username }}</li>
              <li v-if="username!== ''" class="nav-pile">|</li>
              <li v-if="username!== ''" @click="quit">退出</li>
              <li v-if="username=== ''" @click="logClick">登录</li>
              <li class="nav-pile">|</li>
              <li v-if="username=== ''" @click="regClick">注册</li>
              <li v-if="username=== ''" class="nav-pile">|</li>
              <li @click="aboutClick">关于</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
    <!-- keep-alive页面缓存，包裹动态组件，缓存不活动的组件实例 -->
      <keep-alive>
        <router-view></router-view>
        <!-- <index></index> -->
      </keep-alive>
    </div>
    <div class="app-foot">
      <p>@2018 devoted 白敬亭</p>
    </div>
    </div>
    <!-- 监听closeDialog方法,当触发on-close事件时把isShowDialog的值变成false，关闭dialog页面-->
    <my-dialog :is-show="isShowAboutDialog" @on-close="closeDialog('isShowAboutDialog')">
      <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp白敬亭，1993年10月15日出生于北京市怀柔区，中国内地男演员，毕业于首都师范大学音乐学院。<br/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp2014年，因参演搜狐自制网剧《匆匆那年》，饰演男二号“乔燃”一角受到关注。2015年7月，参演明晓溪同名小说改编的电视剧《旋风少女》，在剧中饰演喻初原；2015年10月，参与的自然旅游纪实真人秀《跟着贝尔去冒险》播出。2016年参与明星推理综艺秀《明星大侦探》播出；4月22日，主演的青春电影《谁的青春不迷茫》上映；7月15日，加盟江苏卫视真人秀《我们战斗吧》。2017年年初，参与《明星大侦探第二季》录制；同年1月，参与的真人秀《触不到的TA》播出；4月22日，出任第七届中国大学生电视节清纯代言人；6月11日主演电视剧《夏至未至》在湖南卫视开播，饰演陆之昂；9月起，参与《明星大侦探第三季》录制。2018年2月2日，参加的《二十四小时第三季》在浙江卫视播出。</p>
    </my-dialog>
    <my-dialog :is-show="isShowLogDialog" @on-close="closeDialog('isShowLogDialog')">
      <log-form @has-log="onSuccessLog" @jian-event="getJianEvent"></log-form>
      <p class="deng">{{errtext}}</p>
    </my-dialog>
    <my-dialog :is-show="isShowRegDialog" @on-close="closeDialog('isShowRegDialog')">
      <reg-form></reg-form>
    </my-dialog>
  </div>
</template>

<script>
import Dialog from './dialog'
import LogForm from './logform'
import RegForm from './regform'
import { eventBus } from '../eventBus'
export default {
  components:{
    MyDialog:Dialog,
    LogForm,
    RegForm
  },
  data () {
    return {
      isShowAboutDialog:false,
      isShowLogDialog:false,
      isShowRegDialog:false,
      username:'',
      errtext:'',
      getStr:'',
      getPass:''
    }
  },
  methods:{
    aboutClick(){
      this.isShowAboutDialog=true
    },
     logClick(){
      this.isShowLogDialog=true
    },
     regClick(){
      this.isShowRegDialog=true
    },
    closeDialog(arr){
      this[arr]=false
    },
    onSuccessLog (data,errorText) {
      for(var i=0;i<data.data.length;i++){
        if(this.getStr!==data.data[i].username){
          this.errtext="用户名错误"
        }else if(this.getPass===data.data[i].userId){
            this.errtext=''
            // 登陆后关掉登陆界面
            this.closeDialog('isShowLogDialog')
            this.username = data.data[i].username
            break
          }else{
          this.errtext="密码错误"
          break
          }
      }  
    },
    // 退出登录把username置为空
    quit(){
      this.username=''
    },
    getJianEvent(getStr,getPass){
      return this.getStr=getStr,this.getPass=getPass
    },
    resetComponent(){
      eventBus.$emit('reset-component')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
body {
  background: #f0f2f5;
  font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  font-size: 14px;
  color: #444;
}
.jin{
  display:none;
}
.deng{
  color:red;
  font-size:18px;
  margin-left:38%;
}
.aa{
  background-image:url(../assets/b4.jpg);
  background-size:100% 100%;
}
.bb{
  opacity:0.8;
}
.app-head {
  background: #fde;
  color: #b2b2b2;
  height: 90px;
  line-height: 90px;
  width: 100%;
}
.app-head-inner {
  width: 100%;
  margin: 0 auto;
}
.head-logo {
  float: left;
}
.app-head-inner img {
  width: 70px;
  height:48px;
  margin-top: 20px;
  margin-left:20px;
  box-shadow:0 0 4px #000;
}
/*.app-head-inner span{
  height:90px;
  margin-left:35%;
}*/
.head-nav {
  float: right;
}
.head-nav ul {
  overflow: hidden;
  margin-right:20px;
}
.head-nav li {
  cursor: pointer;
  float: left;
}
.nav-pile {
  padding: 0 10px;
}
.app-foot {
  text-align: center;
  height: 80px;
  width: 100%;
  color:#999;
  line-height: 80px;
  background: #fde;
  /*both在左右两侧均不允许浮动二代元素*/
  clear: both;
  margin-top: 30px;
}
.container {
  width: 100%;
  margin: 0 auto;
}
.button {
  background: #f99;
  color: #fff;
  display: inline-block;
  margin-left:50px;
  padding: 10px 30px;
  cursor: pointer;
}
.button:hover {
  background: #f66;
}
.g-form {
  margin-left:10%;
}
.g-form-line {
  padding: 15px 0;
}
.g-form-label {
  width: 100px;
  font-size: 16px;
  /*行内块元素*/
  display: inline-block;
  /*text-shadow:-2px -2px 2px #666;*/
}
.g-form-input {
  display: inline-block;
}
.g-form-input input {
  height: 30px;
  width: 200px;
  line-height: 30px;
  /*垂直对齐middle把此元素放置在父元素的中部*/
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius:5px;
  box-shadow:1px 1px 2px #111;
}
.g-form-btn {
  padding-left: 100px;
}
.g-form-error {
  color: red;
  margin-left: 15px;
}
</style>
