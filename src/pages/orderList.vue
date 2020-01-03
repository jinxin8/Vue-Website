<template>
  <div class="order-wrap">
    <h3>您的影片</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择影片：
        <v-selection :selections="products" @on-change="productChange"></v-selection>
      </div>

      <div class="order-list-option">
        开始日期：
        <v-date-picker @on-change="getStartDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        结束日期：
        <v-date-picker @on-change="getEndDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        关键词：
        <!-- v-model.lazy，lazy是当输入完成时开始加载，鼠标离开输入框时 -->
        <input type="text" v-model.lazy="query" class="order-query">
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="head in tableHeads" @click="changeOrderType(head)" :class="{active:head.active}">{{ head.label }}</th>
        </tr>
    <!--       <th v-for="head in tableHeads" @click="changeOrderType(head)" :class="{active:head.active}">{{ head.label }}</th>
        </tr> -->
        <tr v-for="item in tableData" :key="item.period">
          <td v-for="head in tableHeads" >{{ item[head.key] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import VSelection from '../components/base/selection'
import VDatePicker from '../components/base/datepicker'
export default {
  components:{
    VSelection,
    VDatePicker
  },
  data () {
    return {
      startDate:'',
      endDate:'',
      query:'',
      productId:0,
      products:[
        {
          label:'明星大侦探',
          value:0
        },
         {
          label:'二十四小时',
          value:1
        },
         {
          label:'谁的青春不迷茫',
          value:2
        },
         {
          label:'匆匆那年',
          value:3
        }
      ],
      tableHeads: [
        {
          label: '影片号',
          key: 'orderId'
        },
        {
          label: '观看影片',
          key: 'product'
        },
        {
          label: '节目类型',
          key: 'version'
        },
        {
          label: '节目时长',
          key: 'period'
        },
        {
          label: '观看日期',
          key: 'date'
        },
        {
          label: '观看集数',
          key: 'buyNum'
        }
      ],
      currentOrder: 'asc',
      tableData:[]
    }
  },
  watch:{
    query(){
      console.log('on query change')
      this.getTableData()
    }
  },
  methods:{
    productChange(obj){
      this.productId=obj.value
      this.getTableData()
      // console.log(obj.value);
    },
    getStartDate (date) {
      this.startDate = date
      this.getTableData()
    },
    getEndDate (date) {
      this.endDate = date
      this.getTableData()
    },
    getTableData(){
      let reqParams = {
        query: this.query,
        productId: this.productId,
        startDate: this.startDate,
        endDate: this.endDate
      }
      this.$http.post('/api/getOrderList', reqParams)
      .then((res) => {
        this.tableData = res.data.data.list
        // console.log(res.data.data.list);
      }, (err) => {

      })
    },
    changeOrderType (headItem) {
      this.tableHeads.map((item) => {
        item.active = false
        return item
      })
      headItem.active = true
      // 切换正序倒序
      if (this.currentOrder === 'asc') {
        this.currentOrder = 'desc'
      }
      else if (this.currentOrder === 'desc') {
        this.currentOrder = 'asc'
      }
      // 返回排序好的数组
      this.tableData = _.orderBy(this.tableData, headItem.key, this.currentOrder)
    }
  },
  mounted(){
    this.getTableData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.order-wrap {
  width: 100%;
  min-height: 455px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 25px;
  color:#fff;
  font-weight: bold;
  text-align:center;
  margin-bottom: 20px;
}
.order-list-choose{
  margin-top:3%;
  margin-left:5%;
  margin-bottom: 3%;
}
.order-query {
  height: 25px;
  line-height: 25px;
  background: #555;
  border: 1px solid #fde;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  color:#ccc;
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
  margin-left:3%;
  margin-right:3%;
  box-shadow:0 0 2px 2px #333;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #999;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #fde;
  color: #555;
  text-shadow: 1px 1px .5px #555;
  border: 1px solid #999;
  cursor: pointer;
}
.order-list-table th.active {
  background: #f77;
}
</style>
