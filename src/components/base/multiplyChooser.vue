<!-- 多选 -->
<template>
    <div class="chooser-component">
        <ul class="chooser-list">
          <li
          v-for="(item, index) in selections"
          @click="toggleSelection(index)"
          :title="item.label"
          :class="{active: checkActive(index)}"
          >{{ item.label }}</li>
        </ul>
      </div>
    </div>
</template>

<script>
// 工具库
import _ from 'lodash'
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
    	// nowIndexs是数组，可以一次传两个以上数据
     	nowIndexes: [0]
    }
  },
  methods: {
    toggleSelection (index) {
    	// 判断当前选择的项是否在已经选择的里面，如果没有就push添加进去，如果有就剔除掉
      if (this.nowIndexes.indexOf(index) === -1) {
        this.nowIndexes.push(index)  
      }
      else {
        this.nowIndexes = _.remove(this.nowIndexes, (idx) => {
          return idx !== index
        })
      }
      // this.nowIndex数组的集合，要返回一个数组的对象，用过map方法给this.nowIndex做一个映射，对里面的每一项进行改变，把idx变成对象
      let nowObjArray = _.map(this.nowIndexes, (idx) => {
        return this.selections[idx]
      })
      this.$emit('on-change', nowObjArray)
    },
    checkActive (index) {
      return this.nowIndexes.indexOf(index) !== -1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chooser-component {
  position: relative;
  display: inline-block;
}
.chooser-list li{
  display: inline-block;
  border: 1px solid #e3e3e3;
  background:#555;
  color:#fff;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.chooser-list li.active {
  border-color: #fde;
  background: #ccc;
  color: #000;
}
</style>
