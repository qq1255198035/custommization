<template>
    <div id="wangeditor">
        <div ref="toolbar" class="toolbar">
        </div>
        <div ref="editor" class="text">
        </div>
    </div>
</template>
<script>
import E from "wangeditor";
import { ACCESS_TOKEN } from "@/store/mutation-types"
import { upLoad } from "@/api/system";
export default {
    name: "Editor",
    data() {
        return {
            editor: null,
            info_: null
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
  // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
    props: {
        value: {
            type: String,
            default: ''
        },
        isClear: {
            type: Boolean,
            default: false
        },
        val:{
            type: String,
            default: ''
        }
    }, // 接收父组件的方法
    watch: {
        isClear (val) {
        // 触发清除文本域内容
            if (val) {
                this.editor.txt.clear()
                this.info_ = null
            }
        },
        value (val) {
        // 使用 v-model 时，设置初始值
            this.editor.txt.html(val)
        }
    },
    mounted() {
        this.editor = new E(this.$refs.toolbar,this.$refs.editor);
    // 编辑器的事件，每次改变会获取其html内容
        this.editor.customConfig.onchange = html => {
            this.info_ = html;
            this.$emit('change', this.info_); // 把这个html通过catchData的方法传入父组件
        };
        
        this.editor.customConfig.menus = [
            // 菜单配置
            'head', // 标题
            'bold', // 粗体
            'fontSize', // 字号
            'fontName', // 字体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            'link', // 插入链接
            'list', // 列表
            'justify', // 对齐方式
            'quote', // 引用
            'emoticon', // 表情
            'image', // 插入图片
            'table', // 表格
            'code', // 插入代码
            'undo', // 撤销
            'redo' // 重复
            
        ];
        this.editor.customConfig.showLinkImg = false;
        //this.editor.customConfig.uploadImgServer = '/jeecg-boot/sys/oss/sourceUpload';
        this.editor.customConfig.withCredentials = true;
        this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024;
        this.editor.customConfig.customUploadImg = function (files, insert) {
            // files 是 input 中选中的文件列表
            // insert 是获取图片 url 后，插入到编辑器的方法
            console.log(files[0])
            let imgUrl;
            const formData = new FormData();
            formData.append("file", files[0]);
            upLoad(formData).then(res => {
                imgUrl = res.preview_url;
                console.log(res)
                insert(imgUrl)
            });
            // 上传代码返回结果之后，将图片插入到编辑器中
            
        }
        this.editor.customConfig.uploadImgHeaders = {
            "Content-Type": "multipart/form-data",
            'X-Access-Token' : this.$ls.get(ACCESS_TOKEN)
        }
        this.editor.create(); // 创建富文本实例
        this.editor.txt.html(this.val)
    }
}
</script>
<style lang="css">
.editor {
    width: 80%;
    margin: 0 auto;
}
.toolbar {
    border: 1px solid #ccc;
}
.text {
    border: 1px solid #ccc;
    height: 300px;
}
</style>