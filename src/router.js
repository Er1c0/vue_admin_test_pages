import Vue from "vue";
import Router from "vue-router";
import findLast from "lodash/findLast";
import { notification } from "ant-design-vue";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "./views/404";
import Forbidden from "./views/403";
import { check, isLogin } from "./utils/auth";
Vue.use(Router);
/**
 * 安装 npm i nprogress 库，主要优化用户体验
 * 路由守卫: vue-router 提供在路由切换时的沟子，即切换触发事件
 * 使用路由守卫，不能进行直接导出
 */

const router = new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      // 标志位，是否显示在菜单上
      hideInMenu: true,
      // // 必须需要挂载，否则下面路径无法访问
      // component: { render: h => h("router-view") },
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout.vue"),
      children: [
        {
          path: "/user",
          // 重定向
          redirect: "/user/login",
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Login.vue"),
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Register.vue"),
        },
      ],
    },
    {
      path: "/",
      meta: { authority: ["k", "admin"] },
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout.vue"),
      children: [
        // dashboard 仪表盘
        {
          path: "/",
          redirect: "/dashboard/analysis",
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: { icon: "dashboard", title: "表单" },
          component: { render: (h) => h("router-view") },
          children: [
            {
              path: "/form/basic-form",
              name: "basicform",
              meta: { title: "列表页" },
              component: () =>
                import(
                  /* webpackChunkName: "form" */ "./views/Forms/ListPage.vue"
                ),
            },
            {
              hideInMenu: true,
              path: "/dashboard/analysis",
              name: "analysis",
              meta: { title: "详情页" },
              component: () =>
                import(
                  /* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis.vue"
                ),
            },
          ],
        },
        // from 表单
        // {
        //   path: "/form",
        //   name: "form",
        //   component: { render: (h) => h("router-view") },
        //   meta: { icon: "form", title: "表单", authority: ["admin"] },
        //   children: [
        //     {
        //       path: "/form/basic-form",
        //       name: "basicform",
        //       meta: { title: "基础表单" },
        //       component: () =>
        //         import(
        //           /* webpackChunkName: "form" */ "./views/Forms/BasicForm.vue"
        //         ),
        //     },
        //     // {
        //     //   path: "/form/step-form",
        //     //   name: "stepform",
        //     //   hideChildrenInMenu: true,
        //     //   meta: { title: "分布表单" },
        //     //   component: () =>
        //     //     import(
        //     //       /* webpackChunkName: "form" */ "./views/Forms/StepForm/index.vue"
        //     //     ),
        //     //   children: [
        //     //     { path: "/form/step-form", redirect: "/form/step-form/info" },
        //     //     {
        //     //       path: "/form/step-form/info",
        //     //       name: "info",
        //     //       component: () =>
        //     //         import(
        //     //           /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1.vue"
        //     //         ),
        //     //     },
        //     //     {
        //     //       path: "/form/step-form/confirm",
        //     //       name: "confirm",
        //     //       component: () =>
        //     //         import(
        //     //           /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2.vue"
        //     //         ),
        //     //     },
        //     //     {
        //     //       path: "/form/step-form/result",
        //     //       name: "result",
        //     //       component: () =>
        //     //         import(
        //     //           /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3.vue"
        //     //         ),
        //     //     },
        //     //   ],
        //     // },
        //   ],
        // },
      ],
    },
    {
      path: "/403",
      name: "403",
      hideInMenu: true,
      component: Forbidden,
    },
    // {
    //   path: "*",
    //   redirect: "/user/login",
    //   name: "404",
    //   hideInMenu: true,
    //   // component: NotFound
    // },
  ],
});

// 安装 npm i nprogress 库，主要优化用户体验
/**
 * to 将要到达的路由
 * form 当前的路由
 * next 继续下一步。必须调用才会执行下一步
 */
// 开始执行事件
router.beforeEach((to, form, next) => {
  if (to.path !== form.path) {
    Nprogress.start();
  }
  const record = findLast(to.matched, (record) => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login",
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "无权限访问",
      });
      next({
        path: "/user/login",
      });
    }
    Nprogress.done();
  }
  next();
});
// 执行完成结束事件
router.afterEach(() => {
  Nprogress.done();
});
export default router;
