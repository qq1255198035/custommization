<template>
    <div id="Loading" v-show="isShow">
        <a-spin size="large" />
        <p>Loading...</p>
    </div>
</template>
<script>
export default {
    name: 'Loading',
    data () {
        return {
            isShow: false     // 控制是否显示
        }
    }
}
</script>
<style lang="less" scoped>
#Loading{
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 9999;
    top: 0;
    left: 0;
    background-color: rgba(51, 184, 179, 0.3);
    p{
        color: rgba(51, 184, 179, 1);
        text-align: center;
        font-size: 16px;
    }
}
</style>