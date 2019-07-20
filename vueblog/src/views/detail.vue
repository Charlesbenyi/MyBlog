<template>
    <div id="detail">
        <shouyeheader></shouyeheader>
        <div class="content" v-html="content">

        </div>
    </div>
    
</template>
<style scoped>
.content{
    position: absolute;
    top: 200px;
    width: 100%;
    background: rgb(153, 161, 163);
}
</style>
<script>
import axios from 'axios'
import shouyeheader from '../components/shouheader'
export default {
    name:'detail',
    components: {
        shouyeheader
    },
    data () {
        return {
            title:'',
            content:''
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init(){
            let title = this.$route.params.title
            console.log(title)
            axios({
                method:'post',
                url:'/article/findeone',
                data:{
                    title:title
                }
            }).then(response=>{
                let res = response.data
                console.log(res)
                if(res.status){
                    this.content = res.result.content
                }else{
                    alert('查找失败')
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>


