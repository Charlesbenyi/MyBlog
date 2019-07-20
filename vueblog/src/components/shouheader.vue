<template>
<div id="shouheader">

    <h1 style="color:white;" class="biaoti"> 书写人生,放情狂歌</h1>
    <div class="btn">
        {{childmsg}} <el-button round @click="login">登录</el-button>
    </div>
    
</div>
</template>
<style scoped>
#shouheader{
     min-width: 800px;
     width: 100%;
     height: 200px;
     position: absolute;
     top: 0;
     background-image: url('../assets/back.jpg');
     background-size: 100% 100%;
     text-align: center;
 }
 .btn{
    display:inline-block;
    position: absolute;
    bottom: 10px;
    right: 10px;
}
</style>
<script>
// import Login from '../components/login'
export default {
    name:"shouheader",
    props: {
        childmsg:{
            type:String,
            default:"今日推荐"
        }
    },
    components: {
    },
    data () {
        return {
            loginshow:true
        }
    },
    mounted () {
        
    },
    methods: {
        login(){
            this.$emit('login',this.loginshow)
            console.log("？")
        }
    }
}
</script>

