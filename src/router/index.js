import Vue from "vue"
import VueRouter from "vue-router"
// import Home from "@/views/Home.vue"
const Login = () => import(/* webpackChunkName: "login" */ "@/pages/login/index.vue");
const MainLayout = () => import(/* webpackChunkName: "mainLayout" */ "@/components/mainLayout/index.vue");
const RenderRoute = () => import(/* webpackChunkName: "mainLayout" */ "@/components/renderRoute/index.vue");
// const RepairOrderAssignment = () => import(/* webpackChunkName: "about" */ "../views/About.vue");
Vue.use(VueRouter);
console.log(`55`);
const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/mainLayout",
    name: "mainLayout",
    component: MainLayout,
    meta: { key: "mainLayout" },
    children: [
      {
        path: "order",
        name: "mainLayout/order",
        component: RenderRoute,
        meta: { title: "订单管理", icon: "mail" },
        children: [
          {
            path: "repair",
            name: "mainLayout/order/repair",
            component: RenderRoute,
            meta: { title: "维修订单", icon: "mail" }
          }
        ]
      },
      {
        path: "auth",
        name: "mainLayout/auth",
        component: RenderRoute,
        meta: { title: "权限管理", icon: "mail" }
      },
      {
        path: "systemSettings",
        name: "mainLayout/systemSettings",
        component: RenderRoute,
        meta: { title: "系统设置", icon: "mail" }
      }
    ]
  }
]

const router = new VueRouter({ routes });

export default router;
export {
  routes
}
