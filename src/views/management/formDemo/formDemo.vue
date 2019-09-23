<template>
  <div>
    <a-form layout="inline">
      <a-row :gutter="24">
        <a-col :md="24" :sm="24">
          <a-form-item label="上传文件" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-upload
              :beforeUpload="beforeUploadFile"
            >
              <a-button>
                <a-icon type="upload" />Upload Directory
              </a-button>
            </a-upload>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :md="24" :sm="24">
          <a-form-item label="上传图片" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-upload
              name="avatar"
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              :beforeUpload="beforeUpload"
            >
              <img width="120" height="120" v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传图片</div>
              </div>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col :md="24" :sm="24">
          <template>
            <div v-for="(fileDetail,index) in dataSource[0].fileDetails" :key="index">
              <div
                style="float: left;width:104px;height:104px;margin-right: 10px;margin: 0 8px 8px 0;"
              >
                <div
                  style="width: 100%;height: 100%;position: relative;padding: 8px;border: 1px solid #d9d9d9;border-radius: 4px;"
                >
                  <img style="width: 100%;" :src="fileDetail.imgUrl" :preview="dataSource[0].key" />
                </div>
              </div>
            </div>
          </template>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
import { upLoad } from '@/api/member'
export default {
  props: {},
  data() {
    return {
      headers: {
        authorization: 'authorization-text',
      },
      dataSource: [
        {
          key: 0,
          fileDetails: [
            {
              imgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2735633715,2749454924&fm=27&gp=0.jpg'
            },
            {
              imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3967239004,1951414302&fm=27&gp=0.jpg'
            },
            {
              imgUrl:
                'https://ss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=3660968530,985748925&fm=191&app=48&size=h300&n=0&g=4n&f=JPEG?sec=1853310920&t=5e64af964be378c6c2a3b0acc65dfe24'
            }
          ]
        },
        {
          key: 1,
          fileDetails: [
            {
              imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=889120611,3801177793&fm=27&gp=0.jpg'
            },
            {
              imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2445468140,2491956848&fm=27&gp=0.jpg'
            }
          ]
        }
      ],
      loading: false,
      imageUrl: '',
      form1: this.$form.createForm(this),
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
  created() {},
  mounted() {},
  watch: {},
  methods: {
    beforeUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isPNG) {
        this.$message.error('11')
        return isJPG
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('22')
        return isLt2M
      }
      getBase64(file, imageUrl => {
        this.imageUrl = imageUrl
        this.loading = false
      })
      const formData = new FormData()
      formData.append('file', file)
      console.log(formData)
      upLoad(formData).then(res => {
        console.log(res)
        this.fileUrl = res.location
      })
    },
    beforeUploadFile(file) {
      console.log(file)

      const formData = new FormData()
      formData.append('file', file)
      console.log(formData)
      upLoad(formData).then(res => {
        console.log(res)
        this.fileUrl = res.location
      })
    },
  },
  components: {}
}
</script>

<style scoped lang="scss">
</style>
