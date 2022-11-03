<template>
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
import axios from 'axios'
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
  // asyncData() {
  //   // let list = []
  //   let params = {
  //     deliveryTime: [],
  //     datePicker: [],
  //     approvalTime: [],
  //     returnedTime: [],
  //     changedTime: [],
  //     queryStatus: '00',
  //     isFrame: '00',
  //     pageNo: 1,
  //     pageSize: 10,
  //   }
  //   return axios
  //     .post(
  //       'http://123.57.67.7/bidprocurement/procurement-purchasplan/purchasePlanDetailsPack/getPurchasePlanDetailsWaitPackCustomList',
  //       params,
  //       {
  //         headers: {
  //           'X-AUTH-TOKEN':
  //             '7f92518a677b408f9554ac8bab282e47_eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJqaWNhaSIsInN1YiI6ImppY2FpIiwiaWF0IjoxNjY2MzM3MTE1fQ.CXrVs9tv4455nUQsT4Tcu3t_eXSxCq7cATdTLmRBvWA',
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       return {
  //         list: res.data.data.records,
  //       }
  //       // console.log(
  //       //   res.data.data.records,
  //       //   '..................................asyncData'
  //       // )
  //     })
  // },
  created() {
    this.$cookies.set('token', 'nnnn')
    this.$store.commit('M_UPDATE_TOKEN', 'nnn')
    console.log('1111111111')
  },
  mounted() {
    setTimeout(
      function () {
        this.getInit()
      }.bind(this)
    )
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
      console.log(this.$store.state.token, '-----------------')
      Ajax(
        'POST',
        'purchasePlanDetailsPack/getPurchasePlanDetailsWaitPackCustomList',
        this.params
      ).then((res) => {
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
