<template>
  <div>
    <div class="layout-box">
      <div class="content">
        <my-title :title="itemTitle" :fontsize="20"></my-title>
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="Essential information" key="1">
            <perSet></perSet>
          </a-tab-pane>
          <a-tab-pane tab="Agent application" key="2" forceRender><agencySet></agencySet></a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div>
      <a-button class="open-btn" type="primary" @click="showDrawer" icon="bars"></a-button>
      <a-drawer title="Clothing design" placement="left" :closable="false" @close="onClose" :visible="visible">
        <commonHeader></commonHeader>
      </a-drawer>
    </div>
  </div>
</template>

<script>
import perSet from "@/components/common/perSet";
import agencySet from "@/components/common/agencySet"
import MyTitle from "@/components/MyTitle/MyTitle";
//import PersonList from "@/components/PersonList/PersonList";
import commonHeader from "@/components/commonHeader/commonHeader";
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://vue.ant.design/",
    title: `ant design vue part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
  });
}

export default {
  props: {},
  data() {
    return {
      itemTitle: "Account Settings",
      visible: false,
      listData,
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 3
      },
      actions: [
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" }
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    }
  },
  components: {
    commonHeader,
    MyTitle,
    agencySet,
    perSet
  }
};
</script>

<style lang="less">
.ant-drawer-content {
  background-color: #000 !important;
}
.layout-box {
  padding: 20px;
  display: flex;
  padding: 0 20px;
  .menu {
    flex: 0 0 200px;
    max-width: 200px;
    min-width: 120px;
    width: 200px;
  }
  .content {
    flex: 1;
  }
}

.open-btn {
  position: fixed;
  top: 20%;
  left: 0;
  color: #000 !important;
}

@media screen and(max-width: 760px) {
  .block {
    display: none;
  }
  .open-btn {
    display: block;
  }
  .ant-drawer-content {
    background: #000 !important;
  }
}
@media screen and(min-width: 760px) {
  .block {
    display: block;
  }
  .open-btn {
    display: none;
  }
}
</style>
