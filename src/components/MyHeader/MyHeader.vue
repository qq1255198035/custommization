<template>
      <div id="MyHeader">
            <a-avatar :size="100" :src="imgUrl"/>
            <div class="desc">
                  <h3><span>{{timeFix()}}，</span> <span>{{name}}，</span>Have A Nice Day</h3>
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
                  return hour < 9 ? 'Good morning' : hour <= 11 ? 'Good morning' : hour <= 13 ? 'Good noon' : hour < 20 ? 'Good afternoon' : 'Good evening'
            }
      }
}
</script>
<style lang="less" scoped>
#MyHeader{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #9d9d9d;
      padding: 10px 0;
      .desc{
            margin-left: 20px;
            h3{
                  color: #33b8b3;
                  font-size: 20px;
            }
            P{
                  font-size: 16px;
                  color: #9d9d9d;
            }
      }
}
</style>
