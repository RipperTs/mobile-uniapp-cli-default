import $api from './api';

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
module.exports = {
    doLogin,
    getUrlKey,
    leftClick,
};
