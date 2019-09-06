<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    overlayClassName="header-notice-wrapper"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '300px', top: '50px' }"
  >
    <template slot="content">
      <a-spin :spinning="loadding">
        <a-tabs>
          <a-tab-pane :tab="11" key="1">
            <a-list v-for="(item,index) in notice" :key="index">
              <a-list-item >
                <a-list-item-meta :title="item.title" :description="item.createtime">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                </a-list-item-meta>
              </a-list-item>
              
            </a-list>
            <a class="new-list" @click="newList">{{22}}</a>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice" style="position: relative;">
      <a-icon style="font-size: 30px; padding: 4px" type="bell" />
      <a-badge v-if="count" class="diount" :count="count" showZero></a-badge>
        
    </span>
  </a-popover>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import { apiNotice } from "@/api/system";
//import { unread,headMsg } from '@/api/common'

export default {
  data() {
    return {

    }
  },
  created() {
    this._apiNotice()
  },
  methods: {
    _apiNotice() {
      
    }
  }
}
</script>

<style lang="css">
  .header-notice-wrapper {
    top: 50px !important;
  }
</style>
<style lang="less" scoped>
.new-list{
  width: 100%;
  display: block;
  text-align: center;
  color: #33b8b3
}
.diount{
  position: absolute;
  top: 10px;
  right: 0px;
}
  .header-notice{
    display: inline-block;
    transition: all 0.3s;

    span {
      vertical-align: initial;
    }
  }
</style>
