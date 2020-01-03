<template>
<div class="four">
  <div class="sales-board">
    <div class="sales-board-intro">
      <h2>二十四小时</h2>
      <p>《二十四小时第三季》是浙江卫视推出的原创连续剧悬念式户外真人秀，由浙江卫视战略发展中心与盛唐时空联手制作，节目共12期，由林志颖、余文乐、白敬亭、林允、魏大勋、胡一天、熊梓淇组成“时空商队”。七位MC化作“时空商队”，前往世界各地寻找散落的“中国印记”，林志颖、余文乐分别作为队长，带领队员以分组对抗形式展开24小时限时比拼，开启全新“海上丝绸之路”大冒险。节目于2018年2月2日起每周五晚22:00接档《梦想的声音第二季》在浙江卫视首播，与《王牌对王牌第三季》叠播，于2018年4月14日收官</p>
    </div>
    <div class="sales-board-form">
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          查看集数：
        </div>
        <div class="sales-board-line-right">
          <v-counter @on-change="onParamChange('buyNum', $event)"></v-counter>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          节目类型：
        </div>
        <div class="sales-board-line-right">
          <v-selection :selections="productTypes" @on-change="onParamChange('buyType', $event)"></v-selection>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          节目时长：
        </div>
        <div class="sales-board-line-right">
          <v-chooser
          :selections="periodList"
          @on-change="onParamChange('period', $event)"
          ></v-chooser>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          节目版本
        </div>
        <div class="sales-board-line-right">
            <v-mul-chooser
            :selections="versionList"
            @on-change="onParamChange('versions', $event)"
            ></v-mul-chooser>
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          节目期数：
        </div>
        <div class="sales-board-line-right">
            {{ price }} 
        </div>
      </div>
      <div class="sales-board-line">
          <div class="sales-board-line-left">&nbsp;</div>
          <div class="sales-board-line-right">
              <div class="button" @click="showPayDialog">
                立即观看
              </div>
          </div>
      </div>
    </div>
  </div>
   <my-dialog :is-show="isShowPayDialog" @on-close="hidePayDialog">
    <table class="buy-dialog-table">
      <tr>
        <th>查看集数</th>
        <th>节目类型</th>
        <th>节目时长</th>
        <th>节目版本</th>
        <!-- <th>节目信息</th> -->
      </tr>
      <tr>
        <td>{{ buyNum }}</td>
        <td>{{ buyType.label }}</td>
        <td>{{ period.label }}</td>
        <td>
          <span v-for="item in versions">{{ item.label }}</span>
        </td>
        <!-- <td>{{ price }}</td> -->
      </tr>
    </table>
    <h3 class="buy-dialog-title">请选择播放器</h3>
    <bank-chooser @on-change="onChangeBanks"></bank-chooser><br/>
    <div class="button buy-dialog-btn"  @click="confirmBuy">
      确认观看
    </div>
  </my-dialog>
  <my-dialog :is-show="isShowErrDialog" @on-close="hideErrDialog">
    支付失败！
  </my-dialog>
  <check-order :is-show-check-dialog="isShowCheckOrder" :order-id="orderId" @on-close-check-dialog="hideCheckOrder">
  </check-order>
</div>
</template>

<script>
import VSelection from '../../components/base/selection'
import VChooser from '../../components/base/chooser'
import VMulChooser from '../../components/base/multiplyChooser'
import VCounter from '../../components/base/counter'
import Dialog from '../../components/dialog'
import BankChooser from '../../components/bankChooser'
import CheckOrder from '../../components/checkOrder'
import _ from 'lodash'
export default {
  components:{
    VSelection,
    VChooser,
    VMulChooser,
    VCounter,
    MyDialog:Dialog,
    BankChooser,
    CheckOrder
  },
  data () {
    return { 
      isShowPayDialog:false,
      isShowCheckOrder: false,
      isShowErrDialog: false,
      bankId: null,
      orderId: null,
    //要通过获取四个组件上的值进行总的计算
      // 集数
      buyNum:[],
      // 类型
      buyType:{},
      // 时长
      period:{},
      // 版本
      versions:[], 
      price:null,
      productTypes:[
        {
          label:'标清',
          value:0
        },
        {
          label:'高清',
          value:1
        },
        {
          label:'超清',
          value:2
        }
      ],
      versionList:[
        {
          label:'第三季',
          value:2
        }
      ],
      periodList:[
        {
          label:'90',
          value:0
        }
      ]
    }
  },
  methods: {
    onParamChange(attr,val){
      this[attr]=val
      // 当每次属性发生更改的时候都会去调用一次请求
      this.getPrice()
      console.log(attr,this[attr])
    },
    getPrice(){
      let buyVersionsArray=_.map(this.versions,(item)=>{
        return item.label
      })
      let reqrarams={
        buyNum:this.buyNum,
        buyType:this.buyType.label,
        period:this.period.label,
        versions:buyVersionsArray.join(',')
      }
      if(reqrarams.buyNum!==null){
          this.price=reqrarams.buyNum+" "
        }
      if(reqrarams.buyType!==undefined){
        console.log(reqrarams.buyType)
        this.price+=reqrarams.buyType+" "
      }
      if(reqrarams.period!==undefined){
        this.price+=reqrarams.period+" "
      }
      if(reqrarams.versions!==undefined){
        this.price+=reqrarams.versions+" "
      }
    },
    showPayDialog(){
      this.isShowPayDialog=true
    },
    hidePayDialog () {
      this.isShowPayDialog = false
    },
    hideErrDialog () {
      this.isShowErrDialog = false
    },
    hideCheckOrder () {
      this.isShowCheckOrder = false
    },
    onChangeBanks (bankObj) {
      this.bankId = bankObj.id
    },
    confirmBuy () {
      let buyVersionsArray = _.map(this.versions, (item) => {
        return item.value
      })
      let reqParams = {
        buyNumber: this.buyNum,
        buyType: this.buyType.value,
        period: this.period.value,
        version: buyVersionsArray.join(','),
        bankId: this.bankId
      }
      this.$http.post('/api/createOrder', reqParams)
      .then((res) => {
        this.orderId = res.data.orderId
        this.isShowCheckOrder = true
        this.isShowPayDialog = false
      }, (err) => {
        this.isShowBuyDialog = false
        this.isShowErrDialog = true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.four{
	background-image:url(../../assets/images/2.jpg);
	background-size:100% 100%;
}
.buy-dialog-title {
  font-size: 16px;
  font-weight: bold;
}
.buy-dialog-btn {
  margin-top: 20px;
  margin-left:36%;
}
.buy-dialog-table {
  width: 100%;
  margin-top: 15px;
  margin-bottom: 20px;
}
.buy-dialog-table h3{
  margin-top:10px;
}
.buy-dialog-table td,
.buy-dialog-table th{
  border: 1px solid #fff;
  text-align: center;
  padding: 5px 0;
}
.buy-dialog-table th {
  background: rgb(0, 0, 0,.5);
  color: #fff;
  border: 1px solid #fff;
}
</style>
