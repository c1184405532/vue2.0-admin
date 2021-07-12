<template>
  <a-sub-menu v-bind="$props" v-on="$listeners">
    <span slot="title">
      <img v-if="menu.meta.img" :src="menu.meta.img" class="_siderbar-img-icon"/>
      <a-icon :type="menu.meta.icon" v-else/>
      <span>{{ menu.meta.title }} </span>
    </span>
    <template v-for="item in menu.children">
      <a-menu-item v-if="!item.children" :key="item.name">
        <img v-if="item.meta.img" :src="item.meta.img" class="_siderbar-img-icon"/>
        <a-icon :type="item.meta.icon" v-else/>
        <span>{{ item.meta.title }} </span>
      </a-menu-item>
      <SubMenu v-else :key="item.name" :menu="item" />
    </template>
  </a-sub-menu>
</template>

<script>
import SubMenu from "./subMenu.vue";
import { Menu } from "ant-design-vue";
export default {
  components: {
    SubMenu
  },
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    menu: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  destroyed() {},
  methods: {}
};
</script>
