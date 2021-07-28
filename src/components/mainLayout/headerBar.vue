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
      <a-dropdown overlayClassName="user_drop_box" class="user_drop_box">
        <div class="user_content">
          <img :src="userData.avatar" alt="" class="user_avatar" />
        </div>
        <a-menu slot="overlay">
          <a-menu-item
            v-for="(value, index) in userData.list"
            :key="index"
            class="user_list_box"
          >
            <a-icon :type="value.icon" />
            <span class="user_list_text">{{ value.text }}</span>
          </a-menu-item>
          <a-divider class="divider_style" />
          <a-menu-item class="user_list_box" @click="logout">
            <a-icon type="logout" />
            <span class="user_list_text">退出登录</span>
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
    // 用户数据
    userData: {
      type: Object,
      default: function() {
        return {};
      }
      /*
      数据格式
      {
          name:'陈禹廷',//用户名
          avatar:require('@/assets/avatar.jpg'),//用户头像
          list:[
              //icon 列表icon text 列表文字  routeName 点击列表跳转的页面 是name 不是path
              {icon:'user',text:'个人中心',routeName:''}
          ]
      }
  */
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
      this.$router.replace({
        name: "user/login"
      });
      console.log("退出登录");
    }
  }
};
</script>

<style scoped lang="less">
._header-bar-box {
  position: relative;
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
    height: 100%;
    display: flex;
    padding-right: 24px;
  }
  .message {
    height: 100%;
    cursor: pointer;
    margin-right: 12px;
    width: 50px;
    padding: 0 6px 0 6px;
    .notice {
      color: #666;
      background: none;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .user_drop_box {
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 12px;
    transition: all 0.3s;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
    .user_content {
      height: 100%;
    }
  }
}
.user_avatar {
  height: 32px;
  width: 32px;
  border-radius: 50%;
  margin-right: 8px;
}
.notice_box {
  height: 100%;
  display: inline-block;
}
.user_name {
  font-size: 14px;
}
.divider_style {
  margin-top: 6px;
  margin-bottom: 6px;
}
</style>
<style lang="less">
.user_drop_box {
  .user_list_box {
    display: flex;
    align-items: center;
    padding-right: 24px;
  }
}

.header_message_box {
  .ant-tabs-nav .ant-tabs-tab {
    padding: 12px 4px;
  }
  .ant-dropdown-content {
    padding: 0;
  }
  @media (min-width: 596px) {
    .tabs_box {
      width: 336px;
      border-radius: 0;
    }
  }
  .ant-tabs-bar {
    margin: 0;
  }
  @media (max-width: 596px) {
    .ant-dropdown-menu {
      border-radius: 0;
    }
  }
  @media screen and (max-width: 480px) {
    width: 100% !important;
  }

  .message_list_box {
    //width: 336px;
    .message_list {
      padding: 12px 24px;
      border-bottom: 1px solid #f0f0f0;
      transition: all 0.3s;
      cursor: pointer;
      .ant-list-item {
        margin-bottom: 0;
      }
      &:hover {
        background: #e6f7ff;
      }
    }
    .ant-list-footer {
      padding: 0;
    }
    .list_footer {
      display: flex;
      height: 46px;
      width: 100%;
      .item {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:nth-child(2) {
          border-left: 1px solid #f0f0f0;
        }
      }
    }
  }
}
</style>
