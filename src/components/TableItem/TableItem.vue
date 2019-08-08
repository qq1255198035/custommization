<template>
      <div id="TableItem">
            <a-row>
                  <a-col :span="10">
                        <h2>
                              圆领T恤衫
                              <slot></slot>
                        </h2>
                        <ul class="img-show">
                              <li>
                                    <img src="@/assets/black.jpg" alt="">
                              </li>
                              <li>
                                    <img src="@/assets/black.jpg" alt="">
                              </li>
                        </ul>
                  </a-col>
            </a-row>
            
      </div>
</template>
<script>
export default {
      
}
</script>
<style lang="less" scoped>
#TableItem{
      h2{
            color: #fff;
      }
      .img-show{
            display: flex;
            img{
                  width: 80%;
            }
      }
}
</style>
