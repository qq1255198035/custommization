<template>
    <div>
        <a :style="{width:width, height:height, paddingLeft: padding,paddingRight: padding,marginTop:top,borderRadius: radio,fontSize:fontsize,lineHeight:height,float:float}" :data-hover="title"  class="btns"  @click="btnSub"><span class="content-hover"><a-icon :type="icon" style="margin-right: 5px;" v-if="icon"/><span>{{title}}</span></span></a>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        },
        width: {
            type: String
        },
        height: {
            type: String
        },
        padding: {
            type: String
        },
        radio: {
            type: String
        },
        fontsize: {
            type: String
        },
        top: {
            type: String
        },
        icon: {
            type: String,
            default: ''
        },
        float: {
            type: String,
        }
    },
    methods: {
        btnSub() {
            this.$emit('payTo')
            this.$emit('newMember')
            this.$emit('newMembers')
            this.$emit('submitLogin')
            this.$emit('register')
            this.$emit('submitPerson')
            this.$emit('payBtn')
            this.$emit('toAlginPay')
            this.$emit('checkDetail')
            this.$emit('neworder')
            this.$emit('btnClick')
            this.$emit('handleLink')
            this.$emit('handleLink1')
            this.$emit('payBtnOrder')
        }
    }
};
</script>

<style lang="less">

</style>
