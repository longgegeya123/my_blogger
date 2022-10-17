<template>
  <!-- <Tutorial /> -->
  <div>
    <xltabs v-model="modelVal" :tabs="tabs" :tabList="list" tabVal="value" tabKey="key"
      @query="onQuery" @change="onChange">
      <ul>
        <li v-for="(item,index) in list" :key="index">{{item.purchaseNo}}</li>
      </ul>
    </xltabs>
  </div>
</template>

<script>
import Ajax from '~/assets/ajax/index.js'
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
      params: {
        deliveryTime: [],
        datePicker: [],
        approvalTime: [],
        returnedTime: [],
        changedTime: [],
        queryStatus: '00',
        isFrame: '00',
        pageNo: 1,
        pageSize: 10,
      },
      list: [],
    }
  },
  created() {
    this.getInit()
  },
  methods: {
    // 滚动触低触发
    onQuery() {
      this.params.pageNo += 1
      this.getInit()
      console.log('触底了')
    },
    // tab切换触发
    onChange(val) {
      console.log(val, 'val')
    },
    getInit() {
      Ajax('POST', '', this.params).then((res) => {
        const {
          data: { records },
        } = JSON.parse(res)
        this.list = this.list.concat(records)
      })
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
