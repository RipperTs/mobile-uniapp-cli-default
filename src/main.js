import Vue from 'vue'
import store from "./store";
import App from './App'
import uView from "uview-ui";
import apis from './common/api';
import common from './common/index';
import wLoading from "components/w-loading/w-loading.vue"
import wx from 'weixin-js-sdk'

Vue.component('w-loading', wLoading)
Vue.use(uView);
uni.$u.setConfig({
    // 修改$u.config对象的属性
    config: {
        // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
        unit: 'rpx'
    },
    // 修改$u.props对象的属性
    props: {
        // 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
        radio: {
            size: 15
        }
        // 其他组件属性配置
        // ......
    }
})

Vue.config.productionTip = false
// vue原型挂载
Vue.prototype.$api = apis;
Vue.prototype.$common = common;
Vue.prototype.$store = store;

//是否显示加载中 的方法 调用store中的mutations方法
Vue.prototype.$loading = function loading(tf) {
    if (tf) {
        store.commit("switch_loading", tf)
    } else {
        store.commit("switch_loading")
    }
};

App.mpType = 'app'
const app = new Vue({
    ...App
})

app.$mount()

