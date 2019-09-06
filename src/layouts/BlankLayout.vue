<template>
    <div id="BlankLayout">
        
        <router-view></router-view>
    </div>
</template>
<script>

export default {
    components:{
        
    }
}
</script>

<style lang="less" scoped>
#BlankLayout{
    width: 100%;
    height: 100%;
    background-image: linear-gradient(-45deg, #11bbe8 10%, #4ac37a 100%);
}
</style>