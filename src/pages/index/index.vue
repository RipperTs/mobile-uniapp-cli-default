<template>
  <view>
    hello {{ name }}
    <u--image :src="avatarUrl" width="190" height="190"></u--image>
    <w-loading :mask="false"/>
    <svg-icon icon-class="home" size="22px" color="#ff5656"/>
  </view>
</template>

<script>


export default {
  name: 'index',
  data() {
    return {
      name: '',
      avatarUrl: '',
      showLoading: false,
    };
  },
  onReachBottom() {

  },
  onLoad(options) {

  },
  onShareAppMessage(res) {
  },
  onShow() {
    this.test()
  },

  methods: {
    test() {
      let _this = this
      this.$loading();
      this.$api._get('customer/detail', {}, res => {
        console.log(res)
        _this.name = res.data.detail.nickname
        _this.avatarUrl = res.data.detail.head_img
      }, false, () => {
        this.$loading(false);
      })
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
