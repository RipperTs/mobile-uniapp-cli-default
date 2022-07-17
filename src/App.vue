<script>
export default {
    onLaunch: function () {
    },
    onShow: function () {
        console.log('App Show')
        // #ifdef MP-WEIXIN
        // 小程序主动更新
        const updateManager = uni.getUpdateManager();

        updateManager.onCheckForUpdate((res) => {
            // 请求完新版本信息的回调
            console.log(res.hasUpdate);
        });

        updateManager.onUpdateReady(() => {
            uni.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启小程序？',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate();
                    }
                },
            });
        });

        updateManager.onUpdateFailed(() => {
            // 新的版本下载失败
            console.log('download error');
            uni.showModal({
                title: '提示',
                content: '新版小程序更新失败\n请自行删除小程序后，再次搜索打开本小程序',
                confirmText: "知道了",
            });
        });
        // #endif
    },
    onHide: function () {
        console.log('App Hide')
    },
    // 全局状态管理globalData
    globalData: {},
    methods: {},
}
</script>

<style lang="scss">
@import 'uview-ui/theme.scss';

// 全局背景示例
//page {
//    background-image: url('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-53583d29-7722-4650-b880-ed0f730ffa58/67edac74-344b-4a12-8360-27ed0faae1d1.png');
//    background-size: 100% 100%;
//    background-repeat: repeat-y;
//    background-color: #090808d6;
//    color: #FFEBD2;
//}


</style>
