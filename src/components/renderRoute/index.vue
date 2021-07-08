<template>
  <router-view />
</template>

<script>
// 配置一个空组件 用于挂载多层children路由
// 此文件是由于多层嵌套子路由 父级路由必须要有component指向，且需要<router-view/>，才能匹配嵌套路由。
// 官方文档：https://router.vuejs.org/zh/guide/essentials/nested-routes.html
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="less"></style>
