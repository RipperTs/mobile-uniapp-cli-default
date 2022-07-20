import $api from './api';
import wx from 'weixin-js-sdk'

// 去登录
const doLogin = (delta) => {
    // 跳转授权页面
    // #ifdef MP-WEIXIN
    uni.navigateTo({
        url: "/pages/login/login?delta=" + (delta || 1)
    });
    // #endif

    // #ifdef H5
    uni.navigateTo({
        url: "/pages/login/login_h5?delta=" + (delta || 1)
    });
    // #endif
}


const getUrlKey = (name) => {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
}

// 全局返回键操作
const leftClick = () => {
    if (getCurrentPages().length > 1) {
        uni.navigateBack()
    } else {
        uni.switchTab({
            url: '/pages/index/index'
        })
    }
}

// 微信工具初始化
const wechatUtil = (resolve, reject) => {
    $api._get('official/wechatUtil', {
        url: window.location.href
    }, res => {
        if (res.data.appId) {
            wx.config({
                debug: false,
                appId: res.data.appId,
                timestamp: res.data.timestamp,
                nonceStr: res.data.nonceStr,
                signature: res.data.signature,
                jsApiList: res.data.jsApiList
            })
            wx.ready(res => {
                // 微信SDK准备就绪后执行的回调。
                resolve && resolve(wx, res)
            })
        } else {
            reject && reject(res)
        }
    })
}

module.exports = {
    doLogin,
    getUrlKey,
    leftClick,
    wechatUtil,
};
