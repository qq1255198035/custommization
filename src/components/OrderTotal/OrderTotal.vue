<template>
    <div id="OrderTotal">
        <a-row type="flex" justify="space-between" align="middle">
            <a-col :span="6">
                <div class="box">
                    <span>
                        <a-icon type="dollar" />
                    </span>
                    <div class="desc">
                        <p>总销售额</p>
                        <h3>$ 1,500.00</h3>
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
                        <p>总订货数</p>
                        <h3>$ 1,500.00</h3>
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
                        <p>总佣金</p>
                        <h3>$ 1,500.00</h3>
                    </div>
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script>
export default {
    
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