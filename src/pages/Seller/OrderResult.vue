<template>
    <div id="OrderResult">
        <div class="box1">
            <my-stpes :mycurrent="1" stpesnum="3">
                    <p slot="p1">设计原稿</p>
                    <p slot="p2">打样确认</p>
                    <p slot="p3">分享购买</p>
            </my-stpes>
        </div>
        <div class="content">
            <div class="success">

            </div>
        </div>
    </div>
</template>
<script>
import MyStpes from "@/components/MyStpes/MyStpes";
export default {
    components:{
        MyStpes
    }
}
</script>
<style lang="less" scoped>
#OrderResult{
    .box1{
        padding: 30px;
    }
}
</style>