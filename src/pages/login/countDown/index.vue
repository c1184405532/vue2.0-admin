<template>
  <div class="count-down-box">
    <a-button
      :loading="loading"
      :disabled="disabled"
      class="count-down-btn"
      type="primary"
    >
      {{ verificationCodeText }}
    </a-button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    defaultText: {
      type: String,
      default: "获取验证码"
    },
    countDownSecond: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      verificationCodeText: "" // 获取验证码按钮文本信息
    };
  },
  computed: {
    disabled: function() {
      const isInProgress = this.verificationCodeText.indexOf("秒");
      return isInProgress !== -1;
    }
  },
  created() {
    this.queryOldStatus();
  },
  mounted() {},
  watch: {},
  methods: {
    // 刷新页面时查询是否存在上次状态
    queryOldStatus() {
      const currentDateSecond = Date.parse(new Date()) / 1000;
      const second = getLocalStorage("countDownSecond") - currentDateSecond;
      if (second && second > 0) {
        this.verificationCodeText = `${second}秒`;
        this.setCountDown();
      } else {
        this.verificationCodeText = this.defaultText;
        removeLocalStorage("countDownSecond");
      }
    },

    onClick() {
      const currentDateSecond = Date.parse(new Date()) / 1000;
      setLocalStorage(
        "countDownSecond",
        currentDateSecond + this.countDownSecond
      );
      const second = getLocalStorage("countDownSecond") - currentDateSecond;
      this.verificationCodeText = `${second}秒`;
      this.setCountDown();
    },

    setCountDown() {
      const currentDateSecond = Date.parse(new Date()) / 1000;
      const second = getLocalStorage("countDownSecond") - currentDateSecond;
      if (second <= 0) {
        removeLocalStorage("countDownSecond");
        this.verificationCodeText = this.defaultText;
        return;
      }
      setTimeout(() => {
        this.verificationCodeText = `${second}秒`;
        this.setCountDown();
      }, 1000);
    }
  }
};
</script>

<style scoped lang="less">
.count-down-box {
  display: inline-block;
  .count-down-btn {
    height: 45px;
    width: 124px;
    background: #ffffff;
    border: 1px solid #177fe2;
    border-radius: 4px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #177fe2;
  }
}
</style>
