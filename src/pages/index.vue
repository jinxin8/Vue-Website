<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block">
        <h2>个人中心</h2>
        <template v-for="product in productList">
        <h3>{{product.title}}</h3>
        <ul>
          <li v-for="item in product.list">
              <a :href="item.url">{{ item.title }}</a>
              <span v-if="item.hot" class="hot-tag">HOT</span>
          </li>
        </ul>
        <div v-if="!product.last" class="hr"></div>
        </template>
      </div>
      <div class="index-left-block lastest-news">
        <h2>热门话题</h2>
          <ul>
            <li v-for="items in newsList">
              <a :href="items.url" class="new-item">{{items.title}}</a>
            </li>
          </ul>
      </div>
    </div>
    <div class="index-right">
      <slide-show :slides="slides" @onchange="doSomethingOnSlideChange"></slide-show>
      <div class="index-right-list">
        <div class="index-right-item" v-for="(item, index) in boardList"
        :class="[{'line-last' : index % 2 !== 0}, 'index-right-' + item.id]">
          <div class="index-right-item-inner">
            <h2>{{item.title}}</h2>
            <p>{{item.description}}</p>
            <div class="index-right-button1" :href="boardList.href">
              <a :href="item.href" class="button1">立即观看</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slideShow from '../components/slideShow'
export default {
  components:{
    slideShow
  },
  data:{
    boardList:null
  },
  methods:{
    doSomethingOnSlideChange(){
      // console.log('doSomethingOnSlideChange run!')
    }
  },
  name: 'Index',
  // created:function(){
  //   // promise对象,
  //   this.$http.post('getList')
  //   .then(function(data){
  //     console.log(data);
  //   },function(err){
  //     console.log(err)
  //   })
  // },
  data () {
    return {
      slides:[
        {
          src:require('../assets/slideShow/1.jpg'),
          title:'我是白rap',
          href:'detail/mingxing'
        },
        {
          src:require('../assets/slideShow/2.jpg'),
          title:'喜欢唱着trap',
          href:'detail/ershisi'
        },
        {
          src:require('../assets/slideShow/3.jpg'),
          title:'没事玩着dap',
          href:'detail/shuide'
        },
        {
          src:require('../assets/slideShow/4.jpg'),
          title:'skrr skrr',
          href:'detail/congcong'
        }
      ],
      boardList:[
        {
          title:'明星大侦探',
          description:'大型自制明星推理真人秀节目',
          id:'one',
          href:'detail/mingxing',
          saleout:false
        },
        {
          title:'二十四小时',
          description:'大型原创悬念式户外真人秀节目',
          id:'two',
          href:'detail/ershisi',
          saleout:false
        },
        {
          title:'谁的青春不迷茫',
          description:'校园青春励志电影',
          id:'three',
          href:'detail/shuide',
          saleout:false
        },
        {
          title:'匆匆那年',
          description:'校园青春爱情回忆电视剧',
          id:'four',
          href:'detail/congcong',
          saleout:false
        }
      ],
      productList:{
        xg:{
          title:'人物相关',
          list:[
                  {
                    title:'个人简介',
                    url:'https://baike.baidu.com/item/%E7%99%BD%E6%95%AC%E4%BA%AD/14681311?fr=aladdin'
                  },
                  {
                    title:'人物写真',
                    url:'http://image.baidu.com/search/index?tn=baiduimage&ct=201326592&lm=-1&cl=2&ie=gbk&word=%B0%D7%BE%B4%CD%A4%D0%B4%D5%E6&fr=ala&ala=1&alatpl=adress&pos=0&hs=2&xthttps=000000',
                    hot:true,
                  },
                  {
                    title:'演艺经历',
                    url:'https://baike.baidu.com/item/%E7%99%BD%E6%95%AC%E4%BA%AD/14681311?fr=aladdin'
                  },
                  {
                    title:'获奖记录',
                    url:'https://baike.baidu.com/item/%E7%99%BD%E6%95%AC%E4%BA%AD/14681311?fr=aladdin'
                  }
               ]
            },
        zp:{
          title:'主要作品',
          last:true,
          list:[
                {
                  title:'参演电视',
                  url:'https://baike.baidu.com/item/%E7%99%BD%E6%95%AC%E4%BA%AD/14681311?fr=aladdin'
                },
                 {
                  title:'参演电影',
                  url:'https://baike.baidu.com/item/%E7%99%BD%E6%95%AC%E4%BA%AD/14681311?fr=aladdin'
                },
                 {
                  title:'杂志写真',
                  url:'https://baike.baidu.com/item/%E7%99%BD%E6%95%AC%E4%BA%AD/14681311?fr=aladdin'
                },
                 {
                  title:'综艺节目',
                  url:'https://baike.baidu.com/item/%E7%99%BD%E6%95%AC%E4%BA%AD/14681311?fr=aladdin',
                  hot:true
                }
              ]
          }
      },
      newsList:[
        {
          title:'白敬亭的篮球梦',
          url:'https://baijiahao.baidu.com/s?id=1592661371946161182&wfr=spider&for=pc'
        },
        {
          title:'白敬亭澄清秋裤',
          url:'http://ent.sina.com.cn/tv/zy/2017-11-04/doc-ifynnnsc5588636.shtml'
        },
        {
          title:'白敬亭回归明真',
          url:'http://www.sohu.com/a/227943856_267454'
        },
        {
          title:'二十四小时夺冠',
          url:'http://www.menww.com/yule/zongyi/2018022420627.html',
          hot:true
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-wrap {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.index-left {
  float: left;
  width: 22%;
  margin-left: 50px;
  text-align: left;
}
.index-right {
  float: left;
  /*width: 900px;*/
  width:70%;
}
.index-left-block {
  margin: 15px;
  background: rgb(10,10,10,.7);
  box-shadow: 0 0 4px #fff;
  /*text-align:center;*/
}
.index-left-block .hr {
  margin-bottom: 20px;
  border-bottom:1px solid #bbb;
}
.index-left-block h2 {
  background: rgb(255,140,140,.8);
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #eee;
}
.index-left-block ul {
  padding: 10px 15px;
  list-style:none;
  color:#bbb;
}
.index-left-block li {
  padding: 5px;
}
.index-right-list {
  overflow: hidden;
}
.index-right-item {
  float: left;
  width: 41%;
  background: rgb(10,10,10,.7);
  box-shadow: 0 0 4px #fff;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.index-right-item-inner {
  min-height: 125px;
  padding-left: 47%;
}
.index-right-one .index-right-item-inner{
  background: url(../assets/images/1.jpg) no-repeat;
  background-size:42% 100%;
}
.index-right-two .index-right-item-inner{
  background: url(../assets/images/2.jpg) no-repeat;
  background-size:42% 100%;
}
.index-right-three .index-right-item-inner{
  background: url(../assets/images/3.jpg) no-repeat;
  background-size:42% 100%;
}
.index-right-four .index-right-item-inner{
  background: url(../assets/images/4.jpg) no-repeat;
  background-size:42% 100%;
}
.index-right-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 15px;
}
.index-right-item p{
  color:#bbb;
}
.line-last {
  margin-right: 0;
}
.index-right-button1 {
  width:60px;
  border:1px dotted red;
  background-color: rgb(255,140,140,.8);
  padding:10px;
  margin-top: 20px;
}
.lastest-news {
  min-height: 350px;
}
.hot-tag {
  color: red;
  border:1px dotted red;
}
.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
