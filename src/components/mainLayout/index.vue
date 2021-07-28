<template>
  <div class="_layout-page-box">
    <a-layout>
      <a-layout-sider
        v-model="collapsed"
        :width="siderBarWidth"
        :trigger="null"
        collapsible
        class="_layout-sider"
      >
        <SiderBar :collapsed="collapsed"/>
      </a-layout-sider>

      <a-layout class="_layout-content-box">
        <a-layout-header :style="{ width: headerWitdh }" class="_layout-header" ref="layoutHeaderRef">
          <HeaderBar
            :userData="userData"
            :toggleClick="toggleClick"
            :collapsed="collapsed"
          />
        </a-layout-header>
        <a-layout-content class="_layout-main-box">
          <router-view />
        </a-layout-content>
        <!-- <a-layout-footer></a-layout-footer> -->
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import SiderBar from "./siderBar.vue";
import HeaderBar from "./headerBar.vue";
import { siderBarWidth } from "./const.js";
export default {
  components: {
    SiderBar,
    HeaderBar
  },
  props: {},
  data() {
    return {
      siderBarWidth,
      collapsed: false,
      isMobile: false,
      userData: {},
      headerWitdh: 0
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.initUserData();
  },
  watch: {
    collapsed: function() {
      this.setHeaderWitdh();
    }
  },
  methods: {
    initUserData() {
      this.setHeaderWitdh();
      this.userData = {
        name: "管理员",
        avatar: require("@/assets/images/default_avatar.png"),
        list: [
          { icon: "user", text: "个人中心", routeName: "layout/personalCenter" }
        ]
      };
    },
    // 点击菜单收起展开按钮
    toggleClick() {
      this.collapsed = !this.collapsed;
    },

    drawerVisible() {
      return !this.collapsed;
    },

    setHeaderWitdh() {
      const { collapsed } = this;
      this.headerWitdh = `calc(100% - ${collapsed ? 80 : siderBarWidth}px)`
    }

  }
};
</script>

<style scoped lang="less">
._layout-page-box {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  ._layout-content-box {
    width: 100%;
    height: 100%;
    //overflow: auto;
  }
  ._layout-main-box {
    margin: 12px;
    // min-height: auto;
    min-width: 1100px;
  }
  ._layout-sider {
    position: relative;
    z-index: 10;
    min-height: 100%;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  }
  ._layout-header {
    position: fixed;
    top: 0;
    padding: 0;
    background: #fff;
    transition: width .2s;
  }
}
</style>
