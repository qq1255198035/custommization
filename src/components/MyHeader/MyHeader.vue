<template>
      <div id="MyHeader">
            <a-avatar :size="100" />
            <div class="desc">
                  <h3><span>早上好，</span> <span>ALEX,</span>祝你开心每一天</h3>
                  <p><span>Svip</span><a-divider type="vertical" />XXXXXXXXXXXXXXXXXXXXXXX</p>
            </div>
      </div>
</template>
<script>
export default {
      
}
</script>
<style lang="less" scoped>
#MyHeader{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      padding: 10px 0;
      .desc{
            margin-left: 20px;
            h3{
                  color: #fff;
            }
      }
}
</style>
