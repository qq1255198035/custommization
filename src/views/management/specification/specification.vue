<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="24">
            <a-form-item label="名称">
              <a-input placeholder="请输入名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>

              <a-button type="primary" @click="pay" icon="reload" style="margin-left: 8px">支付</a-button>

              <a-button type="primary" @click="sharewe" icon="reload" style="margin-left: 8px">微信</a-button>
              <div>
                <transition name="fade">
                  <div class="qrcode-wrapper" @click="isHide" v-show="show">
                    <div class="qrcode">
                      <div class="vcodeTitle">{{vcodeNmae}}</div>
                      <canvas id="canvas"></canvas>
                      <div @click="isHide" class="close-vcode">x</div>
                    </div>
                  </div>
                </transition>
              </div>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete" />删除
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
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <specification-modal ref="modalForm" @ok="modalFormOk"></specification-modal>
  </a-card>
</template>

<script>
import QRCode from 'qrcode'
import { getAction } from '@/api/manage'
import specificationModal from '@/views/jeecg/specificationModal/specificationModal'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import { ajaxPost, httpRequest } from '@/api/pay'
import wxapi from '@/common/config.js'
export default {
  name: 'TableDemo',
  mixins: [JeecgListMixin],
  components: {
    specificationModal
  },
  data() {
    return {
      vcodeNmae: '',
      vcodes: '',
      show: false,
      title: '好吃的',
      paramObj: {
        httpUrl: 'http://192.168.0.129:8080/jeecg-boot/api/paypal/pay',
        type: 'post',
        data: {}
      },
      // 列表表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '名称',
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: '排序',
          align: 'center',
          dataIndex: 'sortOrder'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 分页参数
      type: 'radio',
      url: {
        list: '/specifications/list',
        delete: '/specifications/delete',
        deleteBatch: '/test/order/deleteBatch',
        customerListByMainId: '/test/order/listOrderCustomerByMainId'
      }
    }
  },
  mounted() {
    wxapi.wxRegister(this.wxRegCallback)
  },
  computed: {
    currentId() {
      return this.id
    }
  },
  methods: {
    isHide() {
      this.show = false
    },
    sharewe() {
      console.log(111)
      this.vcodeNmae = window.location.href
      this.show = true
      var canvas = document.getElementById('canvas')
      QRCode.toCanvas(canvas, 'https://www.baidu.com', function(error) {
        if (error) {
          //console.error(error);
        }
      })
    },
    wxRegCallback() {
      // 用于微信JS-SDK回调
      this.wxShareTimeline()
      this.share()
    },
    wxShareTimeline() {
      // 微信自定义分享到朋友圈
      let option = {
        title: '限时团购周 挑战最低价', // 分享标题, 请自行替换
        link: 'https://www.jianshu.com/p/d7f71883806f', // 分享链接，根据自身项目决定是否需要split
        imgUrl: 'logo.png', // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert('分享成功')
        },
        error: () => {
          alert('已取消分享')
        }
      }
      // 将配置注入通用方法
      wxapi.ShareTimeline(option)
    },
    share() {
      // 微信自定义分享给朋友
      let option = {
        title: '限时团购周 挑战最低价', // 分享标题, 请自行替换
        desc: '限时团购周 挑战最低价', // 分享描述, 请自行替换
        link: 'https://www.jianshu.com/p/d7f71883806f', // 分享链接，根据自身项目决定是否需要split
        imgUrl: 'logo.png', // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert('分享成功')
        },
        error: () => {
          alert('已取消分享')
        }
      }
      // 将配置注入通用方法
      console.log(wxapi)
      wxapi.ShareAppMessage(option)
    },
    pay() {
      console.log(55)
      ajaxPost('http://192.168.0.129:8080/jeecg-boot/api/paypal/pay').then(res => {
        console.log(res)
      })
      /*httpRequest(
        this.paramObj,
        function(respondDada) {
          //这里编写成功的回调函数
          console.log(respondDada)
        },
        function() {
          alert('网络错误')
        }
      )*/
    }
  }
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s;
}
.fade-enter,
.fade-leave-to {
  transform: translate3d(100%, 0, 0);
}
.qrcode-wrapper {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 99;
  height: 100%;
  background: rgba(7, 17, 27, 0.1);
}
.qrcode-wrapper .qrcode {
  position: absolute;
  background: #fff;
  top: 50%;
  left: 50%;
  width: 180px;
  height: 180px;
  border-radius: 6px;
  margin-top: -90px;
  margin-left: -90px;
  text-align: center;
}
#canvas {
  width: 120px;
  height: 120px;
}
.close-vcode {
  width: 30px;
  height: 30px;
  background: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  position: relative;
  bottom: -40px;
  left: 50%;
  margin-left: -15px;
}
.vcodeTitle {
  padding: 10px 0;
  color: #3d3d3d;
}
.ant-card-body .table-operator {
  margin-bottom: 18px;
}
.share {
  position: fixed;
  z-index: 9999;
  right: 600px;
}
.ant-table-tbody .ant-table-row td {
  padding-top: 15px;
  padding-bottom: 15px;
}

.anty-row-operator button {
  margin: 0 5px;
}

.ant-btn-danger {
  background-color: #ffffff;
}

.ant-modal-cust-warp {
  height: 100%;
}

.ant-modal-cust-warp .ant-modal-body {
  height: calc(100% - 110px) !important;
  overflow-y: auto;
}

.ant-modal-cust-warp .ant-modal-content {
  height: 90% !important;
  overflow-y: hidden;
}
</style>