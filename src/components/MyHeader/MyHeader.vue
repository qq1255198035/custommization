<template>
      <div id="MyHeader">
            <a-avatar :size="100" :src="imgUrl"/>
            <div class="desc">
                  <h3><span>{{timeFix()}}，</span> <span>{{name}}，</span>祝你开心每一天</h3>
                  <p><span>{{level}}</span><a-divider type="vertical" />{{intro}}</p>
            </div>
      </div>
</template>
<script>
export default {
      props:{
            name:{
                  type: String,
            },
            level:{
                  type: String,
            },
            intro:{
                  type: String,
            },
            imgUrl:{
                  type: String,
            }
      },
      data(){
            return{

            }
      },
      methods:{
            timeFix () {
                  const time = new Date()
                  const hour = time.getHours()
                  //return hour < 9 ? i18n.t('header.HeadMenu.morning') : hour <= 11 ? i18n.t('header.HeadMenu.swh') : hour <= 13 ? i18n.t('header.HeadMenu.zwh') : hour < 20 ? i18n.t('header.HeadMenu.xwh') : i18n.t('header.HeadMenu.wsh');
                  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
            }
      }
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
                  font-size: 24px;
            }
            P{
                  font-size: 20px;
            }
      }
}
</style>
