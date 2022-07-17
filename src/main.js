import Vue from 'vue'
import store from "./store";
import App from './App'
import uView from "uview-ui";
import apis from './common/api';
import wLoading from "components/w-loading/w-loading.vue"

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
// vue原型挂载 - 请求接口函数
Vue.prototype.$api = apis;
//挂在到Vue原型链上
Vue.prototype.$store = store;

//是否显示加载中 的方法 调用store中的mutations方法
Vue.prototype.$loading = function loading(tf) {
    if (tf) {
        store.commit("switch_loading", tf)
    } else {
        store.commit("switch_loading")
    }
};

//全局返回键操作
Vue.prototype.$leftClick = function leftClick() {
    if (getCurrentPages().length > 1) {
        uni.navigateBack()
    } else {
        uni.redirectTo({
            url: '/pages/index/index'
        })
    }
};

App.mpType = 'app'
const app = new Vue({
    ...App
})

app.$mount()

