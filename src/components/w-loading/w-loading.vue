<template>
    <view class="mask" :class="mask === true ? 'mask-show' : ''"
          @click="Mclose" v-if="is_loading"
          @touchmove.stop.prevent="preventTouchMove">
        <!-- 加载动画开始 -->
        <view class="container">
            <view class="boxLoading">
            </view>
        </view>
        <!-- 加载动画结束 -->
        <view class="title">{{ text }}</view>
    </view>
    <!-- 遮罩层-->
</template>

<script scoped="true">
export default {
    name: "w-loading",
    props: {
        text: String,
        mask: {
            type: Boolean,
            default: false,
        },
        click: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            show: false
        };
    },
    methods: {
        preventTouchMove() {

            return;
        },
        Mclose() {
            if (this.click !== false) {
                this.$store.commit("switch_loading")
            }
        },
        open() {
            this.show = true
        },
        close() {
            this.show = false
        }
    },
    computed: {
        is_loading() {
            return this.$store.state.loading
        }
    }
};
</script>

<style lang="scss">
.mask {
    /* pointer-events: none; */
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.mask.mask-show {
    background: rgba(255, 255, 255, 1);
}

.title {
    color: #fff;
    font-size: 28upx;
}


/* loading加载动画的css */
.container {
    height: 280upx;
    width: 200upx;
}


.boxLoading {
    width: 25px;
    height: 25px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    &:before {
        content: '';
        width: 25px;
        height: 5px;
        background: #000;
        opacity: 0.1;
        position: absolute;
        top: 35px;
        left: 0;
        border-radius: 50%;
        animation: shadow .5s linear infinite;
    }

    &:after {
        content: '';
        width: 25px;
        height: 25px;
        background: #6d5dfc;
        animation: animate .5s linear infinite;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 3px;
    }
}

@keyframes animate {
    17% {
        border-bottom-right-radius: 3px;
    }

    25% {
        transform: translateY(9px) rotate(22.5deg);
    }

    50% {
        transform: translateY(18px) scale(1, .9) rotate(45deg);
        border-bottom-right-radius: 15px;
    }

    75% {
        transform: translateY(9px) rotate(67.5deg);
    }

    100% {
        transform: translateY(0) rotate(90deg);
    }
}


@keyframes shadow {

    0%,
    100% {
        transform: scale(1, 1);
    }

    50% {
        transform: scale(1.2, 1);
    }
}
</style>
