<template>
  <div id="notices">
    <my-title :title="itemTitle"></my-title>
    <div class="content">
      <a-locale-provider :locale="locale">
        <a-card style="margin-top: 24px;" :bordered="false">
          <a-list itemLayout="horizontal" :dataSource="data">
            <a-list-item slot="renderItem" slot-scope="item,index">
              <a-list-item-meta :description="item.content" :key="index">
                <p slot="title" href="#">{{item.title}} <span style="font-size: 12px;color:#999;margin-left: 20px;font-weight: normal;">{{ item.createtime }}</span></p>
              </a-list-item-meta>
            </a-list-item>
            <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
              <a-button
                @click="loadMore"
                :loading="loadingMore"
                :disabled="btnDsiable"
              >Load More</a-button>
            </div>
          </a-list>
        </a-card>
      </a-locale-provider>
    </div>
  </div>
</template>
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
<script>
import { apiNotice } from "@/api/system";
import MyTitle from "@/components/MyTitle/MyTitle";
import { mixinsTitle } from "@/utils/mixin.js";
/* eslint-disable */
import enUS from "ant-design-vue/lib/locale-provider/en_US";
// // import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
// // import zhTW from "ant-design-vue/lib/locale-provider/zh_TW";
// const lang = {
//   // "zh-TW": zhTW,
//   // "zh-CN": zhCN,
//   "en-US": enUS
// };
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
      data: [
        
      ],
      offset: 1,
      btnDsiable: false,
    
    };
  },
  created() {
    this._apiNotice();
  },
  methods: {
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
  updated() {}
};
</script>
