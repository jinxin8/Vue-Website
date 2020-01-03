<template>
  <div class="chooser-component">
    <ul class="chooser-list">
      <li
      v-for="(item, index) in banks"
      @click="chooseSelection(index)"
      :title="item.label"
      :class="[item.name, {active: index === nowIndex}]"
      ><img :src="item.src" alt=""></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nowIndex: 0,
      banks: [
          {
              id: 101,
              label: '芒果TV',
              name: 'mangguo',
              src:require('../assets/banks/1.jpg')

          },
          {
              id: 201,
              label: '爱奇艺',
              name: 'aiqiyi',
              src:require('../assets/banks/3.jpg')
          },
          {
              id: 301,
              label: '腾讯视频',
              name: 'tengxun',
              src:require('../assets/banks/2.jpg')
          },
          {
              id: 401,
              label: '优酷视频',
              name: 'youku',
              src:require('../assets/banks/4.jpg')
          },
          {
              id: 501,
              label: 'potplayer',
              name: 'player',
              src:require('../assets/banks/5.jpg')
          },
          {
              id: 601,
              label: 'bilibili',
              name: 'bili',
              src:require('../assets/banks/6.jpg')
          }
      ]
    }
  },
  methods: {
    chooseSelection (index) {
      this.nowIndex = index
      this.$emit('on-change', this.banks[index])
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
.chooser-list li.active {
  border: 2px solid #ff0;
}
.chooser-list li { 
    display: inline-block;
    width: 14%;
    height: 50px;
    background-repeat: no-repeat;
    margin: 2px;
    border: 1px solid #0ff;
    cursor: pointer;
}
.chooser-list img{
    width: 100%;
    height: 100%;
}
</style>
