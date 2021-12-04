import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import qs from 'qs';
import ElementUI from 'element-ui'
Vue.use(ElementUI)
Vue.config.productionTip = false

var axio = axios.create({
  baseURL:"http://localhost:7999/home/",
  headers:{
    'Content-Type': 'application/json;charset=UTF-8'
  },
  withCredentials:true,
  crossDomain: true,
});

// axios.defaults.baseURL = "http://127.0.0.1:7999/home/"
// axios.defaults.withCredentials = true;
// axios.defaults.crossDomain = true;

Vue.prototype.$axios = axio
Vue.prototype.$qs = qs;
Vue.use(VueAxios, axios);
let myDateFormat = function(fmt, date) {
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
          .length)));
  return fmt;
};
Vue.prototype.$fmt = myDateFormat;

new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App),
})