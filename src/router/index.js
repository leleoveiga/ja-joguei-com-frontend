import Vue from "vue";
import VueRouter from "vue-router";
import Home from "views/Home.vue";
import Builds from "views/Builds.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home,
      name: "Home"
    },
    {
      path: "/builds",
      component: Builds,
      name: "Builds"
    },
    {
      path: "/:catchAll(.*)",
      component: Home,
      name: "Home"
    }
  ]
});

export default router;
