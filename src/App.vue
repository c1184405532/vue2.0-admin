<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <Spin
        :spinning="spinningLoding"
        :tip="spinningTip"
        size="large"
        wrapperClassName="global-spin-box"
      >
        <router-view />
      </Spin>
    </div>
  </a-config-provider>
</template>

<script>
import { Spin } from "ant-design-vue";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
// eslint-disable-next-line
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  name: "app",
  components: {
    Spin
  },
  data() {
    return {
      zhCN,
      transitionName: "",
      keepAliveData: [],
      spinningLoding: false,
      spinningTip: ""
    };
  },
  watch: {},
  mounted() {
    // vue实例化在App创建之后,使用异步进行初始化监听
    setTimeout(() => {
      $Vue.$off("globalLoading").$on("globalLoading", (options) => {
        /**
         * @param { Boolean } type true 显示 false 不显示
         * @param { Number } time 显示的毫秒数
         * @param { String } tip 需要提示的文字
         */
        const { type, time, tip } = options;
        this.spinningLoding = Boolean(type);
        this.spinningTip = tip;
        if (time) {
          setTimeout(() => {
            $Vue.$emit("globalSpinToggle", { type: false });
          }, time)
        }
      })
    });
  }
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
#app {
  font-size: 14px;
  .global-spin-box {
    .ant-spin-container,.ant-spin-spinning{
      height: 100vh;
      max-height: none;
    }
    .ant-spin-text {
      font-size: 18px;
    }
  }
}
</style>
