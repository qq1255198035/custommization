<template>
      <div id="MyMenu">
            <a-menu mode="inline" :openKeys="openKeys" @openChange="onOpenChange" @click="handleClick">
                  <a-sub-menu key="sub1" class="my-submenu">
                        <span slot="title"><a-icon type="edit" /><router-link>仪表盘</router-link></span>
                  </a-sub-menu>
                  <a-sub-menu key="sub2" class="my-submenu">
                        <span slot="title"><a-icon type="area-chart" /><span>订单管理</span></span>
                        <a-sub-menu key="sub3" title="剪贴画" class="img-cell">
                              <a-menu-item :key="img" v-for="(img,index) in imgs" @click="addImg(img,index)">
                                    <img :src="img" alt="">
                              </a-menu-item>
                              
                        </a-sub-menu>
                        <a-menu-item style="display: flex; align-items:center;justify-content: center">
                              <a-upload name="file" class="my-upload" :beforeUpload="beforeUpload">
                                    <a-button>
                                          <a-icon type="upload"/> 上传图片
                                    </a-button>
                              </a-upload>
                        </a-menu-item>
                  </a-sub-menu>
                  <a-sub-menu key="sub4" class="my-submenu">
                        <span slot="title"><a-icon type="pie-chart" /><span>图形</span></span>
                        <a-menu-item key="9" @click="createEqualTriangle">三角形</a-menu-item>
                        <a-menu-item key="10" @click="createRect">矩形</a-menu-item>
                        <a-menu-item key="11" @click="createCircle">圆形</a-menu-item>
                  </a-sub-menu>
            </a-menu>
      </div>
</template>
<script>
export default {
      
}
</script>
<style lang="less" scoped>
@import url("@/components/index.less");
</style>
