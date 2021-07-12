<template>
  <div class="_layout-page-box">
    <a-drawer
      @close="onClose"
      v-if="isMobile"
      :closable="false"
      :keyboard="false"
      :visible="drawerVisible()"
      :bodyStyle="{ height: '100vh', padding: 0 }"
      handle
      placement="left"
    >
      <SiderBar
        :collapsed="collapsed"
        :isMobile="isMobile"
        :mobileClose="onClose"
      />
    </a-drawer>
    <a-layout>
      <a-layout-sider
        v-model="collapsed"
        v-if="!isMobile"
        :width="siderBarWidth"
        :trigger="null"
        collapsible
        class="layout-sider"
      >
        <SiderBar
          :collapsed="collapsed"
          :isMobile="isMobile"
          :mobileClose="onClose"
        />
      </a-layout-sider>

      <a-layout class="layout-content-box">
        <a-layout-header class="lalayout-header">
          <HeaderBar
            :userData="userData"
            :toggleClick="toggleClick"
            :collapsed="collapsed"
            :isMobile="isMobile"
            :isFixed="true"
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
import HeaderBar from "@/components/headerBar/index";
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
      userData: {}
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.initUserData();
  },
  watch: {},
  methods: {
    initUserData() {
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

    onClose() {
      this.collapsed = true;
    }
  }
};
</script>

<style scoped lang="less">
._layout-page-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .layout-content-box {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  ._layout-main-box {
    margin: 12px;
    min-height: auto;
    min-width: 1100px;
  }
  .layout-sider {
    position: relative;
    z-index: 10;
    min-height: 100%;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  }
  .lalayout-header {
    background: #fff;
    width: 100%;
    padding: 0;
  }
}
</style>
