<template>
  <a-table  :columns="columns" :dataSource="data" bordered>
    
  </a-table>
</template>
<script>

export default {
    props: {
        columns: {},
        data: {}
    },
  data() {
    return {
      
    }
  }
}
</script>
<style>
th.column-money,
td.column-money {
  text-align: right !important;
}
table{
    border: none !important
}
th {
    border-right: none !important
}
td {
    border-right: none !important
}
.ant-pagination-item{
  background: rgba(255,255,255,0.3) !important
}
.ant-table-placeholder{
  background: rgba(255,255,255,0.3) !important;
  color: #ffffff;
}
.ant-table-pagination.ant-pagination {
  margin-top: 10px !important;
}
</style>
