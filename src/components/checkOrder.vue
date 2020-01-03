<template>
  <div>
    <this-dialog :is-show="isShowCheckDialog" @on-close="checkStatus">
      <p class="p2">请检查你的网络状态！</p>
      <div class="button" @click="checkStatus">
        网络良好
      </div>
      <div class="button" @click="checkStatus">
        网络不佳
      </div>
    </this-dialog>
    <this-dialog :is-show="isShowSuccessDialog" @on-close="toOrderList">
      <p class="p1">观看成功！</p>
    </this-dialog>
    <this-dialog :is-show="isShowFailDialog" @on-close="toOrderList">
      <p class="p1">观看失败！</p>
    </this-dialog>
  </div>
</template>

<script>
import Dialog from './dialog'
export default {
  components:{
    thisDialog:Dialog
  },
  props:{
    // 父级传出来的参数不能再子组件中修改，只能在父组件中修改
    isShowCheckDialog: {
      type: Boolean,
      default: false
    },
    orderId:{
    type:[String,Number]
    } 
  },
  data () {
    return {
      isShowSuccessDialog: false,
      isShowFailDialog: false
    }
  },
  methods:{
    checkStatus(){
      this.$http.post('/api/checkOrder', {
        orderId: this.orderId
      })
      .then((res) => {
        this.isShowSuccessDialog = true
        this.$emit('on-close-check-dialog')
      }, (err) => {
        this.isShowFailDialog = true
        this.$emit('on-close-check-dialog')
      })
    },
    toOrderList () {
      // 组件内部跳转通用方法
      this.$router.push({path: '/layout/orderList'})
      this.isShowSuccessDialog=false
      this.isShowFailDialog=false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin:5px 5px;
}
.p2{
  font-size:15px;
  display:inline;
  text-shadow:1px 1px 3px #444;
}
.button{
  padding-left:3%;
  padding-right:7%;
}
.p1{
  font-size:20px;
  text-align:center;
  text-shadow:1px 1px 3px #f44;
}
</style>
