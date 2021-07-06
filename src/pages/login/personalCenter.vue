<template>
  <div class="personal-center-box base-list-layout">
    <div class="list-box" v-for="user in userData" :key="user.label">
      <div class="content">{{ user.label }}{{ user.content }}</div>
    </div>
    <div class="list-box" v-if="avatar">
      <div class="content">头像：</div>
      <img class="avatar" :src="avatar" alt="">
    </div>
    <div class="edit-box">
      <a-button type="primary" @click="modalVisible = true">编辑</a-button>
    </div>
    <a-modal
      v-model="modalVisible"
      @ok="handleOk"
      :destroyOnClose="true"
      :maskClosable="false"
      title="编辑个人信息"
    >
      <a-form :form="form" :layout="formLayout">
        <a-form-item
          v-for="formItem in formItems"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="formItem.label"
          :key="formItem.key"
        >
          <a-input
            v-decorator="[
              formItem.key,
              { initialValue: formItem.defaultValue, rules: formItem.rules },
            ]"
            :disabled="formItem.disabled"
            :placeholder="formItem.placeholder"
          />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :required="false"
          label="用户头像"
        >
          <UploadImg
            :onChange="getFileList"
            :files="avatarImgs"
            size="2"
            maxNum="1"
            uploadTitle="上传头像"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import UploadImg from "@/components/uploadImg/index";
import { getLoginUserMessage } from "@/pages/server";
// eslint-disable-next-line
import { setUserMessage } from "@/utils/index";
export default {
  components: {
    UploadImg
  },
  props: {},
  data() {
    return {
      form: this.$form.createForm(this, { name: "createForm/personalCenter" }),
      formLayout: "horizontal",
      labelCol: { span: 5, offset: 0 },
      wrapperCol: { span: 18, offset: 0 },
      modalVisible: false,
      formItems: [],
      userData: [],
      avatarImgs: [],
      avatar: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    this.initFormItems();
    this.initUserData();
  },
  mounted() {},
  destroyed() {},
  methods: {

    initUserData() {
      getLoginUserMessage()
        .then(res => {
          console.log(res)
          const { userName, origin, identityCardName, userPriv, entryTime, mobilNo, mobilNo1, mobilNo2, userImgUrl } = res;
          this.avatar = userImgUrl;
          this.userData = [
            { label: "姓名：", content: identityCardName },
            { label: "昵称：", content: userName },
            { label: "登录手机号：", content: mobilNo },
            { label: "其他手机号1：", content: mobilNo1 },
            { label: "其他手机号2：", content: mobilNo2 },
            { label: "籍贯：", content: origin },
            { label: "角色：", content: userPriv },
            { label: "入职时间：", content: entryTime }
          ]
        })
    },

    handleOk() {
      const { form } = this;
      form.validateFields((errors, values) => {
        if (!errors) {
          const payload = {
            ...values
          };
          this.modalVisible = false;
          console.log("payload", payload);
        }
      })
    },

    getFileList(files) {
      console.log("files", files);
      this.shopImgs = files
    },

    initFormItems() {
      this.formItems = [
        {
          label: "姓名",
          key: "menuName",
          type: "input",
          defaultValue: "",
          placeholde: "",
          disabled: false,
          rules: [{ required: true, message: "请输入姓名" }]
        },
        {
          label: "岗位",
          key: "position",
          type: "input",
          defaultValue: "",
          placeholde: "",
          disabled: false,
          rules: [{ required: true, message: "请输入岗位" }]
        }
      ];
    }
  }
};
</script>
<style scoped lang='less'>
  .personal-center-box{
    padding: 0 24px;
    .list-box{
      padding: 10px 0;
      display: flex;
      align-items: center;
      .avatar{
        height: 60px;
        width: 60px;
        border-radius: 50%;
      }
    }
    .edit-box{
      padding: 10px 0;
    }
  }
</style>
