<template>
  <div id="designRequire">
    <my-title :title="'设计列表'" :fontsize="20" style="padding: 0 20px;">
      <a-button size="small" icon="rollback" style="font-size: 14px;" @click="$router.go(-1)">Back</a-button>
    </my-title>
    <div class="title">
      <h3>
        单号：11111
      </h3>
      <ul>
        
        <li>
          <p>
            <span>创建人:</span>
            {{data.contact}}
          </p>
          <p>
            <span>创建时间:</span>
            {{data.createTime}}
          </p>
        </li>
        <li>
          <p>
            <span>备注：</span>
            {{data.introduction}}
          </p>
        </li>
      </ul>
    </div>
    <ul class="list-box">
      <li v-for="item in data.list" :key="item.id">
        <div class="img-box">
          <img :src="item.positivePicUrl" alt="">
          <img :src="item.backPicUrl" alt="">
          <img :src="item.leftPicUrl" alt="">
          <img :src="item.rightPicUrl" alt="">
        </div>
        <div class="content">
          <dl>
            <dt>Txushan</dt>
            <dd>编号：01</dd>
            <dd>颜色：01</dd>
          </dl>
          <div class="btn-box">
            <a-button>查看需求</a-button>
            <a-dropdown>
              <a-button class="ant-dropdown-link">
                设计方案 <a-icon type="down"/>
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">设计方案1</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">创建新设计</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
            <a-button>确认样稿</a-button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import MyTitle from "@/components/MyTitle/MyTitle";
// 方法名加括号
import { dealerDesignList } from '@/api/seller'
export default {
  components:{
    MyTitle
  },
  data(){
    return{
      id:'',
      data:{}
    }
  },
  mounted(){
    this.id = this.$route.query.orderId;
    this.getDealerDesignList(this.id);
  },
  methods:{
    getDealerDesignList(id){
      dealerDesignList(id).then(res => {
        console.log(res)
        if(res.code == 0){
          this.data = res.result;
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
#designRequire{
  .title {
    padding: 20px;
    h3{
      margin: 0;
    }
    ul {
      display: flex;
      li {
        width: 33.33%;
        color: #999;
        p {
          font-size: 14px;
          margin: 5px 0;
        }
        span {
          color: #666;
        }
      }
    }
  }
  .list-box{
    padding: 0 20px;
    li{
      display: flex;
      justify-content: space-between;
      background-color: #f1f1f1;
      align-items: center;
      padding: 20px;
      .img-box{
        width: 45%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        img{
          width: 24%;
        }
      }
      .content{
        width: 55%;
        display: flex;
        justify-content: space-between;
        .btn-box{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          
        }
        dl{
          dt{
            font-size: 18px;
            color: #33b8b3;
          }
          dd{
            margin: 10px 0;
          }
        }
      }
    }
  }
}
</style>