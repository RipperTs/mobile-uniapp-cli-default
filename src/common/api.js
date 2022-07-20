import {baseUrl} from '@/config';
import common from './index';

/**
 * 获取get请求
 * @param url
 * @param data
 * @param success
 * @param fail
 * @param complete
 * @private
 */
const _get = (url, data, success, fail, complete) => {
    uni.showNavigationBarLoading();
    let _this = this;
    // 构造请求参数
    data = data || {};
    uni.request({
        url: baseUrl + url,
        header: {
            'content-type': 'application/json',
            'token': uni.getStorageSync('token')
        },
        data: data,
        success(res) {
            if (res.statusCode !== 200 || typeof res.data !== 'object') {
                console.log(res);
                uni.showModal({
                    title: '友情提示',
                    content: '网络请求出错',
                    showCancel: false,
                });
                return false;
            }
            if (res.data.error_code === 401) {
                // 登录态失效, 重新登录
                uni.hideNavigationBarLoading();
                common.doLogin(2);
            } else if (res.data.error_code !== 0) {
                uni.showModal({
                    title: '友情提示',
                    content: res.data.message,
                    showCancel: false,
                    success(res) {
                        fail && fail(res);
                    }
                });
                return false;
            } else {
                success && success(res.data);
            }
        },
        fail(res) {
            uni.showModal({
                title: '友情提示',
                content: res.errMsg,
                showCancel: false,
                success(res) {
                    fail && fail(res);
                }
            });
        },
        complete(res) {
            uni.hideNavigationBarLoading();
            complete && complete(res);
        },
    });
}


const _post = (url, data, success, fail, complete, isShowNavBarLoading) => {
    isShowNavBarLoading || true;
    if (isShowNavBarLoading === true) {
        uni.showNavigationBarLoading();
    }
    uni.request({
        url: baseUrl + url,
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': uni.getStorageSync('token'),
        },
        data: data,
        method: 'POST',
        success(res) {
            if (res.statusCode !== 200 || typeof res.data !== 'object') {
                console.log(res);
                uni.showModal({
                    title: '友情提示',
                    content: '网络请求出错',
                    showCancel: false,
                });
                return false;
            }
            if (res.data.error_code === 401) {
                // 登录态失效, 重新登录
                uni.hideNavigationBarLoading();
                common.doLogin(2);
            } else if (res.data.error_code !== 0) {
                uni.showModal({
                    title: '友情提示',
                    content: res.data.message,
                    showCancel: false,
                    success(res) {
                        fail && fail(res);
                    }
                });
                return false;
            }
            success && success(res.data);
        },
        fail(res) {
            uni.showModal({
                title: '友情提示',
                content: res.errMsg,
                showCancel: false,
                success(res) {
                    fail && fail(res);
                }
            });
        },
        complete(res) {
            uni.hideNavigationBarLoading();
            complete && complete(res);
        },
    });
}

module.exports = {
    _get,
    _post,
};
