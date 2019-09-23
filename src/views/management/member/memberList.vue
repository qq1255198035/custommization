<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="订单号">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px" @click="resetSearchForm">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="() => this.handleModalVisible(true)">新建</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <a-table
      ref="table"
      size="default"
      :columns="columns"
      :dataSource="loadData"
      :showAlertInfo="true"
      @onSelect="onChange"
    >
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </a-table>

    <a-modal
      title="操作"
      :width="800"
      v-model="visible"
      @ok="handleOk"
    >
      <a-form :autoFormCreate="(form)=>{this.form = form}">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="规则编号"
          hasFeedback
          validateStatus="success"
        >
          <a-input placeholder="规则编号" v-model="mdl.no" id="no" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="服务调用次数"
          hasFeedback
          validateStatus="success"
        >
          <a-input-number :min="1" id="callNo" v-model="mdl.callNo" style="width: 100%" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态"
          hasFeedback
          validateStatus="warning"
        >
          <a-select defaultValue="1" v-model="mdl.status">
            <a-select-option value="1">Option 1</a-select-option>
            <a-select-option value="2">Option 2</a-select-option>
            <a-select-option value="3">Option 3</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述"
          hasFeedback
          help="请填写一段描述"
        >
          <a-textarea :rows="5" v-model="mdl.description" placeholder="..." id="description"/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="更新时间"
          hasFeedback
          validateStatus="error"
        >
          <a-date-picker
            style="width: 100%"
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Select Time"
          />
        </a-form-item>

      </a-form>
    </a-modal>

    <a-modal title="新建规则" destroyOnClose :visible="visibleCreateModal" @ok="handleCreateModalOk" @cancel="handleCreateModalCancel">
      <!---->
      <a-form style="margin-top: 8px" :autoFormCreate="(form)=>{this.createForm = form}">
        <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 15 }" label="描述" fieldDecoratorId="description" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}">
          <a-input placeholder="请输入" />
        </a-form-item>
      </a-form>
    </a-modal>

  </a-card>
</template>

<script>
  import STable from '@/components/table/'
  import ATextarea from "ant-design-vue/es/input/TextArea"
  import AInput from "ant-design-vue/es/input/Input"
  import moment from "moment"
  import axios from 'axios';
  import { getMerberList } from '@/api/member'

  export default {
    name: "TableList",
    components: {
      AInput,
      ATextarea,
      STable
    },
    data () {
      return {
        loadData: [],
        visibleCreateModal:false,
        visible: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
        form: null,
        mdl: {},

        // 高级搜索 展开/关闭
        advanced: true,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '会员名称',
            dataIndex: 'username'
          },
          {
            title: '性别',
            dataIndex: 'gender'
          },
          {
            title: '出生日期',
            dataIndex: 'birthday',
            needTotal: true,
          },
          {
            title: '注册时间',
            dataIndex: 'registerTime',
            needTotal: true
          },
          {
            title: '最后登录时间',
            dataIndex: 'lastLoginTime',
            sorter: true
          },
          {
            title: '会员等级',
            dataIndex: 'activitiSync',
            needTotal: true
          },
          {
            title: '手机号',
            dataIndex: 'mobile',
            needTotal: true
          },

          {
            table: '操作',
            dataIndex: 'action',
            width: '150px',
            scopedSlots: { customRender: 'action' },
          }
        ],

        selectedRowKeys: [],
        selectedRows: []
      }
    },
    created () {
      this._getMerberList()
    },
    methods: {
      _getMerberList() {
        console.log(1111)
        const params = {
          token: this.$ls.get('Access-Token'),
          pageNo: 1,
          pageSize: 4,
          flag: 1

        }
        console.log(params)
        
        getMerberList(params).then(res => {
          console.log(res)
          this.loadData = res.result.records
          console.log(this.loadData)
        })
      },
      handleEdit (record) {
        this.mdl = Object.assign({}, record)
        console.log(this.mdl)
        this.visible = true
      },
      handleOk () {

      },

      //添加逻辑
      handleModalVisible(isVisible) {
        this.visibleCreateModal = isVisible;
      },
      handleCreateModalOk() {
        this.createForm.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          const description = this.createForm.getFieldValue('description');
          axios.post('/saveRule', {
            desc: description,
          }).then((res) => {
            this.createForm.resetFields();
            this.visibleCreateModal = false;
            this.loadRuleData();
          });
        });
      },
      handleCreateModalCancel() {
        this.visibleCreateModal = false;
      },

      onChange (row) {
        this.selectedRowKeys = row.selectedRowKeys
        this.selectedRows = row.selectedRows

        console.log(this.$refs.table)
      },


      resetSearchForm () {
        this.queryParam = {
          date: moment(new Date())
        }
      }
    },
    watch: {
      /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
    }
  }
</script>