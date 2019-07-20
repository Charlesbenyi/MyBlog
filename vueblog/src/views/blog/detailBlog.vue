<template>
    <div id="detailBlog" v-html="html">
        详情页面
    </div>
</template>
<style scoped>
#detailBlog{
    margin: 20px;
}
</style>
<script>
import axios from 'axios'
export default {
    name:'detailBlog',
    data () {
        return {
            title:'',
            html:""
        }
    },
    mounted () {
        this.initget()
        this.init()
    },
    methods: {
        initget(){
            this.title = this.$route.params.title
        },
        init(){
            axios.post('/article/findeone',{
                title:this.title
            }).then(response=>{
                let res = response.data
                console.log(res);
                
                if (res.status) {
                    this.html = res.result.content
                }else{
                    alert('误返回文章')
                }
            }).catch(err=>{
                alert("资源上传失败")
            })
        }
    }
}
</script>


