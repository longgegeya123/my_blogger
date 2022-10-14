<template>
  <div class="xl-tabs-person" :style="{'background-color':tabsBgColor}">
    <div class="tabs-title" :style="{ height: titleHeight, 'border-bottom': titleBorderBottom }">
      <div class="tabs-title-wrap">
        <div :class="[
            'tabs-title-wrap-item',
            {
              'tab-item-active': active === index
            }
          ]" codeName="tabItem" v-for="(item, index) in tabs" :key="index"
          @click.stop="onItem(index, $event)">
          <span codeName="span"
            style="display:block;width:100%;padding: 0 12px;text-align: center;">{{ item[tabVal] }}</span>
        </div>
        <div class="tabs__line" :style="{
            transform: `translateX(${lateX}px) translateX(-50%)`,
            'transition-duration': '0.3s',
            'background':lineBgColor
          }"></div>
      </div>
    </div>
    <div class="tabs-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { bindSwipeEvent, pageScroll } from './util';
export default {
  name: 'XlTabs',
  props: {
    modelVal: {
      type: Number | String,
      required: true
    },
    tabs: {
      type: Array,
      required: true
    },
    // 展示tab内容key
    tabVal: {
      type: String,
      required: true
    },
    // tabs高度
    titleHeight: {
      type: String,
      default: '44px'
    },
    // tabs地边框样式
    titleBorderBottom: {
      type: String,
      default: '1px solid darkgray'
    },
    // 标尺线颜色
    lineBgColor: {
      type: String,
      default: 'rgb(111,121,164)'
    },
    // tabs背景色
    tabsBgColor: {
      type: String,
      default: '#f7f8fa'
    },
    // 触底阈值
    bottomFlag: {
      type: Number,
      default: 120
    }
  },
  model: {
    prop: 'modelVal',
    event: 'change'
  },
  data() {
    return {
      lateX: '0',
      active: 0
    };
  },
  created() {
    this.active = Number(this.modelVal);
  },
  mounted() {
    const that = this;
    that.getWidth('.tabs-title-wrap-item');
    const maxNum = this.tabs.length - 1;
    bindSwipeEvent(
      document.querySelector('.tabs-con'),
      function leftCallback(ev) {
        if (that.active <= 0) {
          that.active = 0;
        } else {
          that.active -= 1;
        }
        that.getWidth('.tabs-title-wrap-item');
      },
      function rightCallback(ev) {
        if (that.active >= maxNum) {
          that.active = maxNum;
        } else {
          that.active += 1;
        }
        that.getWidth('.tabs-title-wrap-item');
      }
    );
    pageScroll(
      document.querySelector('.tabs-con'),
      that.bottomFlag,
      function () {
        that.$emit('query');
      }
    );
  },
  methods: {
    onItem(index) {
      this.active = index;
      this.getWidth('.tabs-title-wrap-item');
    },
    lateXMethods(l, w) {
      this.lateX = Math.floor(l + w / 2);
    },
    getWidth(className) {
      this.$nextTick(() => {
        const dom = document.querySelectorAll(className);
        const active = this.active <= 0 ? 0 : this.active;
        const doms = Array.from(dom).slice(0, active);
        const w = dom[this.active].offsetWidth;
        var totalWidth = 0;
        for (const item of doms.values()) {
          totalWidth += item.offsetWidth;
        }
        this.lateXMethods(totalWidth, w);
        this.$emit('change', this.active);
      });
    }
  }
};
</script>
<style>
.xl-tabs-person {
  box-sizing: border-box;
  overflow: hidden;
  font-family: Open Sans, -apple-system, BlinkMacSystemFont, Helvetica Neue,
    Helvetica, Segoe UI, Arial, Roboto, PingFang SC, miui, Hiragino Sans GB,
    Microsoft Yahei, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.tabs-title {
  overflow: hidden;
}
.tabs-title > .tabs-title-wrap {
  padding-bottom: 15px;
  position: relative;
  box-sizing: content-box;
  display: flex;
  height: 100%;
  box-sizing: content-box;
  overflow-y: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  user-select: none;
}
.tabs-title > .tabs-title-wrap > .tabs-title-wrap-item {
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  flex: 1;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  justify-content: center;
  align-items: center;
  color: #646566;
  font-size: 14px;
  cursor: pointer;
  box-sizing: border-box;
}
.tabs-title > .tabs-title-wrap > .tab-item-active {
  color: #323233;
  font-weight: 500;
}
.tabs-title > .tabs-title-wrap > .tabs__line {
  position: absolute;
  bottom: 15px;
  left: 0;
  z-index: 1;
  width: 30px;
  height: 2px;
  border-radius: 2px;
}
.tabs-con {
  min-height: 200px;
  height: 300px;
  width: 100%;
  overflow-y: scroll;
}
</style>
