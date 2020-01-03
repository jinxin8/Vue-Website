<template>
  <div class="selection-component">
    <div class="selection-show" @click="toggleDrop">
      <span>{{selections[nowIndex].label}}</span>
      <div class="arrow"></div>
    </div>
    <!-- 通过isDrop进行控制下拉菜单是否展示 -->
    <div class="selection-list" v-if="isDrop">
      <ul>
          <li v-for="(item,index) in selections" @click="chooseSelection(index)">{{item.label}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../eventBus'
export default {
  props: {
    selections: {
      type: Array,
      default: [{
        label: 'test',
        value: 0
      }]
    }
  },
  data () {
    return {
      isDrop:false,
      nowIndex:0
    }
  },
  mounted(){
    eventBus.$on('reset-component',()=>{
      this.isDrop=false
    })
  },
  methods:{
    toggleDrop(event){
      // 阻止冒泡
      event.stopPropagation();
      // 在调用一边eventBus是用于有两个select是点击一个收起另为一个
      eventBus.$on('reset-component');
      this.isDrop=!this.isDrop
    },
    chooseSelection (index) {
      this.nowIndex = index
      // this.isDrop = false
      this.$emit('on-change', this.selections[this.nowIndex])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.selection-component {
  position: relative;
  display: inline-block;
}
.selection-show {
  border: 1px solid #fde;
  padding: 0 20px 0 10px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  border-radius: 3px;
  background: #555;
}
.selection-show span{
  color:#fff;
}
.selection-show .arrow {
  display: inline-block;
  /*css样式实现三角形
  边框高度和宽度都设为0，边框线宽4px，就是一个边长为8px的正方形，transparent透明，将左右边框颜色设为透明上边框颜色设为其他颜色，就会形成倒三角。如果将下边框设为其他颜色不设置上边框，就会形成正三角*/
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #fff;
  width: 0;
  height: 0;
  margin-top: -1px;
  margin-left: 6px;
  margin-right: -14px;
  vertical-align: middle;
}
.selection-list {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 25px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #fde;
  border-bottom: 1px solid #fde;
  z-index: 5;
}
.selection-list li {
  padding: 5px 15px 5px 10px;
  border-left: 1px solid #fde;
  border-right: 1px solid #fde;
  cursor: pointer;
  background: #555;
  color:#000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

}
.selection-list li:hover {
  background: #ccc;
}
</style>
