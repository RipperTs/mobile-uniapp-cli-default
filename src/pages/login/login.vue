<template>
    <view class="container">
        <view class="wechatapp">
            <view class="header" v-if="hasUserInfo">
                <u-image :src="userInfo.avatarUrl" width="190" height="190"></u-image>
            </view>
        </view>
        <view class="auth-title">申请获取以下权限</view>
        <view class="auth-subtitle">获得你的公开信息（昵称、头像等）</view>
        <view class="login-btn">
            <button class="btn-normal" @click="getUserProfile()" lang="zh_CN">授权登录
            </button>
        </view>
        <view class="no-login-btn">
            <button class="btn-normal" @click="onNotLogin()">暂不登录</button>
        </view>
    </view>
</template>

<script>


export default {
    name: 'login',
    data() {
        return {
            options: {},
            userInfo: {},
            hasUserInfo: false,
            canIUseGetUserProfile: false,
            delta:0,
        };
    },
    onReachBottom() {

    },
    onLoad(options) {
        let _this = this;
        _this.delta = options.delta
    },

    onShow() {

    },

    methods: {

        // 获取用户信息
        getUserProfile(){
            let _this = this,
                loginInfo = {detail: {}};
            uni.getUserProfile({
                desc: '获取您的基础信息用户登陆和注册',
                lang: 'zh_CN',
                success: (res) => {
                    loginInfo.detail = res;
                    _this.userInfo = res.userInfo
                    _this.hasUserInfo = true
                    _this.doLogin(loginInfo, () => {
                        // 跳转回原页面
                        _this.onNavigateBack(1);
                    });
                }
            })
        },

        // 执行登录
        doLogin(e, callback){
            let _this = this;
            uni.showLoading({
                title: "正在登录",
                mask: true
            });
            // 执行微信登录
            uni.login({
                success(res) {
                    // 发送用户信息
                    _this.$api._post('auth/user/login', {
                        code: res.code,
                        user_info: e.detail.rawData,
                        encrypted_data: e.detail.encryptedData,
                        iv: e.detail.iv,
                        signature: e.detail.signature,
                        referee_id: uni.getStorageSync('referee_id')
                    }, result => {
                        // 记录token user_id
                        uni.setStorageSync('token', result.data.token);
                        uni.setStorageSync('user_id', result.data.user_id);
                        // 执行回调函数
                        callback && callback();
                    }, false, () => {
                        uni.hideLoading();
                    });
                }
            });
        },

        // 暂不登录
        onNotLogin(){
            let _this = this;
            uni.switchTab({
                url: '/pages/index/index'
            })
        },

        // 授权成功 跳转回原页面
        onNavigateBack(){
            uni.navigateBack({
                delta: Number(this.delta || 1)
            });
        },
    },
};
</script>

<style lang="scss" scoped>
page {
    background: #fff;
    font-size: 32rpx;
}

.container {
    padding: 0 60rpx;
}

.wechatapp {
    padding: 80rpx 0 48rpx;
    border-bottom: 1rpx solid #e3e3e3;
    margin-bottom: 72rpx;
    text-align: center;
}

.wechatapp .header {
    width: 190rpx;
    height: 190rpx;
    border: 2px solid #fff;
    margin: 0rpx auto 0;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 1px 0px 5px rgba(50, 50, 50, 0.3);
}

.auth-title {
    color: #585858;
    font-size: 34rpx;
    margin-bottom: 40rpx;
}

.auth-subtitle {
    color: #888;
    margin-bottom: 88rpx;
    font-size: 28rpx;
}

.login-btn {
    padding: 0 20rpx;
}

.login-btn button {
    height: 88rpx;
    line-height: 88rpx;
    background: #04be01;
    color: #fff;
    font-size: 30rpx;
    border-radius: 999rpx;
    text-align: center;
}

.no-login-btn {
    margin-top: 20rpx;
    padding: 0 20rpx;
}

.no-login-btn button {
    height: 88rpx;
    line-height: 88rpx;
    background: #dfdfdf;
    color: #fff;
    font-size: 30rpx;
    border-radius: 999rpx;
    text-align: center;
}

</style>
