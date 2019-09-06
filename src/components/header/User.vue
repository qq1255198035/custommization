<template>
    <div id="User">
        <span class="header-notice">
            <a-icon type="bell"/>
            <a-badge v-if="count" class="diount" :count="count" showZero></a-badge>
        </span>
        <span>
            <a-icon type="user"/>
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
        text-align: right;
        padding: 20px;
        > span{
            margin: 0 10px;
            i{
                color: #33b8b3;
                font-size: 30px;
                padding: 4px;
            }
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