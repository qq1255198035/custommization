<template>
  <div id="notices">
    <my-title :title="itemTitle"></my-title>
    <div class="content">
      <a-locale-provider :locale="locale">
        <a-card style="margin-top: 24px;" :bordered="false">
          <a-list itemLayout="horizontal" :dataSource="data">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              >
                <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-card>
      </a-locale-provider>
    </div>
  </div>
</template>
<style lang="less" scoped>
#notices {
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
import enUS from "ant-design-vue/lib/locale-provider/en_US";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import zhTW from "ant-design-vue/lib/locale-provider/zh_TW";
const lang = {
  "zh-TW": zhTW,
  "zh-CN": zhCN,
  "en-US": enUS
};
export default {
  mixins: [mixinsTitle],
  components: {
    MyTitle
  },
  data() {
    return {
      itemTitle: "通知消息",
      locale: lang[localStorage.getItem("lang")],
      loading: true,
      loadingMore: false,
      data: [
        {
          title: "254",
          content: "内容"
        },
        {
          title: "254",
          content: "内容"
        },
        {
          title: "254",
          content: "内容"
        }
      ],
      offset: 1,
      btnDsiable: false,
      pages: 0
    };
  },
  created() {
    this._apiNotice();
  },
  methods: {
    _apiNotice() {
      const param = {
        pageNo: this.offset,
        pageSize: this.pages
      };
      apiNotice(param).then(res => {
        console.log(res);
      });
    },
    loadMore() {
      this.offset++;
      this.loadingMore = true;
      this.loading = true;

      apiNotice("", this.offset).then(res => {
        if (res.code == 1000) {
          let page = parseInt(this.pages);
          if (res.page.offset > page) {
            this.btnDsiable = true;
            this.$message.warning('到底了');
            this.loadingMore = false;
            this.loading = false;
            return;
          }
          this.data = this.data.concat(res.page.rows);
          this.loading = false;
          this.loadingMore = false;
          this.pages = res.page.pages;
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
