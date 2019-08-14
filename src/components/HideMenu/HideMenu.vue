<template>
    <div class="hiden-menu">
        <a-icon type="ellipsis" style="transform: rotate(90deg);font-size: 20px;cursor: pointer" @click="hidemenu = !hidemenu"/>
        <ul v-show="hidemenu">
                <li style="border-bottom: 1px solid #fff;">
                    <a-icon type="search" />查看
                </li>
                <li>
                    <a-icon type="branches" />分享
                </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            hidemenu:false,
        }
    }
}
</script>
<style lang="less" scoped>
.hiden-menu{
    position: relative;
    ul{
            width: 67px;
            padding: 3px 10px;
            position: absolute;
            top: 20px;
            right: 5px;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
            li{
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                i{
                        margin-right: 5px;
                }
            }
            
    }
}
</style>