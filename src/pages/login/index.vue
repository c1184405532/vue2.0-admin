<template>
  <div class="login-layout">
    <div class="login-content-box">
      <div class="login-conent">
        <div class="main-box">
          <div class="main-title">后台管理系统</div>
          <a-form class="from-box" layout="horizontal" :form="form">
            <a-form-item>
              <a-input v-decorator="['userAccount',{ rules: [{ required: true, message: userAccountMessage }] }]"
                class="input-box"
                placeholder="请输入账号"
              >
                <img class="input-icon" slot="prefix" src="@/assets/images/phone_icon.png" alt=""/>
                <a-icon type="user" style="color: rgba(0, 0, 0, 0.25)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="['verificationCode',{rules: [{ required: true, message: verificationCodeMessage }] }]"
                style="width: 180px"
                class="input-box verification-input"
                placeholder="验证码"
              >
                <img class="input-icon" slot="prefix" src="@/assets/images/verification_icon.png" alt=""/>
              </a-input>
              <CountDown
                @click.native="getVerificationCode"
                :loading="countDownLoading"
                ref="countDownRef"
              />
            </a-form-item>
          </a-form>
          <a-button
            @click="handSubmit"
            :loading="submitLoading"
            class="submit-btn"
            type="primary"
          >
            登录
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountDown from "./countDown/index";
// import { setUserMessage } from "@/utils/index";
// import { getLoginUserMessage } from "@/pages/server";
import { login } from "./server";
// eslint-disable-next-line
import { publicKey, privateKey } from "./const";
// import { isSetOriginRouter } from "@/router/const";

export default {
  name: "login",
  components: {
    CountDown
  },
  props: {},
  data() {
    return {
      submitLoading: false,
      form: this.$form.createForm(this, { name: "horizontal_login" }),
      userAccountMessage: "请输入账号",
      verificationCodeMessage: "请输入验证码",
      countDownLoading: false
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.queryToken();
  },
  watch: {},
  methods: {
    queryToken() {
      const token = getToken();
      if (token) {
        console.log("token", token)
        // this.$router.replace({ name: "/layout" });
      }
    },
    handSubmit() {
      this.form.validateFields("", {}, async(error, values) => {
        if (!error) {
          const payload = {
            phoneNumber: values.userAccount,
            verifyCode: values.verificationCode
          };

          this.submitLoading = true;
          setTimeout(() => {
            this.$router.replace({ name: "mainLayout/order/repair" });
            this.submitLoading = false;
          }, 1500)
          console.log(payload);
          // await this.login(payload);
          // const token = getToken();

          // if(token){
          //   await this.getUserMenu();
          //   await this.getLoginUserMessage();
          //   this.setAuthRoutes();
          //   setTimeout(()=>{
          //     this.$router.replace({name: "/layout"});
          //   },200)
          // }
        }
      });
    },

    setAuthRoutes() {
      // 设置远端动态路由
      // if(isSetOriginRouter){
      // const userMenu = getLocalStorage("userMenuData");
      // const userMenuObj = this.menuStringToObj(userMenu);
      // const filterSiderBarData = this.filterSiderBar(userMenuObj);
      // this.addRoutes(filterSiderBarData,`/layout`);
      // }
    },

    login(payload = {}) {
      return login({ data: { ...payload } })
        .then((res) => {
          if (res && res.token) {
            window.setToken(res.token);
          }
        })
        .catch((err) => {
          console.error(err);
          // this.$message.warning(err.message || "登录失败!")
        });
    },
    // getLoginUserMessage(){
    //   return getLoginUserMessage()
    //     .then(res => {
    //       if(res){
    //         //setUserMessage(res);
    //       }
    //     })
    //     .catch(err => {
    //       this.$message.warning(err.message || "获取用户信息失败！")
    //     })
    // },

    // getUserMenu () {
    //   return getUserMenu()
    //     .then(userMenu => {
    //       console.log(userMenu);
    //       if (userMenu) {
    //         setLocalStorage("userMenuData", userMenu);
    //       }
    //     })
    //     .catch(err => {
    //       this.$message.warning(err.message || "获取用户菜单失败！")
    //     })
    // },

    getVerificationCode() {
      const { form } = this;
      form.validateFields(["userAccount"], {}, async(error, values) => {
        if (!error) {
          this.countDownLoading = true;
          try {
            const result = await this.simulatedLogin();
            if (result.success) {
              this.$refs.countDownRef.onClick();
              this.$message.info("验证码已发送，请查收！");
            }
          } finally {
            this.countDownLoading = false;
          }
        }
      });
    },

    simulatedLogin() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true })
        }, 1000)
      });
    }

    // addRoutes (routes, parentName) {
    //   setTimeout(() => {
    //     routes.forEach(route => {
    //       if (Array.isArray(route.children)) {
    //         this.addRoutes(route.children, route.name);
    //       }
    //       vm.$router.addRoute(parentName, route);
    //     })
    //   })
    // },

    // filterSiderBar(menus = []){
    //   return menus.filter(item => {
    //     return item.config.meta && item.config.meta.isAddSiderBar !== false;
    //   })
    //   .map(item => {
    //     if (item.children) {
    //       item.children = this.filterSiderBar(item.children);
    //     }
    //     return {
    //       ...item.config,
    //       component: () => import(`@/${item.config.component}`),
    //       children:item.children.length > 0 ? item.children : []
    //     };
    //   })
    // },

    // menuStringToObj (menus) {
    //   return menus.map(menu => {
    //     return {
    //       ...menu,
    //       config: JSON.parse(menu.config),
    //       children: Array.isArray(menu.children) ? this.menuStringToObj(menu.children) : []
    //     }
    //   })
    // }
  }
};
</script>
<style lang="less">
.login-layout {
  .input-box .ant-input {
    padding-left: 48px !important;
    font-size: 16px;
    color: #003333;
    height: 45px;
  }
}
</style>
<style scoped lang="less">
.login-layout {
  background-image: url("../../assets/images/login_bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  overflow: auto;
  .login-content-box {
    height: 100%;
    min-width: 1300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-conent {
    width: 920px;
    height: 500px;
    display: flex;
    .main-box {
      flex: 1;
      background: rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 8px;
      .main-title {
        margin-top: 70px;
        margin-bottom: 40px;
        font-size: 32px;
        font-weight: bold;
        color: #177fe2;
        text-align: center;
      }
      .from-box {
        width: 320px;
        .input-box {
          height: 45px;
          margin-top: 6px;
          .input-icon {
            margin-top: 2px;
          }
        }
        .verification-input {
          width: 210px;
          margin-right: 16px;
        }
        .ant-form-item-with-help{
          padding-bottom: 20px;
          //margin-top: 5px;
        }
      }
      .submit-btn {
        margin-top: 12px;
        width: 320px;
        height: 45px;
        background: linear-gradient(0deg, #188cc3, #166cd7);
        border: 1px solid #2c93cf;
        border-radius: 4px;
        font-size: 18px;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
}
.input_style {
  margin-top: 20px;
}
.login_box {
  width: 300px;
  margin: auto;
  //margin-top: 160px;
}
</style>
