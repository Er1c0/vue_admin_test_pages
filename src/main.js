import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import store from "./store/index";
import Authorized from "./components/Authorized";
import Auth from "./directives/auth";

// // Ant 组件全部引入
// import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.less";
// // 如果使用插件按需加载，则需要配置名字
// Vue.use(Antd);

// // Ant 组件按需引入，比如引入 button
// import Button from "ant-design-vue/lib/button";
// import "ant-design-vue/lib/button/style";
// Vue.use(Button);

// Ant 组件使用插件按需加载  // https://ant.design/docs/react/introduce-cn
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select,
  Table,
} from "ant-design-vue";
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(Table);
Vue.use(ElementUI);
Vue.component("Authorized", Authorized);
Vue.use(Auth);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
