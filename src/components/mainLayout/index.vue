<template>
  <div class="_layout-page-box">
    <a-layout>
      <a-layout-sider
        v-model="collapsed"
        :width="siderBarWidth"
        :trigger="null"
        collapsible
      >
        <SiderBar :collapsed="collapsed"/>
      </a-layout-sider>

      <a-layout class="_layout-content-box">
        <a-layout-header class="_layout-header">
          <div class="header-content" :style="{ width: headerWitdh }" >
            <HeaderBar
              :userData="userData"
              :toggleClick="toggleClick"
              :collapsed="collapsed"
            />
          </div>
        </a-layout-header>
        <a-layout-content class="_layout-view-box">
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
      headerWitdh: `calc(100% - ${siderBarWidth}px)`
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
  }
  ._layout-view-box {
    margin: 12px;
    min-width: 1100px;
  }
  ._layout-header {
    .header-content{
      position: fixed;
      top: 0;
      right: 0;
      padding: 0;
      background: #fff;
      transition: width .2s;
    }

  }
}
</style>
