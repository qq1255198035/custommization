<template>
    <div class="hiden-menu">
        <a-icon type="ellipsis" style="transform: rotate(90deg);font-size: 20px;cursor: pointer" @mouseover="hidemenu = true" @mouseout="hidemenu = false"/>
        <ul v-show="hidemenu" @mouseover="hidemenu = true" @mouseout="hidemenu = false">
                <li style="border-bottom: 1px solid #fff;" @click="handleClick">
                    <a-icon type="search" />查看
                </li>
                <li>
                    <a-icon type="share-alt" />分享
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
    },
    methods:{
        handleClick(){
            this.$emit('myClick')
        }
    }
}
</script>
<style lang="less" scoped>
.hiden-menu{
    position: relative;
    > i{
        color: #33b8b3;
    }
    ul{
            width: 67px;
            padding: 3px 10px;
            position: absolute;
            top: 20px;
            right: 5px;
            background-color: #33b8b3;
            border-radius: 4px;
            li{
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                i{
                        margin-right: 5px;
                        color: #fff;
                }
            }
            
    }
}
</style>