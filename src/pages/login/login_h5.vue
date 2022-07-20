<template>
    <div></div>
</template>

<script>
export default {
    name: 'login_h5',

    created() { // 视图加载前执行
        const _this = this
        if (uni.getStorageSync('token')) {
            _this.$router.push('/')
            return false
        }
        if (!uni.getStorageSync('token') || !uni.getStorageSync('user_id')) {
            const code = _this.$common.getUrlKey('code')
            code ? _this.userLogin(code) : _this.getCode()
            return false
        }
    },
    mounted() {
        const _this = this
        _this.path = uni.getStorageSync('currentPage')
    },
    methods: {
        /**
         * 引导用户进入授权页面同意授权，获取登录需要用的code
         */
        getCode: function () {
            const _this = this
            _this.$api._post('official/getCode', {}, res => {
                window.location.href = res.data.result
            })
        },

        /**
         * 用code到后台登录，并换取token
         * @param code
         */
        userLogin: function (code) {
            const _this = this
            uni.showLoading({
                title: "正在登录",
                mask: true
            });
            _this.$api._post('official/login', {
                code: code
            }, result => {
                uni.setStorageSync('token', result.data.token);
                uni.setStorageSync('user_id', result.data.user_id);
                uni.showToast({
                    title: '登录成功',
                    success() {
                        _this.onNavigateBack()
                    }
                });
            }, false, () => {
                uni.hideLoading();
            })
        },

        // 授权成功 跳转回原页面
        onNavigateBack() {
            uni.navigateBack({
                delta: Number(this.delta || 1)
            });
        },
    }
}
</script>

<style scoped>

</style>
