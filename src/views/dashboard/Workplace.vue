<template>
  <div id="factoryIndex">
      <my-title :title="'工作台'" :fontsize="20" />
      <my-header :name="name" :imgUrl="imgUrl">
        <div class="slot-box">
          <ul>
            <li>
              <p>待处理</p>
              <span>11</span>
            </li>
            <li>
              <p>总订单数量</p>
              <span>22</span>
            </li>
          </ul>
        </div>
      </my-header>
      <div class="gantt-box">
        <div id="gantt"></div>
      </div>
  </div>
</template>
<script>
import Gantt from '@/utils/gantt'
import MyTitle from "@/components/MyTitle/MyTitle";
import MyHeader from "@/components/MyHeader/MyHeader";
import { userInfo } from "@/api/seller";
export default {
  data(){
    return{
      name: '',
      imgUrl: ''
    }
  },
  mounted(){
    var tasks = [
      {
        id: 'Task 1',
        name: '项目一菲菲',
        start: '2019-11-15',
        end: '2019-11-30',
        progress: [
          {
            start: '2019-11-16',
            end:'2019-11-17',
            color: '#486461',
          },
          {
            start: '2019-11-17',
            end:'2019-11-19',
            color: '#567977',
          },
          {
            start: '2019-11-20',
            end:'2019-11-30',
            color: '#486461',
          },
        ],
        custom_class: 'bar-ss',
      },
      {
        id: 'Task 2',
        name: '项目2',
        start: '2019-11-15',
        end: '2019-11-30',
        progress: [
          {
            start: '2019-11-16',
            end:'2019-11-17',
            color: '#486461',
          },
          {
            start: '2019-11-17',
            end:'2019-11-19',
            color: '#486461',
          },
          {
            start: '2019-11-20',
            end:'2019-11-25',
            color: '#486461',
          },
          {
            start: '2019-11-26',
            end:'2019-11-30',
            color: 'red',
          },
        ],
        custom_class: 'bar-ss',
      },{
        id: 'Task 3',
        name: '项目3',
        start: '2019-12-1',
        end: '2019-12-31',
        progress: [
          {
            start: '2019-12-1',
            end:'2019-12-5',
            color: '#486461',
          },
          {
            start: '2019-12-7',
            end:'2019-12-10',
            color: '#486461',
          },
          {
            start: '2019-12-12',
            end:'2019-12-24',
            color: '#486461',
          }
        ],
        custom_class: 'bar-ss',
      }
    ];
    new Gantt("#gantt", tasks,{
      on_click: function (task) {
        console.log(task);
      },
      on_date_change: function(task, start, end) {
          console.log(task, start, end);
      },
      on_progress_change: function(task, progress) {
          console.log(task, progress);
      },
      on_view_change: function(mode) {
          console.log(mode);
      }
    });
    document.querySelector('svg').appendChild(
      document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    )
    this.getUserInfo();
  },
  methods:{
    getUserInfo() {
      userInfo().then(res => {
        if (res.code == 0) {
          console.log(res)
          if(res.result){
            this.name = res.result.username;
            this.imgUrl = res.result.img;
          }
        }
      });
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
  .gantt-box{
    margin-top: 30px; 
    width: 100%;
  }
}
</style>