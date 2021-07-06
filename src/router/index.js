import Vue from "vue"
import VueRouter from "vue-router"
// import Home from "@/views/Home.vue"
const Login = () => import(/* webpackChunkName: "login" */ "@/pages/login/index.vue");
const RepairOrderAssignment = () => import(/* webpackChunkName: "about" */ "../views/About.vue");
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
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: RepairOrderAssignment
  }
]

const router = new VueRouter({ routes });

export default router
