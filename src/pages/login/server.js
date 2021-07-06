import request from "@/request/index"
const getOssSignature = ({ data = {}, requestToastConfig = { startType: false } } = {}) => {
  return request.get("oss/signature", {
    data: { ...data },
    requestToastConfig: { ...requestToastConfig }
  })
}

const getVerificationCode = ({ data = {}, requestToastConfig = { startType: false } } = {}) => {
  return request.post("adminUser/verifyCode", {
    data: { ...data },
    requestToastConfig: { ...requestToastConfig }
  })
}

const login = ({ data = {}, requestToastConfig = { startType: false } } = {}) => {
  return request.post("adminUser/smsLogin", {
    data: { ...data },
    requestToastConfig: { ...requestToastConfig }
  })
}

// 获取用户权限菜单树
const getUserMenu = ({ data = {}, requestToastConfig = { startType: false } } = {}) => {
  return request.get("authResource/getMineTree", {
    data: { ...data },
    requestToastConfig: { ...requestToastConfig }
  })
}

export {
  getOssSignature,
  getVerificationCode,
  login,
  getUserMenu
}
