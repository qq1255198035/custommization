<template>
  <div id="sys-index">
    <div class="mycontent">
      <img src="./../../../assets/logo-title.png" alt="">
      <p>欢迎来到The Custom King 管理平台！</p>
      <p>
        <router-link to="/OrderManagement" v-has="'order'">订单管理</router-link>
        <router-link to="/sellerUserList" v-has="'jxs'">经销商审批</router-link>
      </p>
      <div style="width: 800px;">
        <div id="gantt"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Gantt from '@/utils/gantt'

export default {
  data(){
    return{

    };
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
  },
  methods:{

  }
}
</script> 
<style lang="less" scoped>
#sys-index{
  display: flex;
  justify-content: center;
  padding-top: 100px;
  height: 100%;
  text-align: center;
  p{
    color:#33b8b3;
    text-align: center;
    margin: 10px 0;
  }
  a{
    color: #333;
    margin: 0 10px;
    text-decoration: underline;
  }
}
</style>
