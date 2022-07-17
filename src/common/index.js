// 去登录
const doLogin = (delta) => {
    // 保存当前页面
    let pages = getCurrentPages();
    if (pages.length) {
        let currentPage = pages[pages.length - 1];
        "pages/login/login" != currentPage.route &&
        uni.setStorageSync("currentPage", currentPage);
    }
    // 跳转授权页面
    uni.navigateTo({
        url: "/pages/login/login?delta=" + (delta || 1)
    });
}

const showLoading = (title = 'Loading...') => {
    uni.showLoading({
        title: title,
        mask: true
    });
}

module.exports = {
    doLogin,
};
