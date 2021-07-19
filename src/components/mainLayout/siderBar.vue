<template>
  <div
    :style="{width: `${siderBarWidth}px` }"
    :class="collapsed ? ' _sider-bar-collapsed' : ''"
    class="_sider-bar-box"
  >
    <div class="logo" :class="collapsed ? 'logo-collapsed' : ''">
      <LogoSvg class="logo-img"/>
      <div class="text" v-show="!collapsed">管理系统</div>
    </div>
    <a-menu
      v-model="menuSelectKeys"
      @click="menuItemClick"
      :openKeys.sync="openKeys"
      :inline-collapsed="collapsed"
      mode="inline"
      theme="dark"
    >
      <template v-for="route in menuRouteData">
        <SubMenu v-if="route.children" :menu="route" :key="route.name"/>
        <a-menu-item v-else :key="route.name" :title="route.meta.title">
          <span>
            <img v-if="route.meta.img" :src="route.meta.img" class="_siderbar-img-icon"/>
            <a-icon v-else :type="route.meta.icon"/>
            <span>{{ route.meta.title }} </span>
          </span>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { routes } from "@/router/index.js";
import SubMenu from "./subMenu.vue";
import LogoSvg from "./logoSvg.vue";
import { siderBarWidth } from "./const.js";
// import { isSetOriginRouter } from "@/router/const";
export default {
  components: {
    LogoSvg,
    SubMenu
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      siderBarWidth,
      openKeys: [], // 侧边栏需展开的列表项
      menuSelectKeys: [], // 侧边栏当前选中列表项
      menuRouteData: [], // 菜单路由数据
      isMenuItemClick: false // 是否是菜单点击，防止重复设置openkey & selectkey
    };
  },
  computed: {},
  created() {
    this.initRouteData();
    this.setOpenKeysAndSelectKeys();
  },
  mounted() {

  },
  watch: {
    $route(to, from) {
      if (this.isMenuItemClick) {
        this.isMenuItemClick = false;
        return;
      }
      this.setOpenKeysAndSelectKeys(to);
    }
  },
  destroyed() {},
  methods: {
    // 初始化路由数据
    initRouteData() {
      const [{ children: mainChildRoutes }] = routes.filter((route) => route?.meta?.key === "mainLayout");
      // this.menuRouteData = this.setRouteComponent(mainChildRoutes, "originPath");
      this.menuRouteData = this.setRouteComponent(mainChildRoutes);
      console.log(this.menuRouteData);
    },

    menuItemClick(e) {
      const { item: { title }, keyPath } = e;
      const pathTitle = [];
      keyPath.forEach(path => {
        pathTitle.push(this.getRouteTitle(this.menuRouteData, path)); // 获取跳转路由的title
      })
      const currentName = this.$route.name
      const nextRouteName = keyPath[0];
      if (currentName && currentName !== nextRouteName) {
        this.isMenuItemClick = true;
        this.$router.push({ name: nextRouteName }); // 跳转页面
      }
      console.log(this.$route)
      console.log(title);
      console.log(" e.keyPath;", keyPath);
      console.log("pathTitle;", pathTitle);
    },

    setOpenKeysAndSelectKeys(to) {
      to = to || this.$route; // 当前初始进入此页面时只存在this.route，切换到其他路由时存在to
      const currentKeys = this.menuSelectKeys[0];
      const toKeys = to.name;
      if (currentKeys !== toKeys) this.menuSelectKeys = [toKeys]; // 设置当前选中 menu Item
      const matched = to.matched;
      if (Array.isArray(matched) && matched.length > 2) {
        const openKeyPaths = [...matched];
        openKeyPaths.shift(); // 去除第一个，因为第一个是mainLayout
        openKeyPaths.pop(); // 去除最后一个，最后一个就是当前显示的menu Item，无需展开
        this.openKeys = openKeyPaths.map(path => path.name); // 此时剩余的就是要展开的menu Item
      }
    },

    setRouteComponent(routes = [], type) {
      if (type !== "originPath") return routes;
      return routes.map((route) => {
        if (Array.isArray(route.children)) {
          route.children = this.setRouteComponent(route.children, type);
        }
        return {
          ...route,
          component: () => import(/* webpackChunkName: "doc-[request]" */`@/${route.component}`)
        }
      })
    },

    getRouteTitle(routes, name) {
      // name 是定义在menu组件上的key，所以匹配route.name
      let routeTitle = "";
      for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        if (route.name === name) {
          return route?.meta?.title;
        }
        if (Array.isArray(route.children)) {
          routeTitle = this.getRouteTitle(route.children, name);
        }
      }
      return routeTitle;
    },

    menuStringToObj(menus) {
      console.log("menus", menus);
      return menus.map((menu) => {
        return {
          ...menu,
          config: JSON.parse(menu.config),
          children: Array.isArray(menu.children)
            ? this.menuStringToObj(menu.children)
            : []
        };
      });
    },

    // filterAddSiderBar(routeData) {
    //   return routeData
    //     .filter((item) => {
    //       return item.meta && item.meta.isAddSiderBar !== false;
    //     })
    //     .map((item) => {
    //       if (item.children) {
    //         item.children = this.filterAddSiderBar(item.children);
    //       }
    //       return item;
    //     });
    // },
    // 判断是否是远端配置的路由路径，如果是，那么要动态导入对应的路由页面。
    // gotoPage(routeKey) {
    //   console.log("routeKey", routeKey);
    //   const routeName = ""
    //   // 存储当前选中的列表页和列表项 防止 移动端 pc端切换时丢失数据
    //   // setSessionStorage("selectSiderBarData", this.selectSiderBarData);

    //   this.$router
    //     .push({
    //       name: routeName
    //     })
    //     .then(() => {
    //       // 面包屑的监听数据 必须在路由跳转之后进行发送
    //       // 否则面包屑组件中的监听 在组件未创建时无法进入触发监听函数
    //       // this.menuBreadcrumbEmit(this.selectSiderBarData);
    //       // 如果是移动端 并且触发点击函数之后 侧边栏切换跳转页面 关闭drawer弹窗
    //     });
    // },

    menuBreadcrumbEmit(siderBarData) {
      $Vue.$emit("menuBreadcrumb", siderBarData);
    }

  }
};
</script>

<style scoped lang="less">
._sider-bar-box {
  min-height: 100%;
  .logo {
    height: 64px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .logo-img {
      height: 28px;
      width: 28px;
      border-radius: 8px;
      margin-left: 24px;
    }
    .text {
      display: inline-block;
      margin: 0 0 0 12px;
      color: #fff;
      font-weight: 600;
      font-size: 16px;
      vertical-align: middle;
      animation: fade-in;
      animation-duration: 0.3s;
    }
  }
}
._sider-bar-collapsed {
  width: 80px !important;
}

.logo-collapsed {
  width: 48px;
}
</style>
<style lang="less">
._siderbar-img-icon {
  height: 14px;
  width: 14px;
  margin-right: 10px;
}

._sider-bar-box {
  .item_title {
    display: flex;
    align-items: center;
  }
  .ant-menu-item {
    display: flex;
    align-items: center;
  }
  .item_title_op_span {
    opacity: 0;
    max-width: 0;
  }
}
</style>
