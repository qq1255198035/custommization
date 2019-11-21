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
import Gantt from 'frappe-gantt'

export default {
  data(){
    return{

    };
  },
  mounted(){
    console.log(new Date().getMonth());
    var tasks = [
      {
        id: 'Task 1',
        name: '项目一',
        start: '2019-11-15',
        end: '2019-11-31',
        progress: [
          {
            task_start: '2019-11-15',
            gantt_start:'2019-11-17',
            color: '#486461',
          },
          {
            task_start: '2019-11-17',
            gantt_start:'2019-11-22',
            color: '#965219',
          },
          {
            task_start: '2019-11-22',
            gantt_start:'2019-11-24',
            color: '#486461',
          }
        ],
        custom_class: 'bar-ss',
       
      },
      {
        id: 'Task 2',
        name: 'Redesign website',
        start: '2019-11-15',
        end: '2019-12-31',
        progress: [
          {
            task_start: '2019-11-15',
            gantt_start:'2019-11-17',
            color: '#265949',
          },
          {
            task_start: '2019-11-17',
            gantt_start:'2019-11-22',
            color: '#895546'
          },
          {
            task_start: '2019-11-22',
            gantt_start:'2019-12-24',
            color: '#252659',
          },
          {
            task_start: '2019-11-24',
            gantt_start:'2019-12-31',
            color: '#252659',
          }
        ],
        
      },
      {
        id: 'Task 3',
        name: 'Redesign website',
        start: '2019-11-1',
        end: '2019-12-31',
        progress: [{
          task_start: '2019-11-15',
          gantt_start:'2019-11-17',
          color: '#256359',
          html: '656'
        },
        {
          task_start: '2019-11-17',
          gantt_start:'2019-11-22',
          color: '#254459'
        },
        {
          task_start: '2019-11-22',
          gantt_start:'2019-12-31',
          color: '#254459',
          html: '589'
        }
        ],
        
      },
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
