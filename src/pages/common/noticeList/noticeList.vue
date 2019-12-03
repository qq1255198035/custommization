<template>
  <div id="notices">
    <my-title :title="itemTitle"></my-title>
    <div class="content">
      <a-locale-provider :locale="locale">
          <a-list itemLayout="horizontal" :dataSource="data">
            <a-list-item slot="renderItem" slot-scope="item,index" @click="openMessageModel(item.title,item.content,item.id)" style="cursor: pointer;">
              <a-list-item-meta :description="item.content" :key="index">
                
                <p slot="title">{{item.title}} <span style="font-size: 12px;color:#999;margin-left: 20px;font-weight: normal;">{{ item.createtime | formatTime }}</span></p>
              </a-list-item-meta>
              <div>
                <a-tag color="red" v-if="item.status == 0">Unread</a-tag>
                <a-tag color="#33b8b3" v-if="item.status == 1">Already read</a-tag>
              </div>
            </a-list-item>
            <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
              <a-button
                @click="loadMore"
                :loading="loadingMore"
                :disabled="btnDsiable"
              >Load More</a-button>
            </div>
          </a-list>
      </a-locale-provider>
    </div>
  </div>
</template>
<script>
import { apiNotice } from "@/api/system";
import MyTitle from "@/components/MyTitle/MyTitle";
import { mixinsTitle } from "@/utils/mixin.js";
import { read } from "@/api/seller"
/* eslint-disable */
import enUS from "ant-design-vue/lib/locale-provider/en_US";

export default {
  mixins: [mixinsTitle],
  components: {
    MyTitle
  },
  data() {
    return {
      itemTitle: "Notifications",
      locale: enUS,
      loading: true,
      loadingMore: false,
      data: [],
      offset: 1,
      btnDsiable: false,
    };
  },
  created() {
    this._apiNotice();
  },
  filters: {
    formatTime(time){
      if(time){
        let d = new Date(time);
        let localTime = d.getTime();
        let localOffset = d.getTimezoneOffset()*60000;
        let utc = localTime + localOffset;
        let offset = d.getTimezoneOffset() / 60;
        let korean = utc + (3600000 * offset);
        let date = new Date(korean);
        let y = date.getFullYear();  
        let m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        let dr = date.getDate();  
        dr = dr < 10 ? ('0' + dr) : dr;  
        let h = date.getHours();  
        h=h < 10 ? ('0' + h) : h;  
        let minute = date.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;  
        let second=date.getSeconds();  
        second=second < 10 ? ('0' + second) : second;  
        return y + '-' + m + '-' + dr +' '+ h +':'+ minute + ':' + second; 
      }else{
        return ' '
      }
    }
  },
  methods: {
    openMessageModel(title,content,id){
      this.$info({
        title: title,
        content: content,
        zIndex: 2000,
        okText: 'Close',
        onOk(){},
      });
      read(id).then(res => {
        console.log(res);
        if(res.code == 200){
          this._apiNotice();
        }
      })
    },
    _apiNotice() {
      const param = {
        pageNo: this.offset,
        pageSize: 10
      };
      apiNotice(param).then(res => {
        this.data = res.records;
        this.loading = false;
        console.log(res);
      });
      console.log(this.data);
    },
    loadMore() {
      this.offset++;
      this.loadingMore = true;
      this.loading = true;
      const param = {
        pageNo: this.offset,
        pageSize: 10
      };
      apiNotice(param).then(res => {
        if (this.offset > res.pages) {
          this.btnDsiable = true;
          this.$message.warning("All Data Successfully Updated");
          this.loadingMore = false;
          this.loading = false;
        }else{
          this.data = this.data.concat(res.records);
          this.loading = false;
          this.loadingMore = false;
          this.loading = false;
        }
      });
    },
    onSearch(value) {
      this.getInfoList(value, 1);
    }
  },
};
</script>
<style lang="less" scoped>
#notices {
  padding: 20px;
  .page-menu-search {
    display: flex;
    justify-content: flex-start;
    padding: 50px 0;
  }
}
</style>