<template>
  <div class="_header-bar-box">
    <div class="left" @click="toggleClick">
      <a-icon
        :style="{ fontSize: '20px' }"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        class="menu"
      />
    </div>
    <div class="right">
      <a-dropdown overlayClassName="_user-overlay-box">
        <span class="user-drop-box">
          <img :src="userData.avatar" alt="" class="user-avatar" />
          <div class="user-name">{{ userData.name }}</div>
        </span>
        <a-menu slot="overlay">
          <a-menu-item
            v-for="(value, index) in userData.list"
            :key="index"
          >
            <a-icon :type="value.icon" />
            <span>{{ value.text }}</span>
          </a-menu-item>
          <a-divider class="divider-style" />
          <a-menu-item @click="logout">
            <a-icon type="logout" />
            <span>退出登录</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    /**
     * @param { String } name 用户名
     * @param { String } avatar 头像地址
     * @param { Array } list [{icon:"",text:""}] 下拉菜单项
     */
    userData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return { };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    logout() {
      window.removeToken();
      removeSessionStorage("selectSiderBarData");
      this.$router.replace({ name: "login" });
    }
  }
};
</script>

<style scoped lang="less">
._header-bar-box {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  justify-content: space-between;
  .left {
    display: flex;
    cursor: pointer;
    align-items: center;
    .logo {
      height: 32px;
      width: 32px;
      border-radius: 8px;
      margin-left: 24px;
    }
    .menu {
      padding: 0 24px;
    }
  }
  .right {
    display: flex;
    padding-right: 24px;
    .user-drop-box {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0 12px;
      transition: all 0.3s;
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
      .user-avatar {
        height: 32px;
        width: 32px;
        border-radius: 50%;
        margin-right: 8px;
      }
      .user-name {
        font-size: 14px;
      }
    }
  }
}

</style>
<style lang="less">
._user-overlay-box{
  .divider-style {
    margin-top: 6px;
    margin-bottom: 6px;
  }
}

</style>
