<template>
    <div>
        <input type="file" ref="upload" name="avatar" id="my_file" accept="image/jpg" @change="changeAvatar" multiple="false">请选择图片
        <button @click="submit">点击</button>
        <img :src="src" alt="">
        <img src="../../static/fish.jpg">
    </div>
</template>
<style scoped>

</style>
<script>
import axios from 'axios'
export default {
    name:'Blogindex',
    data () {
        return {
            user:{},
            src:''
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init(){
            axios.get('/users/test')
            .then(Response=>{
                let res = Response.data
                this.user = res.result
            })
            .catch(err=>{
                alert('网络连接错误')
            })
        },
        changeAvatar(event){
            let image = event.target.files
            let windowURL = window.URL || window.webkitURL
            this.src = windowURL.createObjectURL(image[0])
            console.log(image)
            // let formdata = new FormData()
            // formdata.append('file',image)
            // console.log(formdata.file)
        },
        submit(){
            let image = document.getElementById('my_file').files[0];
            console.log(image)
            let formdata = new FormData()
            formdata.append('file',image)
            formdata.append('name','yiben')
            formdata.append('exp','test')
            console.log(formdata.file)
            let config = {
                 headers: {
                'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
            }
            }
            axios.post('/users/pic',formdata,config)
        }
    }
}
</script>
