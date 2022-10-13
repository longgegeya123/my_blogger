<template>
  <!-- <Tutorial /> -->
  <div>
    <nbTabs v-model="modelVal" :tabs="tabs" tabVal="value" tabKey="key" @query="onQuery"
      @change="onChange">
      <ul>
        <li v-for="(item,index) in list" :key="index">{{item.value}}</li>
      </ul>
    </nbTabs>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      modelVal: '0',
      tabs: [
        {
          value: '区域入侵',
          key: '4',
        },
        {
          value: '人员聚集',
          key: '5',
        },
        {
          value: '违规停车',
          key: '6',
        },
      ],
      list: [],
    }
  },
  created() {
    for (let i = 0; i <= 30; i++) {
      this.list.push({ value: '今天是' + ++i + '天' })
    }
  },
  methods: {
    onQuery() {
      console.log('触底了')
      // let num = 10
      // setTimeout(() => {
      //   const list = []
      //   num += 10
      //   for (let i = 0; i <= num; i++) {
      //     list.push({ value: '今天是' + ++i + '天' })
      //   }
      //   this.list = this.list.concat(list)
      //   console.log(num, 'num')
      //   console.log(this.list, 'list')
      // }, 500)
    },
    onChange(val) {
      console.log(val, 'val')
    },
  },
}
</script>
<style lang="scss">
ul {
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
  height: 50px;
  width: 100%;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid seagreen;
}
</style>
