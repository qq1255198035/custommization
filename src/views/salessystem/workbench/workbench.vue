<template>
  <div id="sys-index">
    <div class="mycontent">
      <img src="./../../../assets/logo-title.png" alt="">
      <p>欢迎来到The Custom King 管理平台！</p>
      <p>
        <router-link to="/OrderManagement" v-has="'order'">订单管理</router-link>
        <router-link to="/sellerUserList" v-has="'jxs'">经销商审批</router-link>
      </p>
      <div style="width: 800px;overflow: scroll;">
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
        progress: 20,
        custom_class: 'bar-ss',
        step: 0,
      },
      {
        id: 'Task 2',
        name: 'Redesign website',
        start: '2019-11-15',
        end: '2019-12-31',
        progress: 0.3,
        
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
