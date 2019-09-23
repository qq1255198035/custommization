<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="12">
            <a-form-item label="名称">
              <a-input placeholder="请输入名称" v-model="queryParam.username"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="状态">
              <a-select style="width: 100%" v-model="queryParam.sex" placeholder="请选择状态">
                <a-select-option value>请选择状态</a-select-option>
                <a-select-option value="1">失败</a-select-option>
                <a-select-option value="2">成功</a-select-option>
                <a-select-option value="3">未开始</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="border-top: 5px">
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="delete" @click="batchDel" />批量通过
          </a-menu-item>
          <a-menu-item key="1">
            <a-icon type="delete" @click="batchDel" />批量拒绝
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
      
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        bordered
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange"
      >
        <template slot="avatarslot" slot-scope="text, record, index">
          <div class="anty-img-wrap">
            <a-avatar shape="square" :src="getAvatarView(record.avatar)" icon="user" />
          </div>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">审批</a>
          <a-divider type="vertical" />
          <a @click="handleDetail(record)">查看详情</a>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <user-modal ref="modalForm" @ok="modalFormOk"></user-modal>

    <password-modal ref="passwordmodal" @ok="passwordModalOk"></password-modal>

    <sys-user-agent-modal ref="sysUserAgentModal"></sys-user-agent-modal>
    <a-modal title="审批通过" v-model="visiblePast" @ok="handleOkPast">
        <p>折扣比例</p>
        <p><a-input></a-input></p>
      </a-modal>
      <a-modal title="审批不通过" v-model="visibleNoPast" @ok="handleNoPast">
        <p>原因</p>
        <p><a-textarea>原因</a-textarea></p>
      </a-modal>
  </a-card>
</template>

<script>
import UserModal from "./modules/UserModal";
import PasswordModal from "./modules/PasswordModal";
import { putAction } from "@/api/manage";
import { frozenBatch } from "@/api/api";
import { JeecgListMixin } from "@/mixins/JeecgListMixin";
import SysUserAgentModal from "./modules/SysUserAgentModal";

export default {
  name: "UserList",
  mixins: [JeecgListMixin],
  components: {
    SysUserAgentModal,
    UserModal,
    PasswordModal
  },
  data() {
    return {
      visiblePast: false,
      visibleNoPast: false,
      description: "这是用户管理页面",
      queryParam: {},
      columns: [
        {
          title: "名称",
          align: "center",
          dataIndex: "username",
          width: 120
        },
        {
          title: "邮箱",
          align: "center",
          width: 100,
          dataIndex: "realname"
        },
        {
          title: "员工",
          align: "center",
          width: 120,
          dataIndex: "avatar",
          sorter: true,
          scopedSlots: { customRender: "avatarslot" }
        },

        {
          title: "销售额",
          align: "center",
          width: 80,
          dataIndex: "sex_dictText",
          sorter: true
        },
        {
          title: "状态",
          align: "center",
          width: 80,
          dataIndex: "status",
          key: "status",
          width: 100,
          filters: [
            {
              text: "失败",
              value: "1"
            },
            {
              text: "成功",
              value: "2"
            },
            {
              text: "未开始",
              value: "3"
            }
          ],
          onFilter: (value, record) => record.status.indexOf(value) === 0
        },
        {
          title: "备注",
          align: "center",
          width: 100,
          dataIndex: "phone"
        },

        {
          title: "操作",
          dataIndex: "action",
          scopedSlots: { customRender: "action" },
          align: "center",
          width: 170
        }
      ],
      url: {
        imgerver: window._CONFIG["domianURL"] + "/sys/common/view",
        syncUser: "/process/extActProcess/doSyncUser",
        list: "/sys/user/list",
        delete: "/sys/user/delete",
        deleteBatch: "/sys/user/deleteBatch",
        exportXlsUrl: "/sys/user/exportXls",
        importExcelUrl: "sys/user/importExcel"
      }
    };
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG["domianURL"]}/${this.url.importExcelUrl}`;
    }
  },
  methods: {
    handleOkPast() {
      this.visiblePast = false;
    },
    handleNoPast() {
      this.visibleNoPast = false
    },
    handleDetail(data) {
      this.$router.push({
        path: "/sellerInfo"
      });
    },
    getAvatarView: function(avatar) {
      return this.url.imgerver + "/" + avatar;
    },

    batchFrozen: function(status) {
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning("请选择一条记录！");
        return false;
      } else {
        let ids = "";
        let that = this;
        that.selectedRowKeys.forEach(function(val) {
          ids += val + ",";
        });
        that.$confirm({
          title: "确认操作",
          content: "是否" + (status == 1 ? "解冻" : "冻结") + "选中账号?",
          onOk: function() {
            frozenBatch({ ids: ids, status: status }).then(res => {
              if (res.success) {
                that.$message.success(res.message);
                that.loadData();
                that.onClearSelected();
              } else {
                that.$message.warning(res.message);
              }
            });
          }
        });
      }
    },
    handleMenuClick(e) {
      if (e.key == 1) {
        this.batchDel();
      } else if (e.key == 2) {
        this.batchFrozen(2);
      } else if (e.key == 3) {
        this.batchFrozen(1);
      }
    },
    handleFrozen: function(id, status) {
      let that = this;
      frozenBatch({ ids: id, status: status }).then(res => {
        if (res.success) {
          that.$message.success(res.message);
          that.loadData();
        } else {
          that.$message.warning(res.message);
        }
      });
    },
    handleChangePassword(username) {
      this.$refs.passwordmodal.show(username);
    },
    handleAgentSettings(username) {
      this.$refs.sysUserAgentModal.agentSettings(username);
      this.$refs.sysUserAgentModal.title = "用户代理人设置";
    },
    passwordModalOk() {
      //TODO 密码修改完成 不需要刷新页面，可以把datasource中的数据更新一下
    }
  }
};
</script>
<style scoped>
@import "~@assets/less/common.less";
</style>
