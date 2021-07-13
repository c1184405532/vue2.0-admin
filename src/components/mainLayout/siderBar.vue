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
      :defaultOpenKeys="defaultOpenKeys"
      :inline-collapsed="collapsed"
      mode="inline"
      theme="dark"
    >
      <template v-for="route in routerData">
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
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      siderBarWidth,
      defaultOpenKeys: [], // 侧边栏打开的列表页
      menuSelectKeys: [], // 侧边栏当前选中列表项
      mainChildRoutes: [], // layout下路由数据
      routerData: [], // 菜单路由数据
      isClickMenuItem: false,
      selectSiderBarData: []
    };
  },
  computed: {},
  created() {
    this.initRouteData();
    // this.setDefaultOpenkeys();
  },
  mounted() {
    this.initSiderBarData();
  },
  watch: {
    menuSelectKeys(newValue) {
      // console.log("menuSelectKeys", newValue);
      // this.gotoPage(newValue[0]);
    }
  },
  destroyed() {},
  methods: {
    // 初始化路由数据
    initRouteData() {
      const [{ children: mainChildRoutes }] = routes.filter((route) => route?.meta?.key === "mainLayout");
      this.mainChildRoutes = mainChildRoutes;
      // this.routerData = this.setRouteComponent(mainChildRoutes, "originPath");
      this.routerData = this.setRouteComponent(mainChildRoutes);
      console.log(this.routerData);
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

    filterAddSiderBar(routeData) {
      return routeData
        .filter((item) => {
          return item.meta && item.meta.isAddSiderBar !== false;
        })
        .map((item) => {
          if (item.children) {
            item.children = this.filterAddSiderBar(item.children);
          }
          return item;
        });
    },
    // 判断是否是远端配置的路由路径，如果是，那么要动态导入对应的路由页面。
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

    setDefaultOpenkeys() {
      const selectSiderBarData = getSessionStorage("selectSiderBarData");
      if (selectSiderBarData) {
        selectSiderBarData.reverse();
        selectSiderBarData.pop();
        this.defaultOpenKeys = selectSiderBarData;
      } else {
        // 默认展开展开列表项 必须在未创建dom时配置 否则不生效
        this.defaultOpenKeys =
          this.routerData[0] && this.routerData[0].meta
            ? [this.routerData[0].meta.routeTitle]
            : [""];
      }
    },

    initSiderBarData() {
      const selectSiderBarData = getSessionStorage("selectSiderBarData");
      if (selectSiderBarData && Array.isArray(selectSiderBarData)) {
        // 默认列表选择项 必须在创建dom之后配置 否则watch监听跳转页面不生效
        this.menuSelectKeys = [selectSiderBarData[0]];
        // 初始化侧边栏数据
        this.selectSiderBarData = [
          ...this.menuSelectKeys,
          ...this.defaultOpenKeys
        ];
      } else {
        // 默认列表选择项 必须在创建dom之后配置 否则watch监听跳转页面不生效
        this.menuSelectKeys =
          this.routerData[0] && this.routerData[0].children
            ? [this.routerData[0].children[0].meta.routeTitle]
            : [""];
        // 初始化侧边栏数据
        this.selectSiderBarData = [
          ...this.menuSelectKeys,
          ...this.defaultOpenKeys
        ];
      }
    },

    gotoPage(routeKey) {
      console.log("routeKey", routeKey);
      const routeName = this.getRouteName(routeKey, this.routerData);
      // 存储当前选中的列表页和列表项 防止 移动端 pc端切换时丢失数据
      setSessionStorage("selectSiderBarData", this.selectSiderBarData);

      this.$router
        .push({
          name: routeName
        })
        .then(() => {
          // 面包屑的监听数据 必须在路由跳转之后进行发送
          // 否则面包屑组件中的监听 在组件未创建时无法进入触发监听函数
          this.menuBreadcrumbEmit(this.selectSiderBarData);
          // 如果是移动端 并且触发点击函数之后 侧边栏切换跳转页面 关闭drawer弹窗
        });
    },

    menuItemClick(e) {
      const { item: { title }, keyPath } = e;
      const pathTitle = [];
      keyPath.forEach(path => {
        pathTitle.push(this.getRouteTitle(this.mainChildRoutes, path));
      })
      console.log(title);
      console.log(" e.keyPath;", e.keyPath);
      console.log("pathTitle;", pathTitle);
      // this.isClickMenuItem = true;
      // this.selectSiderBarData = e.keyPath;
      // const [currentmenuSelectKey] = this.menuSelectKeys;
      // console.log("e", e);
      // console.log("menuSelectKeys", this.menuSelectKeys);
      // if (currentmenuSelectKey === this.selectSiderBarData[0]) {
      //   this.gotoPage(currentmenuSelectKey);
      // }
    },

    menuBreadcrumbEmit(siderBarData) {
      $Vue.$emit("menuBreadcrumb", siderBarData);
    },

    getRouteTitle(routes, name) {
      // name 是定义在menu组件上的key，我们使用的是name字段设置的，所以匹配route.name
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

    getRouteName(routeKey, route) {
      for (let i = 0; i < route.length; i++) {
        if (routeKey === route[i].meta.routeTitle) {
          return route[i].name;
        } else {
          const name = this.getRouteName(routeKey, route[i].children || []);
          if (name) {
            return name;
          }
        }
      }
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
