<template>
  <a-card :bordered="false" style="height:100%">
    <div class="table-page-search-wrapper">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="储存类型">
            <a-radio-group name="radioGroup" v-model="value" @change="radioCheck">
              <a-radio :value="2">阿里云</a-radio>
              <a-radio :value="3">腾讯云</a-radio>
              <a-radio :value="1">七牛</a-radio>
              <a-radio :value="4">服务器</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <!--阿里云-->
      <a-form :form="form2" v-if="value === 2">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="域名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="阿里云绑定域名"
                v-decorator="['webname',
                    {
                        rules: [{required: true, message: '请输入阿里云绑定域名',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="路径前缀" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="不设置为空"
                v-decorator="['luname',
                    {
                        rules: [{required: false, message: '请输入域名',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="EndPoint" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="阿里云EndPoint"
                v-decorator="['endname',
                    {
                        rules: [{required: false, message: '请输入阿里云EndPoint',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="812" :sm="24">
            <a-form-item label="AccessKeyId" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="阿里云AccessKeyId"
                v-decorator="['accessname',
                    {
                        rules: [{required: true, message: '请输入阿里云AccessKeyId',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="AccessKeySecret" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="阿里云AccessKeySecret"
                v-decorator="['keyname',
                    {
                        rules: [{required: true, message: '请输入阿里云AccessKeySecret',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="BucketName" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="阿里云BucketName"
                v-decorator="['buckname',
                    {
                        rules: [{required: true, message: '请输入阿里云BucketName',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <!--腾讯云-->
      <a-form :form="form3" v-if="value === 3">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item
              label="域名"
              addonBefore="http://"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                placeholder="腾讯云域名"
                v-decorator="['webname',
                    {
                        rules: [{required: true, message: '请输入腾讯云域名',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="路径前缀" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="不设置为空"
                v-decorator="['luname',
                    {
                        rules: [{required: false, message: '请输入域名',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="AppId" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="腾讯云AppId"
                v-decorator="['appid',
                    {
                        rules: [{required: true, message: '请输入腾讯云AppId',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="SecretId" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="腾讯云SecretId"
                v-decorator="['secretIdName',
                    {
                        rules: [{required: true, message: '请输入腾讯云SecretId',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="SecretKey" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="腾讯云SecretKey"
                v-decorator="['keyname',
                    {
                        rules: [{required: true, message: '请输入腾讯云SecretKey',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="BucketName" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="腾讯云BucketName"
                v-decorator="['buckname',
                    {
                        rules: [{required: true, message: '请输入腾讯云BucketName',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="Bucket所属地区" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="如：sh(可选值，华南：gz华北：tj华东：sh)"
                v-decorator="['ketname',
                    {
                        rules: [{required: true, message: '请输入Bucket所属地区',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <!--七牛-->
      <a-form :form="form1" v-if="value === 1">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item
              label="域名"
              addonBefore="http://"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                placeholder="七牛域名"
                v-decorator="['webname',
                    {
                        rules: [{required: true, message: '请输入七牛域名',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="路径前缀" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="不设置默认空"
                v-decorator="['luname',
                    {
                        rules: [{required: false, message: '路径前缀',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="AccessKeyId" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="七牛AccessKeyId"
                v-decorator="['accessname',
                    {
                        rules: [{required: true, message: '请输入七牛AccessKeyId',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="SecretKey" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="七牛SecretKey"
                v-decorator="['keyname',
                    {
                        rules: [{required: true, message: '请输入七牛SecretKey',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="BucketName" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="七牛储存空间名"
                v-decorator="['BucketName',
                    {
                        rules: [{required: true, message: '请输入七牛储存空间名',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <!--服务器-->
      <a-form :form="form4" v-if="value === 4">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="存储路径" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="本地存储路径"
                v-decorator="['webname',
                    {
                        rules: [{required: true, message: '请输入存储路径',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="代理服务器" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                placeholder="本地存储代理服务器，比如Nginx"
                v-decorator="['luname',
                    {
                        rules: [{required: false, message: '请输入代理服务器',}]
                    }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24">
          <span class="table-page-search-submitButtons">
            <a-button type="primary" @click="submit">提交</a-button>
            <a-button style="margin-left: 8px" type="dashed">返回</a-button>
            <a-button style="margin-left: 8px" @click="resetSearchForm">重置</a-button>
          </span>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script>
import { setServers, getServers } from '@api/server'
export default {
  name: 'service',
  components: {},
  data() {
    return {
      value: 2,
      formData: {},
      form1: this.$form.createForm(this),
      form2: this.$form.createForm(this),
      form3: this.$form.createForm(this),
      form4: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    }
  },
  computed: {},
  created() {
    this._getServers()
  },
  methods: {
    valueKey(data) {
      if (this.value === 4) {
          this.$nextTick(() => {
            this.form4.setFieldsValue({
              webname: data[0].diskPath,
              luname: data[0].proxyServer
            })
          })
        }else if (this.value === 1) {
          this.$nextTick(() => {
            this.form1.setFieldsValue({
                accessname: data[0].qiniuAccessKey,
                BucketName: data[0].qiniuBucketName,
                webname: data[0].qiniuDomain,
                luname: data[0].qiniuPrefix,
                keyname: data[0].qiniuSecretKey
            })
          })
        }else if (this.value === 2) {
          this.$nextTick(() => {
            this.form2.setFieldsValue({
              accessname: data[0].aliyunAccessKeyId,
                keyname: data[0].aliyunAccessKeySecret,
                buckname: data[0].aliyunBucketName,
                webname: data[0].aliyunDomain,
                endname: data[0].aliyunEndPoint,
                luname: data[0].aliyunPrefix
            })
          })
        }else {
          this.$nextTick(() => {
            this.form3.setFieldsValue({
              appid: data[0].qcloudAppId,
                buckname: data[0].qcloudBucketName,
                webname: data[0].qcloudDomain,
                luname: data[0].qcloudPrefix,
                ketname: data[0].qcloudRegion,
                secretIdName: data[0].qcloudSecretId,
                keyname: data[0].qcloudSecretKey
            })
          })
        }
    },
    _getServers() {
      getServers().then(res => {
        console.log(res)
        this.formData = res.result.records[0]
        this.value = res.result.records[0].type
        let data = JSON.parse(res.result.records[0].value)
        this.valueKey(data)
      })
    },
    radioCheck(e) {
      getServers().then(res => {
        console.log(res)
        this.formData = res.result.records[0]
        let data = JSON.parse(res.result.records[0].value)
        this.valueKey(data)
      })
    },
    resetSearchForm() {
      if (this.value === 3) {
        this.form3.resetFields()
      }
      if (this.value === 1) {
        this.form1.resetFields()
      }
      if (this.value === 2) {
        this.form2.resetFields()
      }
      if (this.value === 4) {
        this.form4.resetFields()
      }
    },
    submit(e) {
      const that = this
      if (this.value === 3) {
        e.preventDefault()
        this.form3.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            let jsons = {}
            jsons = [
              {
                qcloudAppId: values.appid,
                qcloudBucketName: values.buckname,
                qcloudDomain: values.webname,
                qcloudPrefix: values.luname,
                qcloudRegion: values.ketname,
                qcloudSecretId: values.secretIdName,
                qcloudSecretKey: values.keyname
              }
            ]
            const params = {
              value: JSON.stringify(jsons),
              type: this.value
            }
            console.log(params)
            setServers(params).then(res => {
              console.log(res)
              if(res.code === 200) {
                that.$message.success('保存成功');
              }
              if(res.code === 500) {
                that.$message.warning('保存失败');
              }
            })
            /*this.$notification['error']({
              message: 'Received values of form:',
              description: values
            })*/
          }
        })
      }
      if (this.value === 1) {
        e.preventDefault()
        this.form1.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            let jsons = {}
            jsons = [
              {
                qiniuAccessKey: values.accessname,
                qiniuBucketName: values.BucketName,
                qiniuDomain: values.webname,
                qiniuPrefix: values.luname,
                qiniuSecretKey: values.keyname
              }
            ]
            const params = {
              value: JSON.stringify(jsons),
              type: this.value
            }
            console.log(params)
            setServers(params).then(res => {
              if(res.code === 200) {
                that.$message.success('保存成功');
              }
              if(res.code === 500) {
                that.$message.warning('保存失败');
              }
            })
            /*this.$notification['error']({
              message: 'Received values of form:',
              description: values
            })*/
          }
        })
      }
      if (this.value === 2) {
        e.preventDefault()
        this.form2.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            let jsons = {}
            jsons = [
              {
                aliyunAccessKeyId: values.accessname,
                aliyunAccessKeySecret: values.keyname,
                aliyunBucketName: values.buckname,
                aliyunDomain: values.webname,
                aliyunEndPoint: values.endname,
                aliyunPrefix: values.luname
              }
            ]
            const params = {
              value: JSON.stringify(jsons),
              type: this.value
            }
            console.log(params)
            setServers(params).then(res => {
              if(res.code === 200) {
                that.$message.success('保存成功');
              }
              if(res.code === 500) {
                that.$message.warning('保存失败');
              }
            })
            /*this.$notification['error']({
              message: 'Received values of form:',
              description: values
            })*/
          }
        })
      }
      if (this.value === 4) {
        e.preventDefault()
        this.form4.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            let jsons = {}
            jsons = [
              {
                diskPath: values.webname,
                proxyServer: values.luname
              }
            ]
            const params = {
              value: JSON.stringify(jsons),
              type: this.value
            }
            console.log(params)
            setServers(params).then(res => {
              if(res.code === 200) {
                that.$message.success('保存成功');
              }
              if(res.code === 500) {
                that.$message.warning('保存失败');
              }
            })
            /*this.$notification['error']({
              message: 'Received values of form:',
              description: values
            })*/
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.ant-card-body .table-operator {
  margin-bottom: 18px;
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