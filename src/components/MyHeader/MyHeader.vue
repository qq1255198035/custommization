<template>
      <div id="MyHeader">
            <div class="left">
                  <a-avatar :size="100" :src="imgUrl" v-if="imgUrl"/>
                  <a-avatar :size="100" icon="user" v-else />
                  <div class="desc">
                        <h3><span>{{timeFix()}},</span> <span>{{name}}</span></h3>
                        <p><span>{{level}}</span><a-divider type="vertical" />{{intro}}</p>
                  </div>
            </div>
            
            <slot></slot>
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
                  return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
            }
      }
}
</script>
<style lang="less" scoped>
#MyHeader{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #9d9d9d;
      padding: 10px 0;
      .left{
            display: flex;
            justify-content: flex-start;
            align-items: center;
      }
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
