<template>
    <div>
        <div class="title">
        <el-input v-model="title" placeholder="请输入文章的标题"></el-input>
        </div>
        <div class="describle">
            <el-input v-model="describle" placeholder="请输入文章的简介"></el-input>
        </div>
        <div class="catalog">
            <el-select v-model="catalog" placeholder="请选择">
                <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.cname"
                :value="item.cname">
                </el-option>
            </el-select>
        </div>
        <quill-editor ref="text" v-model="content" class="myQuillEditor" :options="editorOption" />
        <el-button style="margin-left:30px" type="primary" @click="submit">提交</el-button>
    </div>
</template>
<style scoped>
.title{
    margin: 20px;
}
.describle{
    margin: 20px;
}
.catalog{
    margin: 20px;
}
.quill-editor{
    margin: 20px;
}
</style>
<script>
import axios from 'axios'
import { quillEditor } from 'vue-quill-editor'
import * as Quill from 'quill'  //引入编辑器
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
    name:'wirteblog',
    components: {
        quillEditor
    },
    data () {
        return {
            content: '',
            editorOption: { 
                modules:{
                    toolbar:[
                            ['bold', 'italic', 'underline', 'strike'],        //加粗，斜体，下划线，删除线
                            ['blockquote', 'code-block'],         //引用，代码块


                            [{ 'header': 1 }, { 'header': 2 }],               // 标题，键值对的形式；1、2表示字体大小
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],          //列表
                            [{ 'script': 'sub'}, { 'script': 'super' }],      // 上下标
                            [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进
                            [{ 'direction': 'rtl' }],                         // 文本方向


                            [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],         //几级标题


                            [{ 'color': [] }, { 'background': [] }],          // 字体颜色，字体背景颜色
                            [{ 'font': [] }],         //字体
                            [{ 'align': [] }],        //对齐方式


                            ['clean'],        //清除字体样式
                            ['image','video']        //上传图片、上传视频
  
                        ],
                        imageResize: {} 
                    }  
            },
            title:'',
            describle:'',
            options:[],
            catalog:''
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        submit(){
            let title = this.title
            let catalog = this.catalog
            let describle = this.describle
            let content = this.content
            axios({
                method:'post',
                url:'/article/insert',
                data:{
                    title,
                    catalog,
                    describle,
                    content
                }
            }).then(response=>{
                let res = response.data
                console.log(res);
                
                if(res.status){
                    alert("添加成功")
                }else{
                    alert('文章已存在')
                }
            }).catch(err=>{
                alert("请稍后重试！")
            })
        },
        init(){
            axios({
                method:'get',
                url:'/catalogs/listall',
                data:{
                }
            }).then(response=>{
                let res = response.data
                if(res.status){
                    console.log("分类标签")
                    this.options = res.result
                }else{
                    alert("分类表亲啊")
                }
            })
        }
    }
}
</script>

