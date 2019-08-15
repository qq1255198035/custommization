<template>
    <div id="User">
        <span class="header-notice">
            <a-icon style="font-size: 35px; padding: 4px" type="bell" />
            <a-badge v-if="count" class="diount" :count="count" showZero></a-badge>
        </span>
        <span>
            <a-icon type="user" style="font-size: 35px; padding: 4px"/>
            UserName
        </span>
    </div>
</template>
<script>
export default {
    data(){
        return{
            count:0
        }
    }
}
</script>
<style lang="less" scope>
    #User{
        > span{
            margin: 0 10px;
        }
        .header-notice{
            position: relative;
            .diount{
                position: absolute;
                top: 10px;
                right: 0px;
            }
        }
    }
</style>