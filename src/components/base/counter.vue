<template>
  <div class="counter-component">
    <div class="counter-btn" @click="minus"> - </div>
    <div class="counter-show">
      <input type="text" v-model="number" @keyup="fixNumber">
    </div>
    <div class="counter-btn" @click="add"> + </div>
  </div>
</template>

<script>
export default {
  props: {
    max: {
      type: Number,
      default: 12
    },
    min: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      number: this.min
    }
  },
  watch: {
    number () {
      this.$emit('on-change', this.number)
    }
  },
  methods: {
    fixNumber () {
      let fix
      if (typeof this.number === 'string') {
        fix = Number(this.number.replace(/\D/g, ''))
      }
      else {
        fix = this.number
      }
      if (fix > this.max || fix < this.min) {
        fix = this.min
      }
      this.number = fix
    },
    minus () {
      if (this.number <= this.min) {
        return
      }
      this.number --
    },
    add () {
      if (this.number >= this.max) {
        return
      }
      this.number ++
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.counter-component {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.counter-show {
  float: left;
}
.counter-show input {
  border: none;
  border-top: 1px solid #fde;
  border-bottom: 1px solid #fde;
  height: 23px;
  line-height: 23px;
  width: 30px;
  outline: none;
  text-align:center;
  text-indent: 4px;
  background:#555;
  color:#fff;
}
.counter-btn {
  border: 1px solid #fde;
  float: left;
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  cursor: pointer;
  background:#555;
  color:#fff;
}
.counter-btn:hover {
  border-color: #fde;
  background: #ccc;
  color: #000;
}
</style>
