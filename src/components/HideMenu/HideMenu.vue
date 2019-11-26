<template>
    <div class="hiden-menu">
        <a-icon type="ellipsis" style="transform: rotate(90deg);font-size: 20px;cursor: pointer" @mouseover="hidemenu = true" @mouseout="hidemenu = false"/>
        <ul v-show="hidemenu" @mouseover="hidemenu = true" @mouseout="hidemenu = false">
                <li style="border-bottom: 1px solid #fff;" v-if="isEdit <= 2" @click="handleClick2">
                    <a-icon type="edit" />Edit
                </li>
                <li style="border-bottom: 1px solid #fff;" @click="handleClick">
                    <a-icon type="search" />View
                </li>
                <li @click="handleClick1" style="border-bottom: 1px solid #fff;" v-if="isEdit == 3">
                    <a-icon type="share-alt" />Share
                </li>
                <li @click="handleClick3" style="border-bottom: 1px solid #fff;" v-if="isEdit == 6 || isEdit == 7 || isEdit == 8">
                    <a-icon type="delete" />Delete
                </li>
                <li @click="handleClick4" style="border-bottom: 1px solid #fff;" v-if="isEdit == 1 || isEdit == 2">
                    <a-icon type="export" />Cancel
                </li>
                <!-- v-if="isEdit == 9" -->
                <li @click="handleClick5">
                    <a-icon type="link" />Commit
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
    props:{
        isEdit:{
            type: Number,
            required:true,
            default: 1
        }
    },
    methods:{
        handleClick(){
            this.$emit('myClick')
        },
        handleClick1(){
            this.$emit('myClick1')
        },
        handleClick2(){
            this.$emit('myClick2')
        },
        handleClick3(){
            this.$emit('handeDetelOrder')
        },
        handleClick4(){
            this.$emit('handeCaleOrder')
        },
        handleClick5(){
            this.$emit('handelCommit')
        }
    }
}
</script>
<style lang="less" scoped>
.hiden-menu{
    position: relative;
    z-index: 300;
    > i{
        color: #33b8b3;
    }
    ul{
        width: 74px;
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
            margin: 2px 0;
            i{
                    margin-right: 5px;
                    color: #fff;
            }
        }
            
    }
}
</style>