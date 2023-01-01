<template>
    <div>

    </div>
</template>

<script>
export default {
    components: { },
    data() {
        return {

        }
    },
    computed: { },
    watch: { },
    created() {

    },
    mounted() {
        let _this = this;

    },
    methods: {

        // 微信支付小程序
        payNowWechat() {
            let _this = this;
            if (_this.money == '' || _this.money <= 0) {
                uni.showToast({
                    title: '请输入支付金额',
                    icon: 'none'
                });
                return;
            }
            uni.showLoading({
                title: '支付中...',
                mask: true
            });
            _this.$api._post('order/pay', {
                mid: _this.mid,
                money: _this.money
            }, res => {
                const payResponese = res.data || {};
                uni.requestPayment({
                    provider: 'wxpay',
                    ...payResponese,
                    success() {
                        uni.showModal({
                            title: '友情提示',
                            content: '支付成功!',
                            showCancel: false,
                            success(res) {
                                uni.switchTab({
                                    url: '/pages/my/index'
                                });
                            }
                        });
                    },
                });
            }, false, () => {
                uni.hideLoading();
            });
        },
    },

    //切记页面销毁需要销毁
    destroyed() {
        let _this = this
    },
}
</script>
<style lang="scss" scoped>

</style>
