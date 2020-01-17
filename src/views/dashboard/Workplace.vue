<template>
  <div id="factoryIndex">
      <my-title :title="'工作台'" :fontsize="20" />
      <my-header :name="name" :imgUrl="imgUrl">
        <div class="slot-box">
          <ul>
            <li>
              <p>待处理</p>
              <span>{{pendingOrder}}</span>
            </li>
            <li>
              <p>总订单数量</p>
              <span>{{allOrder}}</span>
            </li>
          </ul>
        </div>
      </my-header>
      <div class="date-box">
        <a-month-picker placeholder="请选择年月" @change="changeDate" />
      </div>
      <div class="gantt-box">
        <div id="gantt" v-show="tasks.length > 0"></div>
        <div v-show="tasks.length === 0" style="text-align: center;">
          暂无数据！
        </div>
      </div>
  </div>
</template>
<script>
import Gantt from '@/utils/gantt'
import MyTitle from "@/components/MyTitle/MyTitle";
import MyHeader from "@/components/MyHeader/MyHeader";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { factoryDashboard,userInfo } from "@/api/system"
export default {
  data(){
    return{
      name: '',
      gantt:null,
      imgUrl: '',
      pendingOrder: '',
      allOrder: '',
      tasks: []
    }
  },
  created(){
    let year = moment().year();
    let month = moment().month() + 1 <= 9 ? '0' + (moment().month() + 1) : moment().month() + 1;
    this.getIndexInfo(year,month)
    //console.log(moment('2019-09-24T14:45:03+08:00').year())
  },
  mounted(){
    this.getUserInfo();
    if(this.tasks.length > 0){
      this.gantt = new Gantt("#gantt", this.tasks);
    }
    //console.log(this.gantt)
  },
  methods:{
    changeDate(date,value){
      let newdate = value.split('-');
      let [year,month] = newdate;
      this.getIndexInfo(year,month)
    },
    getUserInfo() {
      userInfo().then(res => {
        if (res.code === 0) {
            //console.log(res)
            this.name = res.result.name;
            this.imgUrl = res.result.avatar;
        }
      });
    },
    getIndexInfo(year,month){
      factoryDashboard(year,month).then(res => {
        //console.log(res)
        if(res.code === 0){
          this.allOrder = res.result.allOrder;
          this.pendingOrder = res.result.pendingOrder;
          this.tasks = res.result.list;
          if(this.tasks.length > 0){
            this.gantt = new Gantt("#gantt", this.tasks);
          }
        }
      })
    }
  },
  components:{
    MyTitle,
    MyHeader
  }
}
</script>
<style lang="less" scoped>
#factoryIndex{
  padding: 0 20px;
  .slot-box{
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    ul{
      display: flex;
      li{
        text-align: center;
        margin: 0 20px;
        span{
          font-size: 20px;
          color: #33b8b3;
        }
      }
    }
  }
  .date-box{
    margin: 20px 0;
    display: flex;
    justify-content: flex-end;
  }
  .gantt-box{ 
    width: 100%;
  }
  
}
</style>