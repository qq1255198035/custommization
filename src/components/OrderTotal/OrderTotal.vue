<template>
    <div id="OrderTotal">
        <a-row type="flex" justify="space-between" align="middle">
            <a-col :span="6">
                <div class="box">
                    <span>
                        <a-icon type="dollar" />
                    </span>
                    <div class="desc">
                        
                        <slot name="a"></slot>
                        <h3>$ {{num1}}</h3>
                    </div>
                </div>
            </a-col>
            <a-col :span="3">
                <div class="box">
                    <a-divider type="vertical" class="my-divider"/>
                </div>
                
            </a-col>
            <a-col :span="6">
                <div class="box">
                    <span>
                        <a-icon type="inbox" />
                    </span>
                    <div class="desc">
                        
                        <slot name="b"></slot>
                        <h3>$ {{num2}}</h3>
                    </div>
                </div>
            </a-col>
            <a-col :span="3">
                <div class="box">
                    <a-divider type="vertical" class="my-divider"/>
                </div>
                
            </a-col>
            <a-col :span="6">
                <div class="box">
                    <span>
                        <a-icon type="pay-circle" />
                    </span>
                    <div class="desc">
                        
                        <slot name="c"></slot>
                        <h3>$ {{num3}}</h3>
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script>
export default {
    props:{
        num1:{
            required: true
        },
        num2:{
            required: true
        },
        num3:{
            required: true
        }
    }
}
</script>
<style lang="less" scoped>
#OrderTotal{
    padding: 40px 0;
    .my-divider{
        height: 50px;
    }
    .box{
        display: flex;
        justify-content: center;
        .desc{
            h3{
                color: #fff;
                font-size: 20px;
                margin: 0;
            }
        }
        > span{
            width: 56px;
            height: 56px;
            border-radius: 28px;
            background-color: rgba(255, 255, 255, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 20px;
            i{
                font-size: 35px
            }
        }
    }
}
</style>